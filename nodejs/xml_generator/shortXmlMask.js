const { DOMParser, XMLSerializer } = require('xmldom');

// Create XML document
var xmlDoc = new DOMParser().parseFromString('<miraml></miraml>', 'text/xml');

var miramlElement = xmlDoc.documentElement;
miramlElement.setAttribute('author', 'ZhaoJun');
miramlElement.setAttribute('name', 'Composite');

var canvasElement = createAndAppendElement(xmlDoc, miramlElement, 'canvas', { width: '1280', height: '720', mute: 'true' });
var spineElement = createAndAppendElement(xmlDoc, canvasElement, 'spine');

var textElement = createAndAppendElement(xmlDoc, spineElement, 'text', {
  fontSize: '80rpx',
  color: '#FFF',
  x: '50vw',
  y: '50vh',
  lineHeight: '90%',
  letterSpacing: '10%',
  fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
  duration: '2'
});

createAndAppendElement(xmlDoc, textElement, 'audio', { src: 'https://cos.mirav.cn/player/ReadyGo.mp3' });
createAndAppendElement(xmlDoc, textElement, 'content', {}, 'Ready?');
createAndAppendElement(xmlDoc, textElement, 'stroke', { color: '#FFF', size: '5%' });
createAndAppendElement(xmlDoc, textElement, 'shadow', { color: '#1FB0F9', alpha: '1', offset: '5%' });

createAndAppendElement(xmlDoc, spineElement, 'trans', { duration: '1.5', key: 'fadecolor' });


var sceneElement = createAndAppendElement(xmlDoc, spineElement, 'scene');

var videoElement1 = createAndAppendElement(xmlDoc, sceneElement, 'video', {
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

var textElementVideo1 = createAndAppendElement(xmlDoc, videoElement1, 'text', {
  fontSize: '100rpx',
  color: '#FFF',
  x: '50vw',
  y: '50vh',
  lineHeight: '90%',
  fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
  asMask: 'true',
  duration: '4'
});

createAndAppendElement(xmlDoc, textElementVideo1, 'content', {}, 'OCEAN');
createAndAppendElement(xmlDoc, textElementVideo1, 'stroke', { color: '#FFF', size: '5%' });

var animateElementText = createAndAppendElement(xmlDoc, textElementVideo1, 'animate', { time: '2', delay: '2' });
createAndAppendElement(xmlDoc, animateElementText, 'from', { scale: '1' });
createAndAppendElement(xmlDoc, animateElementText, 'to', { scale: '30', y: '1500' });

var animateElementVideo1 = createAndAppendElement(xmlDoc, videoElement1, 'animate', { time: '0.5', delay: '5' });
createAndAppendElement(xmlDoc, animateElementVideo1, 'from', { scale: '1' });
createAndAppendElement(xmlDoc, animateElementVideo1, 'to', { scale: '0.2', y: '150', x: '250' });

var animateElementVideo2 = createAndAppendElement(xmlDoc, videoElement1, 'animate', { time: '0.5', delay: '9' });
createAndAppendElement(xmlDoc, animateElementVideo2, 'from', { x: '50' });
createAndAppendElement(xmlDoc, animateElementVideo2, 'to', { x: '-300' });

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

var videoElement3 = createAndAppendElement(xmlDoc, spineElement, 'video', {
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

var textElementVideo3_1 = createAndAppendElement(xmlDoc, videoElement3, 'text', {
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

createAndAppendElement(xmlDoc, textElementVideo3_1, 'content', {}, 'Mira Player');
createAndAppendElement(xmlDoc, textElementVideo3_1, 'stroke', { color: '#FFF', size: '5%' });

var textElementVideo3_2 = createAndAppendElement(xmlDoc, videoElement3, 'text', {
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

createAndAppendElement(xmlDoc, textElementVideo3_2, 'content', {}, 'Powered By FFCreator');
createAndAppendElement(xmlDoc, textElementVideo3_2, 'stroke', { color: '#FFF', size: '5%' });

var animateElementVideo3 = createAndAppendElement(xmlDoc, videoElement3, 'animate', { time: '2' });
createAndAppendElement(xmlDoc, animateElementVideo3, 'from', { scale: '1' });
createAndAppendElement(xmlDoc, animateElementVideo3, 'to', { scale: '30', y: '1500' });

var audioElement2 = createAndAppendElement(xmlDoc, canvasElement, 'audio', { audio: 'true', src: 'https://cos.mirav.cn/player/oceans.mp3', duration: '17', fadeOut: '1' });

// Append videoElement3 and audioElement2 to their respective parent elements
spineElement.appendChild(videoElement3);
canvasElement.appendChild(audioElement2);

var xmlString = new XMLSerializer().serializeToString(xmlDoc);
console.log(xmlString);

function createAndAppendElement(doc, parent, name, attributes, value) {
    var element = doc.createElement(name);
    if (attributes) {
        for (var key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }
    if (value) {
        if (typeof value === 'string') {
            element.appendChild(doc.createTextNode(value));
        } else if (Array.isArray(value)) {
            value.forEach(function (child) {
                createAndAppendElement(doc, element, child.name, child.attributes, child.value);
            });
        }
    }
    parent.appendChild(element);
    return element;
}
