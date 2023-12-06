
// Create a new DOMParser
const { DOMParser, XMLSerializer } = require('xmldom');
// Create a new DOMParser from xmldom

// Create XML document
var xmlDoc = new DOMParser().parseFromString('<miraml></miraml>', 'text/xml');

// Add attributes to miraml element
var miramlElement = xmlDoc.documentElement;
miramlElement.setAttribute('author', 'ZhaoJun');
miramlElement.setAttribute('name', 'Composite');

// Create canvas element
var canvasElement = xmlDoc.createElement('canvas');
canvasElement.setAttribute('width', '1280');
canvasElement.setAttribute('height', '720');
canvasElement.setAttribute('mute', 'true');

// Create spine element
var spineElement = xmlDoc.createElement('spine');

// TEXT ELEMENT START -------------
// Create text element
var textElement = xmlDoc.createElement('text');
textElement.setAttribute('fontSize', '80rpx');
textElement.setAttribute('color', '#FFF');
textElement.setAttribute('x', '50vw');
textElement.setAttribute('y', '50vh');
textElement.setAttribute('lineHeight', '90%');
textElement.setAttribute('letterSpacing', '10%');
textElement.setAttribute('fontFamily', 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf');
textElement.setAttribute('duration', '2');

// Add audio element to text
var audioElement = xmlDoc.createElement('audio');
audioElement.setAttribute('src', 'https://cos.mirav.cn/player/ReadyGo.mp3');
textElement.appendChild(audioElement);

// Add content element to text
var contentElement = xmlDoc.createElement('content');
contentElement.textContent = 'Ready?';
textElement.appendChild(contentElement);

// Add stroke element to text
var strokeElement = xmlDoc.createElement('stroke');
strokeElement.setAttribute('color', '#FFF');
strokeElement.setAttribute('size', '5%');
textElement.appendChild(strokeElement);

// Add shadow element to text
var shadowElement = xmlDoc.createElement('shadow');
shadowElement.setAttribute('color', '#1FB0F9');
shadowElement.setAttribute('alpha', '1');
shadowElement.setAttribute('offset', '5%');
textElement.appendChild(shadowElement);

// TEXT ELEMENT END -------------

// Append text element to spine
spineElement.appendChild(textElement);

// Create trans element
var transElement = xmlDoc.createElement('trans');
transElement.setAttribute('duration', '1.5');
transElement.setAttribute('key', 'fadecolor');
spineElement.appendChild(transElement);

// Create scene element
var sceneElement = xmlDoc.createElement('scene');

// Add first video element to scene
var videoElement1 = xmlDoc.createElement('video');
videoElement1.setAttribute('loop', 'false');
videoElement1.setAttribute('audio', 'false');
videoElement1.setAttribute('x', '50vw');
videoElement1.setAttribute('y', '50vh');
videoElement1.setAttribute('height', '100vh');
videoElement1.setAttribute('zIndex', '2');
videoElement1.setAttribute('src', 'https://cos.mirav.cn/player/pic_oceans.mp4');
videoElement1.setAttribute('preload', 'true');
videoElement1.setAttribute('duration', '10');
videoElement1.setAttribute('ss', '2');

// Add text element to videoElement1
var textElement1 = xmlDoc.createElement('text');
textElement1.setAttribute('fontSize', '100rpx');
textElement1.setAttribute('color', '#FFF');
textElement1.setAttribute('x', '50vw');
textElement1.setAttribute('y', '50vh');
textElement1.setAttribute('lineHeight', '90%');
textElement1.setAttribute('fontFamily', 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf');
textElement1.setAttribute('asMask', 'true');
textElement1.setAttribute('duration', '4');

// Add content element to textElement1
var contentElement1 = xmlDoc.createElement('content');
contentElement1.textContent = 'OCEAN';
textElement1.appendChild(contentElement1);

// Add stroke element to textElement1
var strokeElement1 = xmlDoc.createElement('stroke');
strokeElement1.setAttribute('color', '#FFF');
strokeElement1.setAttribute('size', '5%');
textElement1.appendChild(strokeElement1);

// Add animate element to textElement1
var animateElement1 = xmlDoc.createElement('animate');
animateElement1.setAttribute('time', '2');
animateElement1.setAttribute('delay', '2');

// Add from element to animateElement1
var fromElement1 = xmlDoc.createElement('from');
fromElement1.setAttribute('scale', '1');
animateElement1.appendChild(fromElement1);

// Add to element to animateElement1
var toElement1 = xmlDoc.createElement('to');
toElement1.setAttribute('scale', '30');
toElement1.setAttribute('y', '1500');
animateElement1.appendChild(toElement1);

// Append animateElement1 to textElement1
textElement1.appendChild(animateElement1);

// Append textElement1 to videoElement1
videoElement1.appendChild(textElement1);

// Add animate element to videoElement1
var animateElement2 = xmlDoc.createElement('animate');
animateElement2.setAttribute('time', '0.5');
animateElement2.setAttribute('delay', '5');

// Add from element to animateElement2
var fromElement2 = xmlDoc.createElement('from');
fromElement2.setAttribute('scale', '1');
animateElement2.appendChild(fromElement2);

// Add to element to animateElement2
var toElement2 = xmlDoc.createElement('to');
toElement2.setAttribute('scale', '0.2');
toElement2.setAttribute('y', '150');
toElement2.setAttribute('x', '250');
animateElement2.appendChild(toElement2);

// Append animateElement2 to videoElement1
videoElement1.appendChild(animateElement2);

// Add animate element to videoElement1
var animateElement3 = xmlDoc.createElement('animate');
animateElement3.setAttribute('time', '0.5');
animateElement3.setAttribute('delay', '9');

// Add from element to animateElement3
var fromElement3 = xmlDoc.createElement('from');
fromElement3.setAttribute('x', '50');
animateElement3.appendChild(fromElement3);

// Add to element to animateElement3
var toElement3 = xmlDoc.createElement('to');
toElement3.setAttribute('x', '-300');
animateElement3.appendChild(toElement3);

// Append animateElement3 to videoElement1
videoElement1.appendChild(animateElement3);

// Append videoElement1 to scene
sceneElement.appendChild(videoElement1);

// Add second video element to scene
var videoElement2 = xmlDoc.createElement('video');
videoElement2.setAttribute('loop', 'false');
videoElement2.setAttribute('audio', 'false');
videoElement2.setAttribute('x', '50vw');
videoElement2.setAttribute('y', '50vh');
videoElement2.setAttribute('width', '100vw');
videoElement2.setAttribute('height', '100vh');
videoElement2.setAttribute('src', 'https://cos.mirav.cn/player/pic_oceans.mp4');
videoElement2.setAttribute('start', '5');
videoElement2.setAttribute('duration', '5');
videoElement2.setAttribute('ss', '20');

// Append videoElement2 to scene
sceneElement.appendChild(videoElement2);

// Append scene to spine
spineElement.appendChild(sceneElement);

// Create trans element
var transElement2 = xmlDoc.createElement('trans');
transElement2.setAttribute('duration', '1');
transElement2.setAttribute('key', 'fade');
spineElement.appendChild(transElement2);

// Create third video element
var videoElement3 = xmlDoc.createElement('video');
videoElement3.setAttribute('loop', 'false');
videoElement3.setAttribute('audio', 'false');
videoElement3.setAttribute('x', '50vw');
videoElement3.setAttribute('y', '50vh');
videoElement3.setAttribute('width', '100vw');
videoElement3.setAttribute('height', '100vh');
videoElement3.setAttribute('src', 'https://cos.mirav.cn/player/pic_oceans.mp4');
videoElement3.setAttribute('duration', '5');
videoElement3.setAttribute('ss', '30');
videoElement3.setAttribute('blur', '10');

// Add text element to videoElement3
var textElement2 = xmlDoc.createElement('text');
textElement2.setAttribute('fontSize', '60rpx');
textElement2.setAttribute('color', '#FFF');
textElement2.setAttribute('x', '50vw');
textElement2.setAttribute('y', '45vh');
textElement2.setAttribute('lineHeight', '90%');
textElement2.setAttribute('fontFamily', 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf');
textElement2.setAttribute('effect', 'zoomInDown');
textElement2.setAttribute('effectTime', '1');
textElement2.setAttribute('opacity', '0.8');

// Add content element to textElement2
var contentElement2 = xmlDoc.createElement('content');
contentElement2.textContent = 'Mira Player';
textElement2.appendChild(contentElement2);

// Add stroke element to textElement2
var strokeElement2 = xmlDoc.createElement('stroke');
strokeElement2.setAttribute('color', '#FFF');
strokeElement2.setAttribute('size', '5%');
textElement2.appendChild(strokeElement2);

// Append textElement2 to videoElement3
videoElement3.appendChild(textElement2);

// Add second text element to videoElement3
var textElement3 = xmlDoc.createElement('text');
textElement3.setAttribute('fontSize', '20rpx');
textElement3.setAttribute('color', '#FFF');
textElement3.setAttribute('x', '50vw');
textElement3.setAttribute('y', '70vh');
textElement3.setAttribute('lineHeight', '90%');
textElement3.setAttribute('fontFamily', 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf');
textElement3.setAttribute('effect', 'zoomInUp');
textElement3.setAttribute('effectTime', '1');
textElement3.setAttribute('opacity', '0.6');

// Add content element to textElement3
var contentElement3 = xmlDoc.createElement('content');
contentElement3.textContent = 'Powered By FFCreator';
textElement3.appendChild(contentElement3);

// Add stroke element to textElement3
var strokeElement3 = xmlDoc.createElement('stroke');
strokeElement3.setAttribute('color', '#FFF');
strokeElement3.setAttribute('size', '5%');
textElement3.appendChild(strokeElement3);

// Append textElement3 to videoElement3
videoElement3.appendChild(textElement3);

// Append videoElement3 to spine
spineElement.appendChild(videoElement3);

// Append spine to canvas
canvasElement.appendChild(spineElement);

// Create audio element
var audioElement2 = xmlDoc.createElement('audio');
audioElement2.setAttribute('audio', 'true');
audioElement2.setAttribute('src', 'https://cos.mirav.cn/player/oceans.mp3');
audioElement2.setAttribute('duration', '17');
audioElement2.setAttribute('fadeOut', '1');

// Append audioElement2 to canvas
canvasElement.appendChild(audioElement2);

// Append canvas to miraml
miramlElement.appendChild(canvasElement);

// Convert XML document to string
var xmlString = new XMLSerializer().serializeToString(xmlDoc);

// Print the XML string
console.log(xmlString);
