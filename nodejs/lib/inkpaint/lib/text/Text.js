"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Sprite = _interopRequireDefault(require("../sprites/Sprite"));
var _Texture = _interopRequireDefault(require("../textures/Texture"));
var _utils = require("../utils");
var _math = require("../math");
var _const = require("../const");
var _settings = _interopRequireDefault(require("../settings"));
var _TextStyle = _interopRequireDefault(require("./TextStyle"));
var _TextMetrics = _interopRequireDefault(require("./TextMetrics"));
var _trimCanvas = _interopRequireDefault(require("../utils/trimCanvas"));
var _Doc = _interopRequireDefault(require("../polyfill/Doc"));
var _cache = require("../utils/cache");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var defaultDestroyOptions = {
  texture: true,
  children: false,
  baseTexture: true
};
class Text extends _Sprite.default {
  constructor(text, style, canvas) {
    canvas = canvas || _Doc.default.createElement("canvas");
    canvas.width = 3;
    canvas.height = 3;
    var texture = _Texture.default.fromCanvas(canvas, _settings.default.SCALE_MODE, "text");
    texture.orig = new _math.Rectangle();
    texture.trim = new _math.Rectangle();
    super(texture);
    (0, _cache.addToTextureCache)(this._texture, this._texture.baseTexture.textureCacheIds[0]);
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.resolution = _settings.default.RESOLUTION;
    this._text = null;
    this._style = null;
    this._styleListener = null;
    this._font = "";
    this.text = text;
    this.style = style;
    this.localStyleID = -1;
  }
  updateText(respectDirty) {
    var style = this._style;
    if (this.localStyleID !== style.styleID) {
      this.dirty = true;
      this.localStyleID = style.styleID;
    }
    if (!this.dirty && respectDirty) {
      return;
    }
    this._font = this._style.toFontString();
    var context = this.context;
    var measured = _TextMetrics.default.measureText(this._text, this._style, this._style.wordWrap, this.canvas);
    var width = measured.width;
    var height = measured.height;
    var lines = measured.lines;
    var lineHeight = measured.lineHeight;
    var lineWidths = measured.lineWidths;
    var maxLineWidth = measured.maxLineWidth;
    var fontProperties = measured.fontProperties;
    this.canvas.width = Math.ceil((Math.max(1, width) + style.padding * 2) * this.resolution);
    this.canvas.height = Math.ceil((Math.max(1, height) + style.padding * 2) * this.resolution);
    context.scale(this.resolution, this.resolution);
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground(style);
    context.font = this._font;
    context.strokeStyle = style.stroke;
    context.lineWidth = style.strokeThickness;
    context.textBaseline = style.textBaseline;
    context.lineJoin = style.lineJoin;
    context.miterLimit = style.miterLimit;
    var linePositionX;
    var linePositionY;
    if (style.dropShadow) {
      context.fillStyle = style.dropShadowColor;
      context.globalAlpha = style.dropShadowAlpha;
      context.shadowBlur = style.dropShadowBlur;
      if (style.dropShadowBlur > 0) {
        context.shadowColor = style.dropShadowColor;
      }
      var xShadowOffset = Math.cos(style.dropShadowAngle) * style.dropShadowDistance;
      var yShadowOffset = Math.sin(style.dropShadowAngle) * style.dropShadowDistance;
      for (var i = 0; i < lines.length; i++) {
        linePositionX = style.strokeThickness / 2;
        linePositionY = style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;
        if (style.align === "right") {
          linePositionX += maxLineWidth - lineWidths[i];
        } else if (style.align === "center") {
          linePositionX += (maxLineWidth - lineWidths[i]) / 2;
        }
        if (style.fill) {
          this.drawLetterSpacing(lines[i], linePositionX + xShadowOffset + style.padding, linePositionY + yShadowOffset + style.padding);
          if (style.stroke && style.strokeThickness) {
            context.strokeStyle = style.dropShadowColor;
            this.drawLetterSpacing(lines[i], linePositionX + xShadowOffset + style.padding, linePositionY + yShadowOffset + style.padding, true);
            context.strokeStyle = style.stroke;
          }
        }
      }
    }
    context.shadowBlur = 0;
    context.globalAlpha = 1;
    context.fillStyle = this._generateFillStyle(style, lines);

    // draw lines line by line
    for (var _i = 0; _i < lines.length; _i++) {
      linePositionX = style.strokeThickness / 2;
      linePositionY = style.strokeThickness / 2 + _i * lineHeight + fontProperties.ascent;
      if (style.align === "right") {
        linePositionX += maxLineWidth - lineWidths[_i];
      } else if (style.align === "center") {
        linePositionX += (maxLineWidth - lineWidths[_i]) / 2;
      }
      if (style.stroke && style.strokeThickness) {
        this.drawLetterSpacing(lines[_i], linePositionX + style.padding, linePositionY + style.padding, true);
      }
      if (style.fill) {
        this.drawLetterSpacing(lines[_i], linePositionX + style.padding, linePositionY + style.padding);
      }
    }
    this.updateTexture();
  }
  drawBackground(style) {
    var background = style.background || style.backgroundColor;
    if (!background) return;
    var {
      context,
      canvas,
      text
    } = this;
    var ftext = String(text).trim();
    if (ftext) {
      context.fillStyle = background;
      context.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  drawLetterSpacing(text, x, y, isStroke) {
    if (isStroke === void 0) {
      isStroke = false;
    }
    var style = this._style;

    // letterSpacing of 0 means normal
    var letterSpacing = style.letterSpacing;
    if (letterSpacing === 0) {
      if (isStroke) {
        this.context.strokeText(text, x, y);
      } else {
        this.context.fillText(text, x, y);
      }
      return;
    }
    var characters = String.prototype.split.call(text, "");
    var currentPosition = x;
    var index = 0;
    var current = "";
    var previousWidth = this.context.measureText(text).width;
    var currentWidth = 0;
    while (index < text.length) {
      current = characters[index++];
      if (isStroke) {
        this.context.strokeText(current, currentPosition, y);
      } else {
        this.context.fillText(current, currentPosition, y);
      }
      currentWidth = this.context.measureText(text.substring(index)).width;
      currentPosition += previousWidth - currentWidth + letterSpacing;
      previousWidth = currentWidth;
    }
  }
  updateStyle(style) {
    for (var key in style) {
      var newKey = this.camelCase(key);
      if (newKey === "color") newKey = "fill";
      this.style[newKey] = style[key];
    }
  }
  camelCase(name) {
    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, "Moz$1");
  }
  updateTexture() {
    var canvas = this.canvas;
    if (this._style.trim) {
      var trimmed = (0, _trimCanvas.default)(canvas);
      if (trimmed.data) {
        canvas.width = trimmed.width;
        canvas.height = trimmed.height;
        this.context.putImageData(trimmed.data, 0, 0);
      }
    }
    var texture = this._texture;
    var style = this._style;
    var padding = style.trim ? 0 : style.padding;
    var baseTexture = texture.baseTexture;
    baseTexture.hasLoaded = true;
    baseTexture.resolution = this.resolution;
    baseTexture.realWidth = canvas.width;
    baseTexture.realHeight = canvas.height;
    baseTexture.width = canvas.width / this.resolution;
    baseTexture.height = canvas.height / this.resolution;
    texture.trim.width = texture._frame.width = canvas.width / this.resolution;
    texture.trim.height = texture._frame.height = canvas.height / this.resolution;
    texture.trim.x = -padding;
    texture.trim.y = -padding;
    texture.orig.width = texture._frame.width - padding * 2;
    texture.orig.height = texture._frame.height - padding * 2;

    // call sprite onTextureUpdate to update scale if _width or _height were set
    this._onTextureUpdate();
    baseTexture.emit("update", baseTexture);
    this.dirty = false;
  }
  renderWebGL(renderer) {
    if (this.resolution !== renderer.resolution) {
      this.resolution = renderer.resolution;
      this.dirty = true;
    }
    this.updateText(true);
    super.renderWebGL(renderer);
  }
  _renderCanvas(renderer) {
    if (this.resolution !== renderer.resolution) {
      this.resolution = renderer.resolution;
      this.dirty = true;
    }
    this.updateText(true);
    super._renderCanvas(renderer);
  }
  getLocalBounds(rect) {
    this.updateText(true);
    return super.getLocalBounds.call(this, rect);
  }
  _calculateBounds() {
    this.updateText(true);
    this.calculateVertices();
    // if we have already done this on THIS frame.
    this._bounds.addQuad(this.vertexData);
  }
  _onStyleChange() {
    this.dirty = true;
  }
  _generateFillStyle(style, lines) {
    if (!Array.isArray(style.fill)) {
      return style.fill;
    }
    var gradient;
    var totalIterations;
    var currentIteration;
    var stop;
    var width = this.canvas.width / this.resolution;
    var height = this.canvas.height / this.resolution;
    var fill = style.fill.slice();
    var fillGradientStops = style.fillGradientStops.slice();
    if (!fillGradientStops.length) {
      var lengthPlus1 = fill.length + 1;
      for (var i = 1; i < lengthPlus1; ++i) {
        fillGradientStops.push(i / lengthPlus1);
      }
    }
    fill.unshift(style.fill[0]);
    fillGradientStops.unshift(0);
    fill.push(style.fill[style.fill.length - 1]);
    fillGradientStops.push(1);
    if (style.fillGradientType === _const.TEXT_GRADIENT.LINEAR_VERTICAL) {
      gradient = this.context.createLinearGradient(width / 2, 0, width / 2, height);
      totalIterations = (fill.length + 1) * lines.length;
      currentIteration = 0;
      for (var _i2 = 0; _i2 < lines.length; _i2++) {
        currentIteration += 1;
        for (var j = 0; j < fill.length; j++) {
          if (typeof fillGradientStops[j] === "number") {
            stop = fillGradientStops[j] / lines.length + _i2 / lines.length;
          } else {
            stop = currentIteration / totalIterations;
          }
          gradient.addColorStop(stop, fill[j]);
          currentIteration++;
        }
      }
    } else {
      gradient = this.context.createLinearGradient(0, height / 2, width, height / 2);
      totalIterations = fill.length + 1;
      currentIteration = 1;
      for (var _i3 = 0; _i3 < fill.length; _i3++) {
        if (typeof fillGradientStops[_i3] === "number") {
          stop = fillGradientStops[_i3];
        } else {
          stop = currentIteration / totalIterations;
        }
        gradient.addColorStop(stop, fill[_i3]);
        currentIteration++;
      }
    }
    return gradient;
  }
  destroy(options) {
    if (this.destroyed) return;
    if (typeof options === "boolean") {
      options = {
        children: options
      };
    }
    options = Object.assign({}, defaultDestroyOptions, options);
    super.destroy(options);
    this.context = null;
    this.canvas = null;
    this._style = null;
  }
  get width() {
    this.updateText(true);
    return Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(value) {
    this.updateText(true);
    var s = (0, _utils.sign)(this.scale.x) || 1;
    this.scale.x = s * value / this._texture.orig.width;
    this._width = value;
  }
  get height() {
    this.updateText(true);
    return Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(value) {
    this.updateText(true);
    var s = (0, _utils.sign)(this.scale.y) || 1;
    this.scale.y = s * value / this._texture.orig.height;
    this._height = value;
  }
  get font() {
    return this._font;
  }
  get style() {
    return this._style;
  }
  set style(style) {
    style = style || {};
    if (style instanceof _TextStyle.default) {
      this._style = style;
    } else {
      this._style = new _TextStyle.default(style);
    }
    this.localStyleID = -1;
    this.dirty = true;
  }
  get text() {
    return this._text;
  }
  set text(text) {
    text = String(text === "" || text === null || text === undefined ? " " : text);
    if (this._text === text) return;
    this._text = text;
    this.dirty = true;
  }
}
exports.default = Text;
//# sourceMappingURL=Text.js.map