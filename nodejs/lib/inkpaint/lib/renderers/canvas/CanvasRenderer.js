"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SystemRenderer = _interopRequireDefault(require("../SystemRenderer"));
var _CanvasMaskManager = _interopRequireDefault(require("./utils/CanvasMaskManager"));
var _mapCanvasBlendModesToPixi = _interopRequireDefault(require("./utils/mapCanvasBlendModesToPixi"));
var _utils = require("../../utils");
var _const = require("../../const");
var _settings = _interopRequireDefault(require("../../settings"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CanvasRenderer extends _SystemRenderer.default {
  constructor(options, arg2, arg3) {
    super("Canvas", options, arg2, arg3);
    this.type = _const.RENDERER_TYPE.CANVAS;
    this.rootContext = this.view.getContext("2d", {
      alpha: this.transparent
    });
    this.context = this.rootContext;
    this.refresh = true;
    this.maskManager = new _CanvasMaskManager.default(this);
    this.smoothProperty = "imageSmoothingEnabled";
    if (!this.rootContext.imageSmoothingEnabled) {
      if (this.rootContext.webkitImageSmoothingEnabled) {
        this.smoothProperty = "webkitImageSmoothingEnabled";
      } else if (this.rootContext.mozImageSmoothingEnabled) {
        this.smoothProperty = "mozImageSmoothingEnabled";
      } else if (this.rootContext.oImageSmoothingEnabled) {
        this.smoothProperty = "oImageSmoothingEnabled";
      } else if (this.rootContext.msImageSmoothingEnabled) {
        this.smoothProperty = "msImageSmoothingEnabled";
      }
    }
    this.initPlugins();
    this.blendModes = (0, _mapCanvasBlendModesToPixi.default)();
    this._activeBlendMode = null;
    this.renderingToScreen = false;
    var {
      width,
      height,
      quality,
      anti
    } = this.options;
    this.resize(width, height);
    if (quality) {
      this.context.quality = quality;
    }
    if (anti) {
      this.context.antialias = anti;
    }
  }
  render(displayObject, renderTexture, clear, transform, skipUpdateTransform) {
    if (!this.view) return;
    this.renderingToScreen = !renderTexture;
    this.emit("prerender");
    var rootResolution = this.resolution;
    this.context = this.rootContext;
    var context = this.context;
    if (!renderTexture) {
      this._lastObjectRendered = displayObject;
    }
    if (!skipUpdateTransform) {
      var cacheParent = displayObject.parent;
      var tempWt = this._tempDisplayObjectParent.transform.worldTransform;
      if (transform) {
        transform.copy(tempWt);
        this._tempDisplayObjectParent.transform._worldID = -1;
      } else {
        tempWt.identity();
      }
      displayObject.parent = this._tempDisplayObjectParent;
      displayObject.updateTransform();
      displayObject.parent = cacheParent;
    }
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.globalAlpha = 1;
    this._activeBlendMode = _const.BLEND_MODES.NORMAL;
    context.globalCompositeOperation = this.blendModes[_const.BLEND_MODES.NORMAL];
    if (clear !== undefined ? clear : this.clearBeforeRender) {
      if (this.renderingToScreen) {
        if (this.transparent) {
          context.clearRect(0, 0, this.width, this.height);
        } else {
          context.fillStyle = this._backgroundColorString;
          context.fillRect(0, 0, this.width, this.height);
        }
      }
    }

    // TODO RENDER TARGET STUFF HERE..
    var tempContext = this.context;
    this.context = context;
    displayObject.renderCanvas(this);
    this.context = tempContext;
    context.restore();
    this.resolution = rootResolution;
    this.emit("postrender");
  }
  clear(clearColor) {
    var context = this.context;
    clearColor = clearColor || this._backgroundColorString;
    if (!this.transparent && clearColor) {
      context.fillStyle = clearColor;
      context.fillRect(0, 0, this.width, this.height);
    } else {
      context.clearRect(0, 0, this.width, this.height);
    }
  }
  setBlendMode(blendMode) {
    if (this._activeBlendMode === blendMode) {
      return;
    }
    this._activeBlendMode = blendMode;
    this.context.globalCompositeOperation = this.blendModes[blendMode];
  }
  destroy(removeView) {
    this.destroyPlugins();
    super.destroy(removeView);
    this.context = null;
    this.refresh = true;
    this.maskManager.destroy();
    this.maskManager = null;
    this.smoothProperty = null;
  }
  resize(screenWidth, screenHeight) {
    super.resize(screenWidth, screenHeight);
    if (this.smoothProperty) {
      this.rootContext[this.smoothProperty] = _settings.default.SCALE_MODE === _const.SCALE_MODES.LINEAR;
    }
  }
  invalidateBlendMode() {
    this._activeBlendMode = this.blendModes.indexOf(this.context.globalCompositeOperation);
  }
}
exports.default = CanvasRenderer;
_utils.pluginTarget.mixin(CanvasRenderer);
//# sourceMappingURL=CanvasRenderer.js.map