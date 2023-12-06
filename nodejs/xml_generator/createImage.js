const {createAndAppendElement} = require('./xmlUtils');


function createImageElement(xmlDoc, spineElement, config =  {  }) {
  if(!xmlDoc || !spineElement || !config.src){
    //throw error
    new Error('xmlxmlDoc or parent is not defined')
    return 
  }
  
  return createAndAppendElement(xmlDoc, spineElement, 'image', config);
}


module.exports = {
  createImageElement
}