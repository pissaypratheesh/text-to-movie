'use strict';

/**
 * FFCreator - FFCreator main class, a container contains multiple scenes and pictures, etc.
 * Can be used alone, more often combined with FFCreatorCenter.
 *
 * ####Example:
 *
 *     const creator = new FFCreator({ cacheDir, outputDir, width: 800, height: 640, audio });
 *     creator.addChild(scene2);
 *     creator.output(output);
 *     creator.start();
 *
 *
 * ####Note:
 *     The library depends on `ffmpeg` and `webgl` (linux server uses headless-webgl).
 *
 * @class
 */

const { isBrowser } = require("browser-or-node");

const path = require('path');
const Conf = require('./conf/conf');
const Pool = require('./core/pool');
const FFCon = require('./node/cons');
const Utils = require('./utils/utils');
const VideoHolder = require("./utils/video");
const XHR = require("./utils/xhr");
const FFAudio = require('./audio/audio');
const FFSpine = require('./node/spine');
const FFLogger = require('./utils/logger');
const Renderer = require('./core/renderer');
const { Application, Loader, settings, destroyAndCleanAllCache, createCanvas } = require('../inkpaint/lib/index');
const { nodeRequire, genUuid } = require('./utils/utils');
const OpenCVUtil = nodeRequire("../utils/opencv");
const FFmpegUtil = nodeRequire('../utils/ffmpeg');
const GLUtil = require('./utils/gl');
const RenderUtil = require("./utils/render");
const AudioUtil = require('./utils/audio');

const FFT_SIZE = 4096;

class FFCreator extends FFCon {
  constructor(conf = {}) {
    super({ type: 'creator', ...conf });
    this.canplay = false;
    this.visible = true;
    this.maxzIndex = 0;

    this.inCenter = false;
    this._conf = new Conf(conf);
    this.loader = new Loader();

    this.switchLog(this.getConf('log'));
    this.timer = 10; // todo: should set to 0, now=10 just for video cover...
    this._timer = 0;

    this.frameCallbacks = [];

    // materials
    this.mVIDEOS = [];
    this.analyser = new AudioUtil.Analyser(FFT_SIZE);

    this.createApp();
    this.createRenderer();
    this.addAudio(this.getConf('audio'));
    if (this.getConf('opencv') === false) OpenCVUtil.enable = false;
    if (!isBrowser) {
      FFLogger.info({ pos: 'OpenCV', msg: `enable: ${OpenCVUtil.enable} available: ${OpenCVUtil.available()}` });
    }
  }

  updateDisplay() {
    this.allNodes.filter(n => {
      if (n.updateDisplay) n.updateDisplay();
    });
    super.updateDisplay();
  }

  get uuid() {
    return this.conf.refId;
  }

  get absStartTime() {
    return 0;
  }

  get playing() {
    return this.renderer.playing;
  }

  /**
   * Create webgl scene display object
   * @private
   */
  createApp() {
    this.resetSize();
    const width = this.getConf('width');
    const height = this.getConf('height');
    const render = this.getConf('render');
    const clarity = this.getConf('clarity');
    const antialias = this.getConf('antialias');
    // 现在底层能力太多依赖WebGL了，为了避免出错，都写死
    const useGL = true; // render !== 'canvas';
    const key = `${this.type}_${render}`;
    settings.PRECISION_FRAGMENT = `${clarity}p`;

    // browser render
    const view = this.getConf('canvas');
    if (isBrowser && !view) throw new Error(`Browser rendering need canvas!`);

    this.setConf('useGL', useGL);
    // console.log('useGL!!!', useGL);
    const opts = { useGL, antialias, view,
      // 烧制的时候，可能需要视频直接烧制加速，所以要透明
      backgroundColor: 0x000000, transparent: !isBrowser };
    // FFLogger.info({ pos: 'Creator', msg: `inkpaint app: ${JSON.stringify(opts)}` });
    const app = Pool.get(key, () => new Application(width, height, opts));
    app.renderer.resize(width, height);
    this.display = app.stage;
    this.display.sortableChildren = true;
    this.app = app;
    this.width = width;
    this.height = height;
  }

  get bgColor() {
    return this.app.renderer._backgroundColorString;
  }

