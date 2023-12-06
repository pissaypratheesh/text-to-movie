"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WRAP_MODES = exports.URL_FILE_EXTENSION = exports.UPDATE_PRIORITY = exports.TRANSFORM_MODE = exports.TEXT_GRADIENT = exports.SVG_SIZE = exports.SHAPES = exports.SCALE_MODES = exports.RENDERER_TYPE = exports.RAD_TO_DEG = exports.PRECISION = exports.PI_2 = exports.GC_MODES = exports.DRAW_MODES = exports.DEG_TO_RAD = exports.DATA_URI = exports.BLEND_MODES = void 0;
var PI_2 = Math.PI * 2;
exports.PI_2 = PI_2;
var RAD_TO_DEG = 180 / Math.PI;
exports.RAD_TO_DEG = RAD_TO_DEG;
var DEG_TO_RAD = Math.PI / 180;
exports.DEG_TO_RAD = DEG_TO_RAD;
var RENDERER_TYPE = {
  UNKNOWN: 0,
  WEBGL: 1,
  CANVAS: 2
};
exports.RENDERER_TYPE = RENDERER_TYPE;
var BLEND_MODES = {
  NORMAL: 0,
  ADD: 1,
  MULTIPLY: 2,
  SCREEN: 3,
  OVERLAY: 4,
  DARKEN: 5,
  LIGHTEN: 6,
  COLOR_DODGE: 7,
  COLOR_BURN: 8,
  HARD_LIGHT: 9,
  SOFT_LIGHT: 10,
  DIFFERENCE: 11,
  EXCLUSION: 12,
  HUE: 13,
  SATURATION: 14,
  COLOR: 15,
  LUMINOSITY: 16,
  NORMAL_NPM: 17,
  ADD_NPM: 18,
  SCREEN_NPM: 19
};
exports.BLEND_MODES = BLEND_MODES;
var DRAW_MODES = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
};
exports.DRAW_MODES = DRAW_MODES;
var SCALE_MODES = {
  LINEAR: 0,
  NEAREST: 1
};
exports.SCALE_MODES = SCALE_MODES;
var WRAP_MODES = {
  CLAMP: 0,
  REPEAT: 1,
  MIRRORED_REPEAT: 2
};
exports.WRAP_MODES = WRAP_MODES;
var GC_MODES = {
  AUTO: 0,
  MANUAL: 1
};
exports.GC_MODES = GC_MODES;
var URL_FILE_EXTENSION = /\.(\w{3,4})(?:$|\?|#)/i;
exports.URL_FILE_EXTENSION = URL_FILE_EXTENSION;
var DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;
exports.DATA_URI = DATA_URI;
var SVG_SIZE = /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i; // eslint-disable-line max-len
exports.SVG_SIZE = SVG_SIZE;
var SHAPES = {
  POLY: 0,
  RECT: 1,
  CIRC: 2,
  ELIP: 3,
  RREC: 4
};
exports.SHAPES = SHAPES;
var PRECISION = {
  LOW: "lowp",
  MEDIUM: "mediump",
  HIGH: "highp"
};
exports.PRECISION = PRECISION;
var TRANSFORM_MODE = {
  STATIC: 0,
  DYNAMIC: 1
};
exports.TRANSFORM_MODE = TRANSFORM_MODE;
var TEXT_GRADIENT = {
  LINEAR_VERTICAL: 0,
  LINEAR_HORIZONTAL: 1
};
exports.TEXT_GRADIENT = TEXT_GRADIENT;
var UPDATE_PRIORITY = {
  INTERACTION: 50,
  HIGH: 25,
  NORMAL: 0,
  LOW: -25,
  UTILITY: -50
};
exports.UPDATE_PRIORITY = UPDATE_PRIORITY;
//# sourceMappingURL=const.js.map