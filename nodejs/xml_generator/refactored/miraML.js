const { DOMParser } = require('xmldom');
const { createAndAppendElement } = require('./xmlUtils');

function createMiraML() {
  var xmlDoc = new DOMParser().parseFromString('<miraml></miraml>', 'text/xml');
  var miramlElement = xmlDoc.documentElement;
  miramlElement.setAttribute('author', 'ZhaoJun');
  miramlElement.setAttribute('name', 'Composite');

  var canvasElement = createAndAppendElement(xmlDoc, miramlElement, 'canvas', { width: '1280', height: '720', mute: 'true' });
  var spineElement = createAndAppendElement(xmlDoc, canvasElement, 'spine');

  var textElement = createTextElement(xmlDoc, spineElement);
  createAudioElement(xmlDoc, textElement);
  createContentElement(xmlDoc, textElement, 'Ready?');
  createStrokeElement(xmlDoc, textElement, { color: '#FFF', size: '5%' });
  createShadowElement(xmlDoc, textElement, { color: '#1FB0F9', alpha: '1', offset: '5%' });

  createAndAppendElement(xmlDoc, spineElement, 'trans', { duration: '1.5', key: 'fadecolor' });
  var sceneElement = createAndAppendElement(xmlDoc, spineElement, 'scene');

  var videoElement1 = createVideoElement(xmlDoc, sceneElement, {
    loop: 'false',
    audio: 'false',
    x: '50vw',
    y: '50vh',
    height: '100vh',
    zIndex: '2',
    src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
    preload: 'true',
    duration: '10',
    ss: '2'
  });

  var textElementVideo1 = createTextElement(xmlDoc, videoElement1, {
    fontSize: '100rpx',
    color: '#FFF',
    x: '50vw',
    y: '50vh',
    lineHeight: '90%',
    fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
    asMask: 'true',
    duration: '4'
  });

  createContentElement(xmlDoc, textElementVideo1, 'OCEAN');
  createStrokeElement(xmlDoc, textElementVideo1, { color: '#FFF', size: '5%' });

  createAnimateElement(xmlDoc, textElementVideo1, { time: '2', delay: '2' }, [
    createAndAppendElement(xmlDoc, null, 'from', { scale: '1' }),
    createAndAppendElement(xmlDoc, null, 'to', { scale: '30', y: '1500' })
  ]);

  createAnimateElement(xmlDoc, videoElement1, { time: '0.5', delay: '5' }, [
    createAndAppendElement(xmlDoc, null, 'from', { scale: '1' }),
    createAndAppendElement(xmlDoc, null, 'to', { scale: '0.2', y: '150', x: '250' })
  ]);

  createAnimateElement(xmlDoc, videoElement1, { time: '0.5', delay: '9' }, [
    createAndAppendElement(xmlDoc, null, 'from', { x: '50' }),
    createAndAppendElement(xmlDoc, null, 'to', { x: '-300' })
  ]);

  createAndAppendElement(xmlDoc, sceneElement, 'video', {
    loop: 'false',
    audio: 'false',
    x: '50vw',
    y: '50vh',
    width: '100vw',
    height: '100vh',
    src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
    start: '5',
    duration: '5',
    ss: '20'
  });

  createAndAppendElement(xmlDoc, spineElement, 'trans', { duration: '1', key: 'fade' });

  var videoElement3 = createVideoElement(xmlDoc, spineElement, {
    loop: 'false',
    audio: 'false',
    x: '50vw',
    y: '50vh',
    width: '100vw',
    height: '100vh',
    src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
    duration: '5',
    ss: '30',
    blur: '10'
  });

  var textElementVideo3_1 = createTextElement(xmlDoc, videoElement3, {
    fontSize: '60rpx',
    color: '#FFF',
    x: '50vw',
    y: '45vh',
    lineHeight: '90%',
    fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
    effect: 'zoomInDown',
    effectTime: '1',
    opacity: '0.8'
  });

  createContentElement(xmlDoc, textElementVideo3_1, 'Mira Player');
  createStrokeElement(xmlDoc, textElementVideo3_1, { color: '#FFF', size: '5%' });

  var textElementVideo3_2 = createTextElement(xmlDoc, videoElement3, {
    fontSize: '20rpx',
    color: '#FFF',
    x: '50vw',
    y: '70vh',
    lineHeight: '90%',
    fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
    effect: 'zoomInUp',
    effectTime: '1',
    opacity: '0.6'
  });

  createContentElement(xmlDoc, textElementVideo3_2, 'Powered By FFCreator');
  createStrokeElement(xmlDoc, textElementVideo3_2, { color: '#FFF', size: '5%' });

  createAnimateElement(xmlDoc, videoElement3, { time: '2' }, [
    createAndAppendElement(xmlDoc, null, 'from', { scale: '1' }),
    createAndAppendElement(xmlDoc, null, 'to', { scale: '30', y: '1500' })
  ]);

  var audioElement2 = createAndAppendElement(xmlDoc, canvasElement, 'audio', { audio: 'true', src: 'https://cos.mirav.cn/player/oceans.mp3', duration: '17', fadeOut: '1' });

  // Append videoElement3 and audioElement2 to their respective parent elements
  spineElement.appendChild(videoElement3);
  canvasElement.appendChild(audioElement2);

  return xmlDoc;
}

// Helper functions for creating elements

function createTextElement(doc, parent, attributes = {}) {
  return createAndAppendElement(doc, parent, 'text', attributes);
}

function createVideoElement(doc, parent, attributes = {}) {
  return createAndAppendElement(doc, parent, 'video', attributes);
}

function createAudioElement(doc, parent, attributes = {}) {
    var audioElement = createAndAppendElement(doc, parent, 'audio', attributes);
  
    // Check if 'src' attribute is provided
    if (attributes.src) {
      createAndAppendElement(doc, audioElement, 'source', { src: attributes.src });
    }
  
    return audioElement;
  }
  
function createContentElement(doc, parent, content, attributes = {}) {
  return createAndAppendElement(doc, parent, 'content', attributes, content);
}

function createStrokeElement(doc, parent, attributes = {}) {
  return createAndAppendElement(doc, parent, 'stroke', attributes);
}

function createShadowElement(doc, parent, attributes = {}) {
  return createAndAppendElement(doc, parent, 'shadow', attributes);
}

function createAnimateElement(doc, parent, attributes = {}) {
    var animateElement = createAndAppendElement(doc, parent, 'animate', attributes);
  
    // Check if 'from' and 'to' attributes are provided
    if (attributes.from) {
      var fromElement = createAndAppendElement(doc, animateElement, 'from', attributes.from);
    }
  
    if (attributes.to) {
      var toElement = createAndAppendElement(doc, animateElement, 'to', attributes.to);
    }
  
    return animateElement;
}
  
  

module.exports = {
  createMiraML,
};