  async resize(width, height) {
    if (!width || !height || isNaN(width) || isNaN(height) ||
      (width === this.getConf('width') && height === this.getConf('height'))) return;
    // 这三组更新都是必须的。。。ft!
    this.width = width;
    this.height = height;
    this.setConf('width', width);
    this.setConf('height', height);
    this.conf.width = width;
    this.conf.height = height;
    this.app.renderer.resize(width, height);
    for (const n of this.allNodes) {
      if (!n.display) continue;
      if (n.resizeBackground) n.resizeBackground();
      if (n.updateAnimations) n.updateAnimations();
      if (n.updateAttr) n.updateAttr();
      if (n.fitSize) await n.fitSize();
      if (n.fitTexture) await n.fitTexture();
    }
    this.render(); // 重新render
    this.emit('resize');
  }

  /**
   * Create Renderer instance - Core classes for rendering animations and videos.
   * @private
   */
  createRenderer() {
    this.renderer = new Renderer({ creator: this });
  }

  /**
   * Create output path, only used when using FFCreatorCenter.
   * @public
   */
  generateOutput() {
    const ext = this.getConf('ext');
    const outputDir = this.getConf('outputDir');
    if (outputDir) {
      this.setOutput(path.join(outputDir, `${genUuid()}.${ext}`));
    }
    return this;
  }

  /**
   * Get FFmpeg command line.
   * @return {function} FFmpeg command line
   * @public
   */
  getFFmpeg() {
    return FFmpegUtil.getFFmpeg();
  }

  /**
   * Set as the first frame cover page image
   * @param {string} face - the cover face image path
   * @public
   */
  setCover(cover) {
    this.setConf('cover', cover);
  }

  /**
   * Set the fps of the composite video.
   * @param {number} fps - the fps of the composite video
   * @public
   */
  setFps(fps) {
    this.setConf('fps', fps);
  }

  /**
   * Set the total duration of the composite video.
   * @param {number} duration - the total duration
   * @public
   */
  setDuration(duration) {
    this.setConf('duration', duration);
  }

  /**
   * Set configuration.
   * @param {string} key - the config key
   * @param {any} val - the config val
   * @public
   */
  setConf(key, val) {
    this._conf.setVal(key, val);
  }

  /**
   * Get configuration.
   * @param {string} key - the config key
   * @return {any}  the config val
   * @public
   */
  getConf(key) {
    return this._conf.getVal(key);
  }

  /**
   * Add background sound.
   * @param {string|object|FFAudio} args - the audio config
   * @public
   */
  addAudio(args) {
    if (!args) return;
    if (typeof args === 'string') args = { path: args };
    if (!(args instanceof FFAudio) && args.loop === undefined) args.loop = true;
    super.addAudio(args);
  }

  /**
   * Set the stage size of the scene
   * @param {number} width - stage width
   * @param {number} height - stage height
   * @public
   */
  resetSize(width, height) {
    if (!width) {
      width = this.getConf('width');
      height = this.getConf('height');
    }

    this.setConf('width', Utils.courtship(width));
    this.setConf('height', Utils.courtship(height));
  }

  /**
   * Set the video output path
   * @param {string} output - the video output path
   * @public
   */
  setOutput(output) {
    this.setConf('output', path.normalize(output));
  }

  /**
   * Get the video output path
   * @return {string} output - the video output path
   * @public
   */
  getFile() {
    return this.getConf('output');
  }

  refresh() {
    if (!this.canplay) return
    this.jumpTo(this.currentTime);
  }

  /**
   * Render the scene of the inkpaint app
   * @public
   */
  render() {
    try {
      this.app.render();
    } catch (e) {
      console.log(`App render error`, e);
    }
  }

  /**
   * Set the video output path
   * @param {string} output - the video output path
   * @public
   */
  output(output) {
    this.setOutput(output);
  }

  /**
   * Open logger switch
   * @public
   */
  openLog() {
    FFLogger.enable = true;
  }

  /**
   * Close logger switch
   * @public
   */
  closeLog() {
    FFLogger.enable = false;
  }

  switchLog(log) {
    if (log) this.openLog();
    else this.closeLog();
  }

  /**
   * Hook handler function
   * @public
   */
  setInputOptions(opts) {
    this.setConf('inputOptions', opts);
  }

  setOutOptions(opts) {
    this.setConf('outputOptions', opts);
  }

