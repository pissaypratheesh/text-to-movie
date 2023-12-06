"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _const = require("../../const");
/**
 * The Rounded Rectangle object is an area that has nice rounded corners, as indicated by its
 * top-left corner point (x, y) and by its width and its height and its radius.
 *
 * @class
 * @memberof InkPaint
 */
class RoundedRectangle {
  /**
   * @param {number} [x=0] - The X coordinate of the upper-left corner of the rounded rectangle
   * @param {number} [y=0] - The Y coordinate of the upper-left corner of the rounded rectangle
   * @param {number} [width=0] - The overall width of this rounded rectangle
   * @param {number} [height=0] - The overall height of this rounded rectangle
   * @param {number} [radius=20] - Controls the radius of the rounded corners
   */
  constructor(x, y, width, height, radius) {
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
    if (radius === void 0) {
      radius = 20;
    }
    /**
     * @member {number}
     * @default 0
     */
    this.x = x;

    /**
     * @member {number}
     * @default 0
     */
    this.y = y;

    /**
     * @member {number}
     * @default 0
     */
    this.width = width;

    /**
     * @member {number}
     * @default 0
     */
    this.height = height;

    /**
     * @member {number}
     * @default 20
     */
    this.radius = radius;

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     * @readonly
     * @default InkPaint.SHAPES.RREC
     * @see InkPaint.SHAPES
     */
    this.type = _const.SHAPES.RREC;
  }

  /**
   * Creates a clone of this Rounded Rectangle
   *
   * @return {InkPaint.RoundedRectangle} a copy of the rounded rectangle
   */
  clone() {
    return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
  }

  /**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   *
   * @param {number} x - The X coordinate of the point to test
   * @param {number} y - The Y coordinate of the point to test
   * @return {boolean} Whether the x/y coordinates are within this Rounded Rectangle
   */
  contains(x, y) {
    if (this.width <= 0 || this.height <= 0) {
      return false;
    }
    if (x >= this.x && x <= this.x + this.width) {
      if (y >= this.y && y <= this.y + this.height) {
        if (y >= this.y + this.radius && y <= this.y + this.height - this.radius || x >= this.x + this.radius && x <= this.x + this.width - this.radius) {
          return true;
        }
        var dx = x - (this.x + this.radius);
        var dy = y - (this.y + this.radius);
        var radius2 = this.radius * this.radius;
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dx = x - (this.x + this.width - this.radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dy = y - (this.y + this.height - this.radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
        dx = x - (this.x + this.radius);
        if (dx * dx + dy * dy <= radius2) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.default = RoundedRectangle;
//# sourceMappingURL=RoundedRectangle.js.map