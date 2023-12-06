
// Create a new DOMParser
const { DOMParser, XMLSerializer } = require('xmldom');
// Create a new DOMParser from xmldom
const parser = new DOMParser();

function setAttributes(element, attributes) {
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
}

function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child));
}

function generateRandomRefId() {
    // Generate a random string of alphanumeric characters
    return Math.random().toString(36).substr(2, 10);
}


// Create a new XML documentxmlString
const xmlDoc = parser.parseFromString('<miraml></miraml>', 'text/xml');

// Create miraml element and set attributes using shorthand notation
const miramlElement = xmlDoc.createElement('miraml');
setAttributes(miramlElement, { version: '1.1', author: 'ZhaoJun', name: 'Composite' });

// Create canvas element and set attributes using shorthand notation
const canvasElement = xmlDoc.createElement('canvas');
setAttributes(canvasElement, { width: '1280', height: '720', refId: generateRandomRefId() });

// Create spine element and set attributes using shorthand notation
const spineElement = xmlDoc.createElement('spine');
setAttributes(spineElement, { refId: generateRandomRefId() });

// Create text element and set attributes using shorthand notation
const textElement = xmlDoc.createElement('text');
setAttributes(textElement, {
    fontSize: '80rpx',
    color: '#FFF',
    x: '50vw',
    y: '50vh',
    lineHeight: '90%',
    letterSpacing: '10%',
    fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
    duration: '2',
    refId: generateRandomRefId(),
});

// Create audio element and set attributes using shorthand notation
const audioElement = xmlDoc.createElement('audio');
setAttributes(audioElement, { audio: 'true', src: 'https://cos.mirav.cn/player/ReadyGo.mp3', refId: generateRandomRefId() });

// Create content element and set text content
const contentElement = xmlDoc.createElement('content');
contentElement.textContent = 'Ready?';

// Create stroke element and set attributes using shorthand notation
const strokeElement = xmlDoc.createElement('stroke');
setAttributes(strokeElement, { color: '#FFF', size: '5%' });

// Create shadow element and set attributes using shorthand notation
const shadowElement = xmlDoc.createElement('shadow');
setAttributes(shadowElement, { color: '#1FB0F9', alpha: '1', offset: '5%' });

// Append child elements using shorthand notation
appendChildren(textElement, [audioElement, contentElement, strokeElement, shadowElement]);
spineElement.appendChild(textElement);

// Create trans element and set attributes using shorthand notation
const transElement1 = xmlDoc.createElement('trans');
setAttributes(transElement1, { duration: '1.5', key: 'fadecolor', refId: generateRandomRefId() });

// Create scene element
const sceneElement = xmlDoc.createElement('scene');
setAttributes(sceneElement, { refId: generateRandomRefId() });




// ... (continue setting attributes for other elements)

// Create video elements
const videoElement1 = xmlDoc.createElement('video');
setAttributes(videoElement1, {
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
    refId: generateRandomRefId(),
});

const videoElement2 = xmlDoc.createElement('video');
setAttributes(videoElement2, {
    loop: 'false',
    audio: 'false',
    x: '50vw',
    y: '50vh',
    width: '100vw',
    height: '100vh',
    src: 'https://cos.mirav.cn/player/pic_oceans.mp4',
    start: '5',
    duration: '5',
    ss: '20',
    refId: generateRandomRefId(),
});

const videoElement3 = xmlDoc.createElement('video');
setAttributes(videoElement3, {
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
    refId: generateRandomRefId(),
});

// Create text elements for videos
const textElementVideo1 = xmlDoc.createElement('text');
setAttributes(textElementVideo1, {
    fontSize: '100rpx',
    color: '#FFF',
    x: '50vw',
    y: '50vh',
    lineHeight: '90%',
    fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
    asMask: 'true',
    duration: '4',
    refId: generateRandomRefId(),
});
const contentElementVideo1 = xmlDoc.createElement('content');
contentElementVideo1.textContent = 'OCEAN';
const strokeElementVideo1 = xmlDoc.createElement('stroke');
setAttributes(strokeElementVideo1, { color: '#FFF', size: '5%' });

// Append child elements to build the structure for text in video 1
textElementVideo1.appendChild(contentElementVideo1);
textElementVideo1.appendChild(strokeElementVideo1);
textElementVideo1.innerHTML += '<animate time="2" delay="2"><from scale="1"></from><to scale="30" y="1500"></to></animate>';

// Append text element to video 1
videoElement1.appendChild(textElementVideo1);

// Append videos to scene
appendChildren(sceneElement, [videoElement1, videoElement2]);

// Create trans element for scene
const transElement2 = xmlDoc.createElement('trans');
setAttributes(transElement2, { duration: '1', key: 'fade', refId: generateRandomRefId() });

// Create video element outside the scene
const videoElement4 = xmlDoc.createElement('video');
setAttributes(videoElement4, {
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
    refId: generateRandomRefId(),
});

// Create text elements for the video outside the scene
const textElementVideo4_1 = xmlDoc.createElement('text');
setAttributes(textElementVideo4_1, {
    fontSize: '60rpx',
    color: '#FFF',
    x: '50vw',
    y: '45vh',
    lineHeight: '90%',
    fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
    effect: 'zoomInDown',
    effectTime: '1',
    opacity: '0.8',
    refId: generateRandomRefId(),
});
const contentElementVideo4_1 = xmlDoc.createElement('content');
contentElementVideo4_1.textContent = 'Mira Editor';
const strokeElementVideo4_1 = xmlDoc.createElement('stroke');
setAttributes(strokeElementVideo4_1, { color: '#FFF', size: '5%' });

const textElementVideo4_2 = xmlDoc.createElement('text');
setAttributes(textElementVideo4_2, {
    fontSize: '20rpx',
    color: '#FFF',
    x: '50vw',
    y: '70vh',
    lineHeight: '90%',
    fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
    effect: 'zoomInUp',
    effectTime: '1',
    opacity: '0.6',
    refId: generateRandomRefId(),
});
const contentElementVideo4_2 = xmlDoc.createElement('content');
contentElementVideo4_2.textContent = 'Powered By FFCreator';
const strokeElementVideo4_2 = xmlDoc.createElement('stroke');
setAttributes(strokeElementVideo4_2, { color: '#FFF', size: '5%' });

// Append child elements to build the structure for text in video outside the scene
appendChildren(textElementVideo4_1, [contentElementVideo4_1, strokeElementVideo4_1]);
appendChildren(textElementVideo4_2, [contentElementVideo4_2, strokeElementVideo4_2]);

// Append text elements to video outside the scene
appendChildren(videoElement4, [textElementVideo4_1, textElementVideo4_2]);

// Append elements to miraml
appendChildren(miramlElement, [canvasElement, videoElement4]);




// Append miraml element to the document
xmlDoc.documentElement.appendChild(miramlElement);

// Serialize the XML document to a string
const xmlString = new XMLSerializer().serializeToString(xmlDoc);

console.log(xmlString);