  async prepare(sliceLen=0) {
    await this.start(25, false);
    const data = this.toJson();
    data.pathId = this.rootConf('pathId');
    if (!sliceLen || sliceLen * 3 > this.duration) return data;
    const n = Math.round(this.duration / sliceLen);
    const len = Math.round(this.duration / n);
    const videos = [];
    const json = JSON.stringify(data);
    for (let i = 0; i < n; i++) {
      const _data = JSON.parse(json);
      _data.mute = true;
      _data.start = (i * len) >> 0;
      if (i + 1 < n) _data.end = ((i + 1) * len) >> 0;
      videos.push(_data);
    }
    const audio = JSON.parse(json);
    audio.ext = 'm4a';
    return {videos, audio};
  }

  /**
   * Start video processing
   * @public
   */
  async start(delay = 25, burn = true) {
    await Utils.sleep(delay);
    if (this.destroyed) return;
    this.addRenderEvent();
    this.initSpine();
    this.initzIndex();
    await this.renderer.start(burn);
  }

  initSpine() {
    let spine = this.children.filter(x => x?.type === 'spine');
    if (spine.length > 1) throw new Error('Num of Spine must only one!');
    if (spine.length === 0) {
      const tracks = this.children.filter(x => x?.type === 'track');
      if (tracks.length > 0) throw new Error('Track should not exists when Spine absence!');
      spine = new FFSpine();
      spine.parent = this;
      const _children = [spine];
      this.children.map(child => {
        // 没有开始时间的video都移到spine里
        if (child.type === 'video' && !child.conf.start) spine.addChild(child);
        else _children.push(child);
      });
      this.children = _children;
    }
  }

  initzIndex() {
    let zIndex = 0;
    const walkzIndex = (node) => {
      node.children.map(x => {
        x.zIndex = x.basezIndex + (zIndex++);
        this.maxzIndex = Math.max(x.zIndex, this.maxzIndex);
        walkzIndex(x);
      });
    }
    walkzIndex(this);
  }

  time(time) {
    return Number(time);
  }

  /**
   * Start video play, must called by user CLICK event in the first time
   * @public
   */
  async play(playRate=1) {
    if (this.burning) return;
    if (!this.canplay) throw new Error("player not ready");
    this.playbackRate = playRate;
    this.renderer.play(playRate);
  }

  /**
   * Pause video play
   * @public
   */
  async pause() {
    if (this.burning) return;
    if (!this.canplay) throw new Error("player not ready");
    return this.renderer.pause();
  }

  async jumpTo(timeInMs) {
    if (this.burning) return;
    if (!this.canplay) throw new Error("player not ready");
    const time = Number(timeInMs);
    if (isNaN(time) || time < 0) throw new Error("jump to invalid time", timeInMs);
    this.renderer.jumpTo(Math.min(time, (this.duration * 1000 - 50) >> 0));
  }

  /**
   * Register to Renderer listen for events
   * @private
   */
  addRenderEvent() {
    this.bubble(this.renderer);
    const destroy = async () => {
      await Utils.sleep(20);
      this.destroy();
    };
    this.renderer.on('error', destroy);
    this.renderer.on('complete', destroy);
  }

  /**
   * Add callback hook
   * @param {function} callback - callback function
   * @public
   */
  addFrameCallback(node) {
    if (!node || this.frameCallbacks.includes(node)) return;
    this.frameCallbacks.push(node);
    // 从底层到顶层，确保cover能取到正确的层
    this.frameCallbacks.sort((a, b) => a.zIndex - b.zIndex);
  }

  /**
   * Remove callback hook
   * @param {function} callback - callback function
   * @public
   */
  removeFrameCallback(node) {
    if (!node) return;
    const index = this.frameCallbacks.indexOf(node);
    if (index > -1) this.frameCallbacks.splice(index, 1);
  }

  get audioBufferSize() {
    return Math.round(this.getConf('audioSampleRate') / this.getConf('fps'));
  }

