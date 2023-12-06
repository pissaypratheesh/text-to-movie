const {createAndAppendElement} = require('./xmlUtils');


function createAudioElement(xmlDoc, spineElement, config =  { audio: 'true', src: 'https://cos.mirav.cn/player/oceans.mp3', duration: '17', fadeOut: '1' }) {
  if(!xmlDoc || !spineElement){
    //throw error
    new Error('xmlxmlDoc or parent is not defined')
    return 
  }
  
  return createAndAppendElement(xmlDoc, spineElement, 'audio', config);
}


module.exports = {
  createAudioElement
}