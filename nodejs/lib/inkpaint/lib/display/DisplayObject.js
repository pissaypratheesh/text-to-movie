"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _eventemitter = _interopRequireDefault(require("eventemitter3"));
var _const = require("../const");
var _Bounds = _interopRequireDefault(require("./Bounds"));
var _settings = _interopRequireDefault(require("../settings"));
var _Transform = _interopRequireDefault(require("./Transform"));
var _utils = require("../utils");
var _math = require("../math");
var _TransformStatic = _interopRequireDefault(require("./TransformStatic"));
var _FXAAFilter = _interopRequireDefault(require("../filters/fxaa/FXAAFilter"));
var _BlurFilter = _interopRequireDefault(require("../filters/blur/BlurFilter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DisplayObject extends _eventemitter.default {
  constructor() {
    super();
    var TransformClass = _settings.default.TRANSFORM_MODE === _const.TRANSFORM_MODE.STATIC ? _TransformStatic.default : _Transform.default;
    this.tempDisplayObjectParent = null;
    this.transform = new TransformClass();
    this.alpha = 1;
    this.visible = true;
    this.renderable = true;
    this.parent = null;
    this.worldAlpha = 1;
    this.filterArea = null;
    this.initScale = new _math.Point(1, 1);
    this.filters = null;
    this._enabledFilters = null;
    this._bounds = new _Bounds.default();
    this._boundsID = 0;
    this._lastBoundsID = -1;
    this._boundsRect = null;
    this._localBoundsRect = null;
    this._mask = null;
    this._blur = 0;
    this._fxaa = false;
    this.maskEnabled = true;
    this.destroyed = false;
    this.id = (0, _utils.uuidvx)();
  }
  get _tempDisplayObjectParent() {
    if (this.tempDisplayObjectParent === null) {
      this.tempDisplayObjectParent = new DisplayObject();
    }
    return this.tempDisplayObjectParent;
  }
  updateTransform() {
    this.transform.updateTransform(this.parent.transform);
    this.worldAlpha = this.alpha * this.parent.worldAlpha;
    this._bounds.updateID++;
  }
  _recursivePostUpdateTransform() {
    if (this.parent) {
      this.parent._recursivePostUpdateTransform();
      this.transform.updateTransform(this.parent.transform);
    } else {
      this.transform.updateTransform(this._tempDisplayObjectParent.transform);
    }
  }
  getBounds(skipUpdate, rect) {
    if (!skipUpdate) {
      if (!this.parent) {
        this.parent = this._tempDisplayObjectParent;
        this.updateTransform();
        this.parent = null;
      } else {
        this._recursivePostUpdateTransform();
        this.updateTransform();
      }
    }
    if (this._boundsID !== this._lastBoundsID && this.maskEnabled) {
      this.calculateBounds();
    }
    if (!rect) {
      if (!this._boundsRect) {
        this._boundsRect = new _math.Rectangle();
      }
      rect = this._boundsRect;
    }
    return this._bounds.getRectangle(rect);
  }
  getLocalBounds(rect) {
    var transformRef = this.transform;
    var parentRef = this.parent;
    this.parent = null;
    this.transform = this._tempDisplayObjectParent.transform;
    if (!rect) {
      if (!this._localBoundsRect) {
        this._localBoundsRect = new _math.Rectangle();
      }
      rect = this._localBoundsRect;
    }
    var bounds = this.getBounds(false, rect);
    this.parent = parentRef;
    this.transform = transformRef;
    return bounds;
  }
  toGlobal(position, point, skipUpdate) {
    if (skipUpdate === void 0) {
      skipUpdate = false;
    }
    if (!skipUpdate) {
      this._recursivePostUpdateTransform();
      if (!this.parent) {
        this.parent = this._tempDisplayObjectParent;
        this.displayObjectUpdateTransform();
        this.parent = null;
      } else {
        this.displayObjectUpdateTransform();
      }
    }
    return this.worldTransform.apply(position, point);
  }
  getGlobalPosition(point, skipUpdate) {
    if (skipUpdate === void 0) {
      skipUpdate = false;
    }
    if (this.parent) {
      this.parent.toGlobal(this.position, point, skipUpdate);
    } else {
      point.x = this.position.x;
      point.y = this.position.y;
    }
    return point;
  }
  toLocal(position, from, point, skipUpdate) {
    if (from) {
      position = from.toGlobal(position, point, skipUpdate);
    }
    if (!skipUpdate) {
      this._recursivePostUpdateTransform();
      if (!this.parent) {
        this.parent = this._tempDisplayObjectParent;
        this.displayObjectUpdateTransform();
        this.parent = null;
      } else {
        this.displayObjectUpdateTransform();
      }
    }
    return this.worldTransform.applyInverse(position, point);
  }
  copyFromProxy(proxyObj) {
    var copyFunc = key => {
      if (proxyObj[key] !== null) {
        this[key] = proxyObj[key];
      }
    };
    copyFunc("x");
    copyFunc("y");
    copyFunc("text");
    copyFunc("style");
    copyFunc("width");
    copyFunc("height");
    copyFunc("alpha");
    copyFunc("rotation");
    copyFunc("blendMode");
    this.scale.copy(proxyObj.scale);
    this.anchor.copy(proxyObj.anchor);
  }
  substitute(proxyObj) {
    this.copyFromProxy(proxyObj);
    var {
      parent
    } = proxyObj;
    if (parent) {
      var index = parent.getChildIndex(proxyObj);
      parent.removeChild(proxyObj);
      parent.addChildAt(this, index);
    }
    proxyObj.destroy();
    proxyObj = null;
  }
  renderWebGL(renderer) {
    // OVERWRITE;
  }
  renderCanvas(renderer) {
    // OVERWRITE;
  }
  setParent(container) {
    if (!container || !container.addChild) {
      throw new Error("setParent: Argument must be a Container");
    }
    container.addChild(this);
    return container;
  }
  setTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, pivotX, pivotY) {
    if (x === void 0) {
      x = 0;
    }
    if (y === void 0) {
      y = 0;
    }
    if (scaleX === void 0) {
      scaleX = 1;
    }
    if (scaleY === void 0) {
      scaleY = 1;
    }
    if (rotation === void 0) {
      rotation = 0;
    }
    if (skewX === void 0) {
      skewX = 0;
    }
    if (skewY === void 0) {
      skewY = 0;
    }
    if (pivotX === void 0) {
      pivotX = 0;
    }
    if (pivotY === void 0) {
      pivotY = 0;
    }
    this.position.x = x;
    this.position.y = y;
    this.scale.x = !scaleX ? 1 : scaleX;
    this.scale.y = !scaleY ? 1 : scaleY;
    this.rotation = rotation;
    this.skew.x = skewX;
    this.skew.y = skewY;
    this.pivot.x = pivotX;
    this.pivot.y = pivotY;
    return this;
  }
  setScaleToInit() {
    this.initScale.copy(this.scale);
  }
  copyScaleAndInit(scale) {
    this.scale.copy(scale);
    this.initScale.copy(scale);
  }
  attr(attrs) {
    var scaleInitX = this.initScale.x;
    var scaleInitY = this.initScale.y;
    for (var key in attrs) {
      var val = attrs[key];
      switch (key) {
        case "scale":
          this.scale.x = val * scaleInitX;
          this.scale.y = val * scaleInitY;
          break;
        case "skew":
          this.skew.x = val;
          this.skew.y = val;
          break;
        case "rotate":
          this.rotation = val;
          break;
        default:
          this[key] = val;
      }
    }
  }
  getAttr(key) {
    var attr;
    switch (key) {
      case "scale":
        attr = this.scale.x;
        break;
      case "rotate":
        attr = this.rotation;
        break;
      default:
        attr = this[key];
    }
    return attr;
  }
  get x() {
    return this.position.x;
  }
  set x(value) {
    this.transform.position.x = value;
  }
  get y() {
    return this.position.y;
  }
  set y(value) {
    this.transform.position.y = value;
  }
  get worldTransform() {
    return this.transform.worldTransform;
  }
  get localTransform() {
    return this.transform.localTransform;
  }
  get position() {
    return this.transform.position;
  }
  set position(value) {
    this.transform.position.copy(value);
  }
  get scale() {
    return this.transform.scale;
  }
  set scale(value) {
    this.transform.scale.copy(value);
  }
  get pivot() {
    return this.transform.pivot;
  }
  set pivot(value) {
    this.transform.pivot.copy(value);
  }
  get skew() {
    return this.transform.skew;
  }
  set skew(value) {
    this.transform.skew.copy(value);
  }
  get rotation() {
    return this.transform.rotation;
  }
  set rotation(value) {
    this.transform.rotation = value;
  }
  get worldVisible() {
    var item = this;
    do {
      if (!item.visible) {
        return false;
      }
      item = item.parent;
    } while (item);
    return true;
  }
  get mask() {
    return this._mask;
  }
  set mask(value) {
    if (this._mask) {
      this._mask.renderable = true;
      this._mask.isMask = false;
    }
    this._mask = value;
    if (this._mask) {
      this._mask.renderable = false;
      this._mask.isMask = true;
    }
  }
  hasFilters() {
    if (this.filters && this.filters.length) {
      return true;
    } else {
      return false;
    }
  }
  set blur(blur) {
    if (blur === void 0) {
      blur = 0;
    }
    this._blur = blur;
    if (blur <= 0) {
      this.filters = null;
      return;
    }
    if (!this.filters) {
      this.filters = [new _BlurFilter.default()];
    }
    this.filters[0].blur = blur;
  }
  set fxaa(fxaa) {
    if (fxaa === false) {
      this.filters = null;
      return;
    }
    if (!this.filters) {
      this.filters = [new _FXAAFilter.default()];
    }
  }
  get fxaa() {
    return this._fxaa;
  }
  get blur() {
    return this._blur;
  }
  destroy() {
    if (this.destroyed) return;
    this.removeAllListeners();
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.blur = 0;
    this.fxaa = false;
    this.filters = null;
    this.transform = null;
    this.initScale = null;
    this.parent = null;
    this._bounds = null;
    this._currentBounds = null;
    this._mask = null;
    this.filterArea = null;
    this.interactive = false;
    this.interactiveChildren = false;
    this.destroyed = true;
  }
}

// performance increase to avoid using call.. (10x faster)
exports.default = DisplayObject;
DisplayObject.prototype.displayObjectUpdateTransform = DisplayObject.prototype.updateTransform;
//# sourceMappingURL=DisplayObject.js.map