  /**
   * 把所有audio frame根据不同chanel合并起来
   */
  mergeAudioFrame() {
    const mergedAudioFrame = [];
    for (const node of this.frameCallbacks) {
      if (typeof(node.getAudioFrame) !== 'function') continue;
      const singleAudioFrame = node.getAudioFrame(this.timer, this.audioBufferSize);
      if (singleAudioFrame && singleAudioFrame.length > 0) {
        for (const chanelNumber in singleAudioFrame) {
          if (!mergedAudioFrame[chanelNumber]) {
            mergedAudioFrame[chanelNumber] = singleAudioFrame[chanelNumber];
            continue
          }
          for (let i = 0; i < this.audioBufferSize; i++) {
            mergedAudioFrame[chanelNumber][i] += singleAudioFrame[chanelNumber][i] || 0;
          }
        }
      }
    }

    this.audioFrame = mergedAudioFrame;
  }

  /**
   * Time update function
   * @param {number} delta - delta time (ms)
   * @param {number} timeInMs - Jump to time (ms)
   * @public
   */
  async timeUpdate(delta = 0, timeInMs = -1) {
    if (delta > 0 && !this.canplay) return;
    const time = timeInMs >= 0 ? timeInMs : this.timer + delta;
    const callbackTime = delta > 0 ? this.timer : time;
    this.timer = time;
    // console.log('creator.timeUpdate', {timer: this.timer, timeInMs, delta, cbs:this.frameCallbacks.length});
    this.mergeAudioFrame()
    this.analyser.process(this.audioFrame);

    return Promise.all(this.frameCallbacks.map(n => {
      if (typeof (n.drawing) !== 'function') return;
      return n.drawing(callbackTime, delta);
    }));
  }

  get audioData() {
    this.analyser.duration = this.duration;
    this.analyser.currentTime = this.timer / 1000;

    return this.analyser
  }

  get duration() {
    return Number(this.getConf('duration'));
  }

  get currentTime() {
    return this.timer;
  }

  /**
   * Destroy the App class created by InkPaint
   * @private
   */
  destroyApp() {
    const pool = this.getConf('pool');
    const render = this.getConf('render');

    if (pool) {
      this.app.destroyChildren(true);
      Pool.put(`${this.type}_${render}`, this.app);
    } else {
      this.app.destroy(true, true);
    }

    // inkpaint是全局的cache, 这清就其他的实例也全没了
    // destroyAndCleanAllCache();
    this.app = null;
  }

  annotate() {
    if (this.burning) return;
    const spine = this.children.filter(x => x.type === 'spine')[0];
    spine.annotate(); // 必须重新annotate，确保正确
    let maxEndTime = spine.duration;
    // todo: 如果spine里有一个无限循环的，怎么搞？
    this.allNodes // 计算所有video元素(loop以外)的最后结束时间
    // .filter(x => (!x.isVirtual && (!x.loop || x.conf.duration || x.conf.end)))
      .filter(x => !x.isVirtual && !x.flexibleDuration)
      .map(x => maxEndTime = Math.max(maxEndTime, x.absEndTime));
    let isChanged = false;
    if (maxEndTime !== this.duration) {
      isChanged = true;
      this.setDuration(maxEndTime);
    }
    // 可能有child依赖于此, 需要再annotate一下
    this.allNodes.map(node => {
      node.annotate();
      this.maxzIndex = Math.max(node.zIndex, this.maxzIndex);
    });
    if (this.renderer.timeline.duration !== this.duration) {
      this.renderer.timeline.update();
    }
    // 更新一下显示
    this.updateDisplay();
    if (isChanged && this.canplay) {
      // update metadata
      this.emit({
        type: 'loadedmetadata',
        duration: this.duration,
        width: this.getConf('width'),
        height: this.getConf('height'),
      });
    }
    this.emit({
      type: 'timeupdate',
      currentTime: this.currentTime,
      total: Math.floor(this.duration * 1000)
    });
  }

  get outputTime() {
    let start = this.getConf('start') || 0;
    let end = this.getConf('end') || this.duration;
    return {start, end};
  }

  get audioOnly() {
    return `${this.getConf('ext')}`.toLowerCase() === 'm4a';
  }

