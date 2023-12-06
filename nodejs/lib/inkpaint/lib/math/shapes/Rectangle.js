"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _const = require("../../const");
class Rectangle {
  constructor(x, y, width, height) {
    if (x === void 0) {
      x = 0;
    }
    if (y === void 0) {
      y = 0;
    }
    if (width === void 0) {
      width = 0;
    }
    if (height === void 0) {
      height = 0;
    }
    this.x = Number(x);
    this.y = Number(y);
    this.width = Number(width);
    this.height = Number(height);
    this.type = _const.SHAPES.RECT;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  static get EMPTY() {
    return new Rectangle(0, 0, 0, 0);
  }
  clone() {
    return new Rectangle(this.x, this.y, this.width, this.height);
  }
  copy(rectangle) {
    this.x = rectangle.x;
    this.y = rectangle.y;
    this.width = rectangle.width;
    this.height = rectangle.height;
    return this;
  }
  contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }
    if (x >= this.x && x < this.x + this.width) {
      if (y >= this.y && y < this.y + this.height) {
        return true;
      }
    }
    return false;
  }
  pad(paddingX, paddingY) {
    paddingX = paddingX || 0;
    paddingY = paddingY || (paddingY !== 0 ? paddingX : 0);
    this.x -= paddingX;
    this.y -= paddingY;
    this.width += paddingX * 2;
    this.height += paddingY * 2;
  }
  fit(rectangle) {
    var x1 = Math.max(this.x, rectangle.x);
    var x2 = Math.min(this.x + this.width, rectangle.x + rectangle.width);
    var y1 = Math.max(this.y, rectangle.y);
    var y2 = Math.min(this.y + this.height, rectangle.y + rectangle.height);
    this.x = x1;
    this.width = Math.max(x2 - x1, 0);
    this.y = y1;
    this.height = Math.max(y2 - y1, 0);
  }

  /**
   * Enlarges this rectangle to include the passed rectangle.
   *
   * @param {InkPaint.Rectangle} rectangle - The rectangle to include.
   */
  enlarge(rectangle) {
    var x1 = Math.min(this.x, rectangle.x);
    var x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
    var y1 = Math.min(this.y, rectangle.y);
    var y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);
    this.x = x1;
    this.width = x2 - x1;
    this.y = y1;
    this.height = y2 - y1;
  }
  ceil(resolution, eps) {
    if (resolution === void 0) {
      resolution = 1;
    }
    if (eps === void 0) {
      eps = 0.001;
    }
    var x2 = Math.ceil((this.x + this.width - eps) * resolution) / resolution;
    var y2 = Math.ceil((this.y + this.height - eps) * resolution) / resolution;
    this.x = Math.floor((this.x + eps) * resolution) / resolution;
    this.y = Math.floor((this.y + eps) * resolution) / resolution;
    this.width = x2 - this.x;
    this.height = y2 - this.y;
  }
  toString() {
    return "Rect:: " + this.x + "_" + this.y + "_" + this.width + "_" + this.height;
  }
}
exports.default = Rectangle;
//# sourceMappingURL=Rectangle.js.map