'use strict';

/**
 * FFSubtitle - Subtitle component, can be used in conjunction with voice-to-subtitle tts
 *
 * ####Example:
 *
 *     const text = "《街头霸王5》是卡普空使用虚幻引擎开发的3D格斗游戏.";
 *     const subtitle = new FFSubtitle({ x: 320, y: 520 });
 *     subtitle.setText(text);
 *
 * @class
 */

const FFNode = require('./node');
const forEach = require('lodash/forEach');
const DateUtil = require('../utils/date');
const CanvasUtil = require('../utils/canvas');
const Material = require('../material/material');
const { ProxyObj, Text } = require('../../inkpaint/lib/index');

const { nodeRequire } = require('../utils/utils');
const probe = nodeRequire('ffmpeg-probe');

const DIS = 40;
const SIGN = '_$_';
class FFSubtitle extends FFNode {
  constructor(conf = { text: '', style: { fontSize: 24 } }) {
    super({ type: 'subtitle', ...conf });

    const { comma = true, startTime = 0, text = '' } = conf;
    const regexp = comma ? /(。|？|\?|!|！|；|，)/gi : /(。|？|\?|!|！|；)/gi;
    this.setRegexp(regexp);
    this.setDefaultStyle();
    this.subtitleStartTime = DateUtil.toMilliseconds(startTime);

    this.time = 0;
    this.index = 0;
    this.text = text;
    this.textList = [];
    this.frameBuffer = 6;
    this.materials = new Material(conf);
  }

  /**
   * Create display object.
   * @private
   */
  createDisplay() {
    const { fontSize = 20 } = this.conf;
    this.display = new ProxyObj();
    this.setStyle({ fontSize, alpha: 0 });
    this.setAnchor(0.5);
  }

  /**
   * Set frame buffer
   * @param {buffer} frameBuffer - frame buffer
   * @public
   */
  setFrameBuffer(frameBuffer) {
    this.frameBuffer = frameBuffer;
  }

  /**
   * Set up voice narration
   * @param {string} speech - voice narration
   * @public
   */
  setSpeech(speech) {
    this.conf.speech = speech;
  }

  /**
   * Set up voice dialogue
   * @param {string} speech - voice narration
   * @public
   */
  setAudio(speech) {
    this.setSpeech(speech);
  }

  /**
   * Set Subtitle text
   * @param {string} text - Subtitle text
   * @public
   */
  setText(text) {
    this.conf.text = text;
  }

  /**
   * Set segmentation regular
   * @param {regexp} regexp - segmentation regular
   * @public
   */
  setRegexp(regexp) {
    this.regexp = regexp;
  }

  /**
   * Set text font size
   * @param {number} fontSize - text font size
   * @public
   */
  setFontSize(fontSize) {
    this.conf.fontSize = fontSize;
    this.setStyle({ fontSize });
  }

  /**
   * Set total animation duration
   *
   * @param {number} duration album animation duration
   * @public
   */
  setDuration(duration = 5) {
    this.conf.duration = duration;
  }

  /**
   * Set background color
   * @param {string} backgroundColor - the background color value
   * @public
   */
  setBackgroundColor(backgroundColor) {
    this.setBackground(backgroundColor);
  }

  /**
   * Set background color
   * @param {string} backgroundColor - the background color value
   * @public
   */
  setBackground(backgroundColor) {
    this.setStyle({ backgroundColor });
  }

  /**
   * Set text color value
   * @param {string} color - the text color value
   * @public
   */
  setColor(color) {
    this.setStyle({ fill: color });
  }

  /**
   * Set text font file path
   * @param {string} font - text font file path
   * @public
   */
  setFont(font) {
    CanvasUtil.setFont(font, fontFamily => this.setStyle({ fontFamily }));
  }

  setStartTime(startTime = 0) {
    startTime = startTime || 0;
    startTime = DateUtil.toMilliseconds(startTime);
    this.subtitleStartTime = startTime;
  }

  /**
   * Set text style by object
   * @param {object} style - style by object
   * @public
   */
  setStyle(style) {
    this.display.updateStyle(style);
  }

  setAnimate(animate, aniTime = 0.5) {
    this.conf.animate = animate;
    this.conf.aniTime = aniTime;
  }

  setDefaultStyle() {
    const padding = 10;
    const { color = '#ffffff', backgroundColor = '#00219c' } = this.conf;
    this.setStyle({ color, padding, backgroundColor, alpha: 0 });
  }

  async preProcessing() {
    if (this.conf.speech) {
      this.materials.info = await probe(this.conf.speech);
      const duration = this.materials.getDuration();
      this.setDuration(duration);
      return null;
    } else {
      return null;
    }
  }

  /**
   * replace to real Text Component
   * @private
   */
  substituteText() {
    const proxyObj = this.display;
    this.display = new Text();
    this.display.substitute(proxyObj);
    proxyObj.destroy(true);
  }

  start() {
    if (!super.start()) return;
    this.substituteText();
    this.replaceDot();
    this.punctuation();
  }

  drawing(time, delta) {
    //todo: jump to time
    this.time += delta;
    if (this.time < this.startTime) return;

    this.index++;
    if (this.index >= this.totalFrames) {
      this.display.text = '';
      this.setStyle({ alpha: 0 });
      return;
    }

    forEach(this.textList, textObj => {
      const { start, frames, text, draw } = textObj;
      if (this.index >= start && this.index <= frames && !draw) {
        this.showNewTextLine(text);
        textObj.draw = true;
      }
    });
  }

  showNewTextLine(text) {
    const time = this.conf.aniTime || 0.5;
    const x = this.display.x;
    const y = this.display.y;

    switch (this.conf.animate) {
      case 'up':
        this.display.text = text;
        this.setStyle({ alpha: 0 });
        break;

      case 'down':
        this.display.text = text;
        this.setStyle({ alpha: 0 });
        break;

      case 'left':
        this.display.text = text;
        this.setStyle({ alpha: 0 });
        break;

      case 'right':
        this.display.text = text;
        this.setStyle({ alpha: 0 });
        break;

      default:
        this.display.text = text;
        this.setStyle({ alpha: 1 });
    }
  }

  replaceDot() {
    this.text = this.conf.text.replace(this.regexp, SIGN);
  }

  punctuation() {
    const fps = this.rootConf('fps');
    const duration = this.conf.duration;
    const totalLength = this.conf.text.length;
    const list = this.text.split(SIGN).filter(elem => elem);
    let start = 0;
    this.totalFrames = duration * fps + this.frameBuffer;

    forEach(list, text => {
      // text += sign;
      const time = (text.length / totalLength) * duration;
      const frames = start + time * fps;
      this.textList.push({ start, frames, text, draw: false });
      start = frames;
    });
  }

  destroy() {
    this.text = '';
    this.textList.length = 0;
    this.display.text = '';

    this.materials.destroy();
    super.destroy();
  }
}

module.exports = FFSubtitle;