  snapshot(opt={}) {
    if (!this.burning) this.burning = true;
    const { width: w, height: h } = this;
    this.render();
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    // 转绘到另一个canvas上, 之后渲染下一帧了
    ctx.drawImage(this.app.view, 0, 0, w, h);
    if (opt.next) {
      const delta = 1000 / this.getConf('fps');
      const nextTime = this.currentTime + delta;
      if (nextTime > this.duration * 1000) {
        opt.next = null;
        this.burning = false;
      } else {
        opt.next = this.timeUpdate(delta, nextTime);
      }
    }

    const format = (opt?.format || 'jpeg').toLowerCase();
    if (format === 'raw') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(ctx.getImageData(0, 0, w, h));
        }, 0);
      });
    } else {
      return new Promise((resolve) => {
        const format = opt.format.toLowerCase() === 'png' ? 'png' : 'jpeg';
        canvas.toBlob(blob => resolve(blob), `image/${format}`, opt.quality || 0.8);
      });
    }
  }

  toMiraML(asTemplate=true, indent=2) {
    this.XML_INDENT = indent;
    const conf = this.toJson(asTemplate);
    const attr = ['version="1.1"'];
    for (const key of ['author', 'name', 'description']) {
      if (!conf[key]) continue;
      attr.push(`${key}="${conf[key]}"`);
      delete conf[key];
    }
    return `<miraml ${attr.join(' ')}>\n${this.xml(conf, indent)}</miraml>`;
  }

  xml(json, indent, tag=null) {
    const tagname = tag || json.type;
    if (!tagname || !json) return ''; // error!
    const subindt = indent + this.XML_INDENT;
    const attrs = [];
    const children = json.children && Array.isArray(json.children) ?
      json.children.map(x => this.xml(x, subindt)) : [];
    if (json.type === 'text' && json.text) {
      // hardcode
      children.push(`${" ".repeat(subindt)}<content>${json.text}</content>\n`);
      delete json.text;
      delete json.content;
    }
    for (let [k, v] of Object.entries(json)) {
      if (['type', 'children'].includes(k)) continue;
      if (Array.isArray(v)) {
        v = v.map(x => {
          if (typeof(x) !== 'object') return x;
          children.push(this.xml(x, subindt, k));
          return null;
        }).filter(x => x !== null);
        if (v.length > 0) {
          attrs.push(`${k}="${JSON.stringify(v)}"`);
        }
      } else if (typeof(v) === 'object') {
        children.push(this.xml(v, subindt, k));
      } else if (v !== null && v !== undefined) {
        attrs.push(`${k}="${v}"`);
      }
    }

    const idt = " ".repeat(indent);
    const att = `${attrs.length ? ' ' : ''}${attrs.join(' ')}`;
    const cld = children.join("");

    if (!cld) {
      return `${idt}<${tagname}${att}></${tagname}>\n`;
    }

    return `${idt}<${tagname}${att}>\n${cld}${idt}</${tagname}>\n`;
  }

  toJson(asTemplate=false) {
    const conf = super.toJson(asTemplate);
    conf.type = 'canvas';
    // conf.fps = this.getConf('fps');
    // 烧录需要duration
    if (!asTemplate) conf.duration = this.duration;
    delete conf.canvas;
    delete conf.value;
    delete conf.cacheDir;
    delete conf.outputDir;
    delete conf.log;
    if (asTemplate) {
      delete conf.library;
      delete conf.materials;
    }
    return conf;
  }

  async destroy() {
    // has destroyed
    if (!this.renderer && !this.display) return;
    if (this.destroyed) return;
    this.destroyed = true;

    this.canplay = false;
    await this.timeUpdate(0); // stop all

    this.loader.destroy();
    this.renderer.destroy();
    this.destroyApp();
    super.destroy();
    VideoHolder.release(this.uuid);
    XHR.cancel(this.uuid);
    GLUtil.release(this.uuid);
    RenderUtil.release(this.uuid);

    this.mVIDEOS = [];
    this.frameCallbacks = [];
    this._conf = null;
    this.conf = null;
    this.loader = null;
    this.display = null;
    this.renderer = null;
    this.inCenter = false;
    this.emit('emptied');
    FFLogger.info({ pos: 'Creator', msg: `destroyed!!` });
  }

  /**
   * Set the installation path of the current server ffmpeg.
   * @param {string} path - installation path of the current server ffmpeg
   * @public
   */
  static setFFmpegPath(path) {
    FFmpegUtil.setFFmpegPath(path);
  }

  /**
   * Set the installation path of the current server ffprobe.
   * @param {string} path - installation path of the current server ffprobe
   * @public
   */
  static setFFprobePath(path) {
    FFmpegUtil.setFFprobePath(path);
  }
}

module.exports = FFCreator;
