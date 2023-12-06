const {createAndAppendElement, isUndefined} = require('./xmlUtils');

// Create 'text' element as a child of 'spine'
function createVideoElement(xmlDoc, spineElement, attributes = {}) {
  attributes.loop = isUndefined(attributes.loop) ? 'false' : attributes.loop;
  attributes.audio = isUndefined(attributes.audio) ? 'false' : attributes.audio;
  attributes.preload = isUndefined(attributes.preload) ? 'true' : attributes.preload;
  attributes.x = isUndefined(attributes.x) ? '50vw' : attributes.x;
  attributes.y = isUndefined(attributes.y) ? '50vh' : attributes.y;
  attributes.height = isUndefined(attributes.height) ? '100vh' : attributes.height;
  attributes.width = isUndefined(attributes.width) ? '100vw' : attributes.width;
  attributes.src = isUndefined(attributes.src) ? 'https://cos.mirav.cn/player/pic_oceans.mp4' : attributes.src;
  attributes.duration = isUndefined(attributes.duration) ? '10' : attributes.duration;
  attributes.ss = isUndefined(attributes.ss) ? '0' : attributes.ss;

  return createAndAppendElement(xmlDoc, spineElement, 'video', attributes);
}

module.exports = {
  createVideoElement
}