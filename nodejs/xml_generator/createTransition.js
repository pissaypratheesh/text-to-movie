const {createAndAppendElement} = require('./xmlUtils');


function createTransitionElement(xmlDoc, spineElement , attributes = {duration: '1', key: 'fadecolor'}) {
  attributes.duration = attributes.duration || '1';
  attributes.key = attributes.key || 'fadecolor';
  return createAndAppendElement(xmlDoc, spineElement, 'trans', attributes);
}


module.exports = {
  createTransitionElement
}