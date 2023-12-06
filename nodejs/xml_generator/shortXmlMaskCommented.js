const { DOMParser, XMLSerializer } = require('xmldom');
const { createAndAppendElement } = require('./xmlUtils');
const { createBigTextElement, createTextMaskElement } = require('./createText')
const { createTransitionElement } = require('./createTransition')
const { createSceneElement } = require('./createScene')
const { createVideoElement } = require('./createVideo')
const { createAudioElement } = require('./createAudio')
const { animateGivenElement } = require('./animateElement')
// Create XML document
var xmlDoc = new DOMParser().parseFromString('<miraml></miraml>', 'text/xml');

// Create the root element 'miraml'
var miramlElement = xmlDoc.documentElement;
miramlElement.setAttribute('author', 'Pratheesh PM');
miramlElement.setAttribute('name', 'Composite');

// Create 'canvas' element as a child of 'miraml'
var canvasElement = createAndAppendElement(xmlDoc, miramlElement, 'canvas', { width: '1280', height: '720', mute: 'true' });

// Create 'spine' element as a child of 'canvas'
var spineElement = createAndAppendElement(xmlDoc, canvasElement, 'spine');

// Create 'text' element as a child of 'spine' (doc, target, text, textconfig, audioconfig)
createBigTextElement(xmlDoc, spineElement, 'Ready?', {
  fontSize: '80rpx',
  color: '#FFF',
  x: '50vw',
  y: '50vh',
  lineHeight: '90%',
  letterSpacing: '10%',
  fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
  duration: '2'
}, {
  src: 'https://cos.mirav.cn/player/ReadyGo.mp3'
});

// Create 'trans' element as a child of 'spine'
createTransitionElement(xmlDoc, spineElement, { duration: '1.5', key: 'fadecolor' }); 

// Create 'scene' element as a child of 'spine'
var sceneElement = createSceneElement(xmlDoc, spineElement, 'scene1');

// Create 'video' element as a child of 'scene'
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

// Create 'text' element as a child of 'video' and mask and animate it for target videoelement1
createTextMaskElement(xmlDoc, videoElement1, 'OCEAN' ,true, {
  fontSize: '100rpx',
  color: '#FFF',
  x: '50vw',
  y: '50vh',
  lineHeight: '90%',
  fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
  asMask: 'true',
  duration: '4'
});

// Create 'animate' elements for 'video1' under 'video1'
animateGivenElement(xmlDoc, videoElement1, [
  { time: '0.5', delay: '5' , from: { scale: '1' }, to: { scale: '0.2', y: '150', x: '250' }},
  { time: '0.5', delay: '9' , from: { x: '50' },    to: { x: '-300' }},
])

// Create 'video' element as a child of 'SCENE'
var videoElement2 = createVideoElement(xmlDoc, sceneElement, {
  src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
  start: '5',
  duration: '5',
  ss: '20'
});

// Create 'trans' element as a child of 'SPINE'
createTransitionElement(xmlDoc, spineElement, { duration: '1', key: 'fade' }); 

// Create 'video' element as a child of 'SPINE'
var videoElement3 = createVideoElement(xmlDoc, spineElement, {
  src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
  duration: '5',
  ss: '30',
  blur: '10'
});

 // Create 'text' element as a child of 'video'
createTextMaskElement(xmlDoc, videoElement3, 'Mira Player', false, {
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

 // Create another 'text' element as a child of 'video'
createTextMaskElement(xmlDoc, videoElement3, 'Powered By FFCreator', false,  {
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

// Create 'audio' element as a child of 'canvas'
var audioElement2 = createAudioElement(xmlDoc, canvasElement, { audio: 'true', src: 'https://cos.mirav.cn/player/oceans.mp3', duration: '17', fadeOut: '1' });

// Append 'videoElement3' and 'audioElement2' to their respective parent elements
//spineElement.appendChild(videoElement3);
//canvasElement.appendChild(audioElement2);

// Serialize XML document to string
var xmlString = new XMLSerializer().serializeToString(xmlDoc);

// Log the XML string
console.log(xmlString);
