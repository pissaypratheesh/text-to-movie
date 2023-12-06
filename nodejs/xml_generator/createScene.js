const {createAndAppendElement} = require('./xmlUtils');


function createSceneElement(xmlDoc, spineElement, id) {
  if(!xmlDoc || !spineElement){
    //throw error
    new Error('xmlxmlDoc or parent is not defined')
    return 
  }
  return createAndAppendElement(xmlDoc, spineElement, 'scene', { id: id });
}


module.exports = {
  createSceneElement
}