const { DOMParser, XMLSerializer } = require('xmldom');

function createElementWithAttributes(doc, tagName, attributes) {
  const element = doc.createElement(tagName);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}

function createTextElement(doc, textContent, attributes) {
  const textElement = createElementWithAttributes(doc, 'text', attributes);

  // Add content element to text
  const contentElement = doc.createElement('content');
  contentElement.textContent = textContent;
  textElement.appendChild(contentElement);

  return textElement;
}

function createAnimateElement(doc, attributes, fromAttributes, toAttributes) {
  const animateElement = createElementWithAttributes(doc, 'animate', attributes);

  // Add from element to animateElement
  const fromElement = createElementWithAttributes(doc, 'from', fromAttributes);
  animateElement.appendChild(fromElement);

  // Add to element to animateElement
  const toElement = createElementWithAttributes(doc, 'to', toAttributes);
  animateElement.appendChild(toElement);

  return animateElement;
}

function createVideoElement(doc, attributes) {
  return createElementWithAttributes(doc, 'video', attributes);
}

// Create a new DOMParser
const xmlDoc = new DOMParser().parseFromString('<miraml></miraml>', 'text/xml');

// Add attributes to miraml element
const miramlElement = xmlDoc.documentElement;
miramlElement.setAttribute('author', 'ZhaoJun');
miramlElement.setAttribute('name', 'Composite');

// Create canvas element
const canvasElement = createElementWithAttributes(xmlDoc, 'canvas', { width: '1280', height: '720', mute: 'true' });

// Create spine element
const spineElement = xmlDoc.createElement('spine');

// TEXT ELEMENT START -------------
const textElementAttributes = {
  fontSize: '80rpx',
  color: '#FFF',
  x: '50vw',
  y: '50vh',
  lineHeight: '90%',
  letterSpacing: '10%',
  fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
  duration: '2',
};

const textElement = createTextElement(xmlDoc, 'Ready?', textElementAttributes);

// Add audio element to text
const audioElement = createElementWithAttributes(xmlDoc, 'audio', { src: 'https://cos.mirav.cn/player/ReadyGo.mp3' });
textElement.appendChild(audioElement);

// Add stroke element to text
const strokeElement = createElementWithAttributes(xmlDoc, 'stroke', { color: '#FFF', size: '5%' });
textElement.appendChild(strokeElement);

// Add shadow element to text
const shadowElement = createElementWithAttributes(xmlDoc, 'shadow', { color: '#1FB0F9', alpha: '1', offset: '5%' });
textElement.appendChild(shadowElement);

// TEXT ELEMENT END -------------

// Append text element to spine
spineElement.appendChild(textElement);

// Create trans element
const transElement = createElementWithAttributes(xmlDoc, 'trans', { duration: '1.5', key: 'fadecolor' });
spineElement.appendChild(transElement);

// Create scene element
const sceneElement = xmlDoc.createElement('scene');

// Add first video element to scene
const videoElement1Attributes = {
  loop: 'false',
  audio: 'false',
  x: '50vw',
  y: '50vh',
  height: '100vh',
  zIndex: '2',
  src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
  preload: 'true',
  duration: '10',
  ss: '2',
};

const videoElement1 = createVideoElement(xmlDoc, videoElement1Attributes);

// Add text element to videoElement1
const textElement1Attributes = {
  fontSize: '100rpx',
  color: '#FFF',
  x: '50vw',
  y: '50vh',
  lineHeight: '90%',
  fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
  asMask: 'true',
  duration: '4',
};

const textElement1 = createTextElement(xmlDoc, 'OCEAN', textElement1Attributes);

// Add animate element to textElement1
const animateElement1Attributes = { time: '2', delay: '2' };
const fromElement1Attributes = { scale: '1' };
const toElement1Attributes = { scale: '30', y: '1500' };
const animateElement1 = createAnimateElement(xmlDoc, animateElement1Attributes, fromElement1Attributes, toElement1Attributes);

// Append animateElement1 to textElement1
textElement1.appendChild(animateElement1);

// Append textElement1 to videoElement1
videoElement1.appendChild(textElement1);

// Add animate element to videoElement1
const animateElement2Attributes = { time: '0.5', delay: '5' };
const fromElement2Attributes = { scale: '1' };
const toElement2Attributes = { scale: '0.2', y: '150', x: '250' };
const animateElement2 = createAnimateElement(xmlDoc, animateElement2Attributes, fromElement2Attributes, toElement2Attributes);

// Append animateElement2 to videoElement1
videoElement1.appendChild(animateElement2);

// Add animate element to videoElement1
const animateElement3Attributes = { time: '0.5', delay: '9' };
const fromElement3Attributes = { x: '50' };
const toElement3Attributes = { x: '-300' };
const animateElement3 = createAnimateElement(xmlDoc, animateElement3Attributes, fromElement3Attributes, toElement3Attributes);

// Append animateElement3 to videoElement1
videoElement1.appendChild(animateElement3);

// Append videoElement1 to scene
sceneElement.appendChild(videoElement1);

// Create trans element
const transElement2 = createElementWithAttributes(xmlDoc, 'trans', { duration: '1', key: 'fade' });
spineElement.appendChild(transElement2);

// Create third video element
const videoElement3Attributes = {
  loop: 'false',
  audio: 'false',
  x: '50vw',
  y: '50vh',
  width: '100vw',
  height: '100vh',
  src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
  duration: '5',
  ss: '30',
  blur: '10',
};

const videoElement3 = createVideoElement(xmlDoc, videoElement3Attributes);

// Add text element to videoElement3
const textElement2Attributes = {
  fontSize: '60rpx',
  color: '#FFF',
  x: '50vw',
  y: '45vh',
  lineHeight: '90%',
  fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
  effect: 'zoomInDown',
  effectTime: '1',
  opacity: '0.8',
};

const textElement2 = createTextElement(xmlDoc, 'Mira Player', textElement2Attributes);

// Add stroke element to textElement2
const strokeElement2 = createElementWithAttributes(xmlDoc, 'stroke', { color: '#FFF', size: '5%' });
textElement2.appendChild(strokeElement2);

// Append textElement2 to videoElement3
videoElement3.appendChild(textElement2);

// Add second text element to videoElement3
const textElement3Attributes = {
  fontSize: '20rpx',
  color: '#FFF',
  x: '50vw',
  y: '70vh',
  lineHeight: '90%',
  fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
  effect: 'zoomInUp',
  effectTime: '1',
  opacity: '0.6',
};

const textElement3 = createTextElement(xmlDoc, 'Powered By FFCreator', textElement3Attributes);

// Add stroke element to textElement3
const strokeElement3 = createElementWithAttributes(xmlDoc, 'stroke', { color: '#FFF', size: '5%' });
textElement3.appendChild(strokeElement3);

// Append textElement3 to videoElement3
videoElement3.appendChild(textElement3);

// Append videoElement3 to spine
spineElement.appendChild(videoElement3);

// Append spine to canvas
canvasElement.appendChild(spineElement);

// Create audio element
const audioElement2Attributes = { audio: 'true', src: 'https://cos.mirav.cn/player/oceans.mp3', duration: '17', fadeOut: '1' };
const audioElement2 = createElementWithAttributes(xmlDoc, 'audio', audioElement2Attributes);

// Append audioElement2 to canvas
canvasElement.appendChild(audioElement2);

// Append canvas to miraml
miramlElement.appendChild(canvasElement);

// Convert XML document to string
const xmlString = new XMLSerializer().serializeToString(xmlDoc);

// Print the XML string
console.log(xmlString);
