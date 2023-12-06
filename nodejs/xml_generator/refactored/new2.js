const { DOMParser, XMLSerializer } = require('xmldom');

function createElementWithAttributes(doc, tagName, attributes) {
  const element = doc.createElement(tagName);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}


function createElementWithText(doc, tagName, textContent) {
    const element = doc.createElement(tagName);
    element.textContent = textContent;
    return element;
  }
  
// Create a new DOMParser
const xmlDoc = new DOMParser().parseFromString('<miraml></miraml>', 'text/xml');

// Add attributes to miraml element
const miramlElement = xmlDoc.documentElement;
miramlElement.setAttribute('version', '1.1');
miramlElement.setAttribute('author', 'ZhaoJun');
miramlElement.setAttribute('name', 'Composite');

// Create canvas element
const canvasElement = createElementWithAttributes(xmlDoc, 'canvas', { width: '1280', height: '720', refId: '4d49re4r5qsomjuc' });

// Create spine element
const spineElement = createElementWithAttributes(xmlDoc, 'spine', { refId: 'rxbl63vb53elj7jo' });

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
  refId: 'fx7wj5nf8a69e8f6',
};

const textElement = createElementWithAttributes(xmlDoc, 'text', textElementAttributes);

// Add audio element to text
const audioElementAttributes = { audio: 'true', src: 'https://cos.mirav.cn/player/ReadyGo.mp3', refId: 'm668tauh0gkaqwei' };
const audioElement = createElementWithAttributes(xmlDoc, 'audio', audioElementAttributes);
textElement.appendChild(audioElement);

// Add stroke element to text
const strokeElementAttributes = { color: '#FFF', size: '5%' };
const strokeElement = createElementWithAttributes(xmlDoc, 'stroke', strokeElementAttributes);
textElement.appendChild(strokeElement);

// Add shadow element to text
const shadowElementAttributes = { color: '#1FB0F9', alpha: '1', offset: '5%' };
const shadowElement = createElementWithAttributes(xmlDoc, 'shadow', shadowElementAttributes);
textElement.appendChild(shadowElement);

// Append text element to spine
spineElement.appendChild(textElement);

// Create trans element
const transElement = createElementWithAttributes(xmlDoc, 'trans', { duration: '1.5', key: 'fadecolor', refId: 'vbftdfat84dfti48' });
spineElement.appendChild(transElement);

// Create scene element
const sceneElement = createElementWithAttributes(xmlDoc, 'scene', { refId: 'nkvrfugasytxv0qj' });

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
  refId: '7krl2zheqiallbbc',
};

const videoElement1 = createElementWithAttributes(xmlDoc, 'video', videoElement1Attributes);

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
  refId: '8bisvi6a15m8qxr2',
};

const textElement1 = createElementWithAttributes(xmlDoc, 'text', textElement1Attributes);

// Add animate element to textElement1
const animateElement1Attributes = { time: '2', delay: '2' };
const fromElement1Attributes = { scale: '1' };
const toElement1Attributes = { scale: '30', y: '1500' };
const animateElement1 = createElementWithAttributes(xmlDoc, 'animate', animateElement1Attributes);

// Add from element to animateElement1
const fromElement1 = createElementWithAttributes(xmlDoc, 'from', fromElement1Attributes);
animateElement1.appendChild(fromElement1);

// Add to element to animateElement1
const toElement1 = createElementWithAttributes(xmlDoc, 'to', toElement1Attributes);
animateElement1.appendChild(toElement1);

// Append animateElement1 to textElement1
textElement1.appendChild(animateElement1);

// Append textElement1 to videoElement1
videoElement1.appendChild(textElement1);

// Add animate element to videoElement1
const animateElement2Attributes = { time: '0.5', delay: '5' };
const fromElement2Attributes = { scale: '1' };
const toElement2Attributes = { scale: '0.2', y: '150', x: '250' };
const animateElement2 = createElementWithAttributes(xmlDoc, 'animate', animateElement2Attributes);

// Add from element to animateElement2
const fromElement2 = createElementWithAttributes(xmlDoc, 'from', fromElement2Attributes);
animateElement2.appendChild(fromElement2);

// Add to element to animateElement2
const toElement2 = createElementWithAttributes(xmlDoc, 'to', toElement2Attributes);
animateElement2.appendChild(toElement2);

// Append animateElement2 to videoElement1
videoElement1.appendChild(animateElement2);

// Add animate element to videoElement1
const animateElement3Attributes = { time: '0.5', delay: '9' };
const fromElement3Attributes = { x: '50' };
const toElement3Attributes = { x: '-300' };
const animateElement3 = createElementWithAttributes(xmlDoc, 'animate', animateElement3Attributes);

// Add from element to animateElement3
const fromElement3 = createElementWithAttributes(xmlDoc, 'from', fromElement3Attributes);
animateElement3.appendChild(fromElement3);

// Add to element to animateElement3
const toElement3 = createElementWithAttributes(xmlDoc, 'to', toElement3Attributes);
animateElement3.appendChild(toElement3);

// Append animateElement3 to videoElement1
videoElement1.appendChild(animateElement3);

// Append videoElement1 to scene
sceneElement.appendChild(videoElement1);

// Create trans element
const transElement2Attributes = { duration: '1', key: 'fade', refId: 'fip2cekgvalold8l' };
const transElement2 = createElementWithAttributes(xmlDoc, 'trans', transElement2Attributes);
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
  refId: 'akvbklgheabqeke6',
};

const videoElement3 = createElementWithAttributes(xmlDoc, 'video', videoElement3Attributes);

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
  refId: '25fku8wk8mdhc8qi',
};

const textElement2 = createElementWithAttributes(xmlDoc, 'text', textElement2Attributes);

// Add content element to textElement2
const contentElement2 = createElementWithText(xmlDoc, 'content', 'Mira Player');
textElement2.appendChild(contentElement2);

// Add stroke element to textElement2
const strokeElement2Attributes = { color: '#FFF', size: '5%' };
const strokeElement2 = createElementWithAttributes(xmlDoc, 'stroke', strokeElement2Attributes);
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
  refId: 'qxyppna3sxpjwk5i',
};

const textElement3 = createElementWithAttributes(xmlDoc, 'text', textElement3Attributes);

// Add content element to textElement3
const contentElement3 = createElementWithText(xmlDoc, 'content', 'Powered By FFCreator');
textElement3.appendChild(contentElement3);

// Add stroke element to textElement3
const strokeElement3Attributes = { color: '#FFF', size: '5%' };
const strokeElement3 = createElementWithAttributes(xmlDoc, 'stroke', strokeElement3Attributes);
textElement3.appendChild(strokeElement3);

// Append textElement3 to videoElement3
videoElement3.appendChild(textElement3);

// Append videoElement3 to spine
spineElement.appendChild(videoElement3);

// Append spine to canvas
canvasElement.appendChild(spineElement);

// Create audio element
const audioElement2Attributes = { audio: 'true', src: 'https://cos.mirav.cn/player/oceans.mp3', duration: '17', fadeOut: '1', refId: 'qzljn0wfqkmbhfif' };
const audioElement2 = createElementWithAttributes(xmlDoc, 'audio', audioElement2Attributes);

// Append audioElement2 to canvas
canvasElement.appendChild(audioElement2);

// Append canvas to miraml
miramlElement.appendChild(canvasElement);

// Convert XML document to string
const xmlString = new XMLSerializer().serializeToString(xmlDoc);

// Print the XML string
console.log(xmlString);
