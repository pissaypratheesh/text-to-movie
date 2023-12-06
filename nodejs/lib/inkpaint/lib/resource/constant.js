"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XHR_TYPE_MAP = exports.XHR_RESPONSE_TYPE = exports.STATUS_FLAGS = exports.LOAD_TYPE_MAP = exports.LOAD_TYPE = void 0;
var STATUS_FLAGS = {
  NONE: 0,
  DATA_URL: 1 << 0,
  COMPLETE: 1 << 1,
  LOADING: 1 << 2
};
exports.STATUS_FLAGS = STATUS_FLAGS;
var LOAD_TYPE = {
  XHR: 1,
  IMAGE: 2,
  AUDIO: 3,
  VIDEO: 4
};
exports.LOAD_TYPE = LOAD_TYPE;
var XHR_RESPONSE_TYPE = {
  DEFAULT: "text",
  BUFFER: "arraybuffer",
  BLOB: "blob",
  DOCUMENT: "document",
  JSON: "json",
  TEXT: "text"
};
exports.XHR_RESPONSE_TYPE = XHR_RESPONSE_TYPE;
var XHR_TYPE_MAP = {
  // xml
  xhtml: XHR_RESPONSE_TYPE.DOCUMENT,
  html: XHR_RESPONSE_TYPE.DOCUMENT,
  htm: XHR_RESPONSE_TYPE.DOCUMENT,
  xml: XHR_RESPONSE_TYPE.DOCUMENT,
  tmx: XHR_RESPONSE_TYPE.DOCUMENT,
  svg: XHR_RESPONSE_TYPE.DOCUMENT,
  tsx: XHR_RESPONSE_TYPE.DOCUMENT,
  fnt: XHR_RESPONSE_TYPE.DOCUMENT,
  // images
  gif: XHR_RESPONSE_TYPE.BLOB,
  png: XHR_RESPONSE_TYPE.BLOB,
  bmp: XHR_RESPONSE_TYPE.BLOB,
  jpg: XHR_RESPONSE_TYPE.BLOB,
  jpeg: XHR_RESPONSE_TYPE.BLOB,
  tif: XHR_RESPONSE_TYPE.BLOB,
  tiff: XHR_RESPONSE_TYPE.BLOB,
  webp: XHR_RESPONSE_TYPE.BLOB,
  tga: XHR_RESPONSE_TYPE.BLOB,
  // json
  json: XHR_RESPONSE_TYPE.JSON,
  // text
  text: XHR_RESPONSE_TYPE.TEXT,
  txt: XHR_RESPONSE_TYPE.TEXT,
  // fonts
  ttf: XHR_RESPONSE_TYPE.BUFFER,
  otf: XHR_RESPONSE_TYPE.BUFFER
};
exports.XHR_TYPE_MAP = XHR_TYPE_MAP;
var LOAD_TYPE_MAP = {
  // images
  gif: LOAD_TYPE.IMAGE,
  png: LOAD_TYPE.IMAGE,
  bmp: LOAD_TYPE.IMAGE,
  jpg: LOAD_TYPE.IMAGE,
  jpeg: LOAD_TYPE.IMAGE,
  tif: LOAD_TYPE.IMAGE,
  tiff: LOAD_TYPE.IMAGE,
  webp: LOAD_TYPE.IMAGE,
  tga: LOAD_TYPE.IMAGE,
  svg: LOAD_TYPE.IMAGE,
  // audio
  mp3: LOAD_TYPE.AUDIO,
  ogg: LOAD_TYPE.AUDIO,
  wav: LOAD_TYPE.AUDIO,
  // videos
  mp4: LOAD_TYPE.VIDEO,
  webm: LOAD_TYPE.VIDEO
};
exports.LOAD_TYPE_MAP = LOAD_TYPE_MAP;
//# sourceMappingURL=constant.js.map