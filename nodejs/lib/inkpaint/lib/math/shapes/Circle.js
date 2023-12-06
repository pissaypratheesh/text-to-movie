"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Rectangle = _interopRequireDefault(require("./Rectangle"));
var _const = require("../../const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * The Circle object can be used to specify a hit area for displayObjects
 *
 * @class
 * @memberof InkPaint
 */
class Circle {
  /**
   * @param {number} [x=0] - The X coordinate of the center of this circle
   * @param {number} [y=0] - The Y coordinate of the center of this circle
   * @param {number} [radius=0] - The radius of the circle
   */
  constructor(x, y, radius) {
    if (x === void 0) {
      x = 0;
    }
    if (y === void 0) {
      y = 0;
    }
    if (radius === void 0) {
      radius = 0;
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
    this.radius = radius;

    /**
     * The type of the object, mainly used to avoid `instanceof` checks
     *
     * @member {number}
     * @readOnly
     * @default InkPaint.SHAPES.CIRC
     * @see InkPaint.SHAPES
     */
    this.type = _const.SHAPES.CIRC;
  }

  /**
   * Creates a clone of this Circle instance
   *
   * @return {InkPaint.Circle} a copy of the Circle
   */
  clone() {
    return new Circle(this.x, this.y, this.radius);
  }

  /**
   * Checks whether the x and y coordinates given are contained within this circle
   *
   * @param {number} x - The X coordinate of the point to test
   * @param {number} y - The Y coordinate of the point to test
   * @return {boolean} Whether the x/y coordinates are within this Circle
   */
  contains(x, y) {
    if (this.radius <= 0) {
      return false;
    }
    var r2 = this.radius * this.radius;
    var dx = this.x - x;
    var dy = this.y - y;
    dx *= dx;
    dy *= dy;
    return dx + dy <= r2;
  }

  /**
   * Returns the framing rectangle of the circle as a Rectangle object
   *
   * @return {InkPaint.Rectangle} the framing rectangle
   */
  getBounds() {
    return new _Rectangle.default(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
  }
}
exports.default = Circle;
//# sourceMappingURL=Circle.js.map