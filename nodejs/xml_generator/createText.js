const {createAndAppendElement} = require('./xmlUtils');

// Create 'text' element as a child of 'spine'
function createBigTextElement(xmlDoc, spineElement, text = 'Text here', textconfig = {
  fontSize: '80rpx',
  color: '#FFF',
  x: '50vw',
  y: '50vh',
  lineHeight: '90%',
  letterSpacing: '10%',
  fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
  duration: '2'
}, audioconfig) {
  var bigTextElement = createAndAppendElement(xmlDoc, spineElement, 'text', textconfig);
    
    // Create 'audio', 'content', 'stroke', and 'shadow' elements as children of 'text'
    audioconfig && audioconfig.src && createAndAppendElement(xmlDoc, bigTextElement, 'audio', { src: audioconfig.src });
    createAndAppendElement(xmlDoc, bigTextElement, 'content', {}, text);
    createAndAppendElement(xmlDoc, bigTextElement, 'stroke', { color: '#FFF', size: '5%' });
    createAndAppendElement(xmlDoc, bigTextElement, 'shadow', { color: '#1FB0F9', alpha: '1', offset: '5%' });
    
}

function createTextMaskElement(xmlDoc, spineElement, text, animateAtEnd,textAttributes = {
  fontSize: '100rpx',
  color: '#FFF',
  x: '50vw',
  y: '50vh',
  lineHeight: '90%',
  fontFamily: 'https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf',
  asMask: 'true',
  duration: '4'
},audioconfig) {
  // Create 'text' element as a child of 'video'
  var textElementVideo1 = createAndAppendElement(xmlDoc, spineElement, 'text', textAttributes);
  audioconfig && audioconfig.src && createAndAppendElement(xmlDoc, textElementVideo1, 'audio', { src: audioconfig.src });
    
  // Create 'content' and 'stroke' elements as children of 'text' under 'video'
  createAndAppendElement(xmlDoc, textElementVideo1, 'content', {}, text || 'Text Here');
  createAndAppendElement(xmlDoc, textElementVideo1, 'stroke', { color: '#FFF', size: '5%' });

  if(animateAtEnd){
      // Create 'animate' element as a child of 'text' under 'video'
      var animateElementText = createAndAppendElement(xmlDoc, textElementVideo1, 'animate', { time: '2', delay: '2' });
      // Create 'from' and 'to' elements as children of 'animate' under 'text' under 'video'
      createAndAppendElement(xmlDoc, animateElementText, 'from', { scale: '1' });
      createAndAppendElement(xmlDoc, animateElementText, 'to', { scale: '30', y: '1500' });
  }

}

module.exports = {
  createBigTextElement,
  createTextMaskElement
}