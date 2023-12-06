const { DOMParser, XMLSerializer } = require('xmldom');
const { createAndAppendElement } = require('./xmlUtils');
const { createBigTextElement, createTextMaskElement } = require('./createText');
const { createTransitionElement } = require('./createTransition');
const { createSceneElement } = require('./createScene');
const { createVideoElement } = require('./createVideo');
const { createImageElement } = require('./createImage');
const { createAudioElement } = require('./createAudio');
const { animateGivenElement } = require('./animateElement');

//Scenes will follow array like naming [0,1,2,3]
function createMiraMLXML({ author, dimensions, name, mute, scenes, sequences, toCanvas = [] }) {
  // Create XML document
  var xmlDoc = new DOMParser().parseFromString('<miraml></miraml>', 'text/xml');

  // Create the root element 'miraml'
  var miramlElement = xmlDoc.documentElement;
  miramlElement.setAttribute('author', author || 'Pratheesh PM');
  miramlElement.setAttribute('name', name || 'Composite');

  // Create 'canvas' element as a child of 'miraml'
  var canvasElement = createAndAppendElement(xmlDoc, miramlElement, 'canvas', {
    width: dimensions.w || '1280',
    height: dimensions.h ||'720',
    mute: mute || 'false',
  });

  // Create 'spine' element as a child of 'canvas'
  var spineElement = createAndAppendElement(xmlDoc, canvasElement, 'spine');

  // Create 'scene' elements as a child of 'spine'
  var scenesElement = [];

  function createScene(scene){
     scenesElement[scene] = createSceneElement(xmlDoc, spineElement, scene)
  }

  // Iterate through sequences and create corresponding elements
  sequences.forEach((sequence) => {
    //Create scene if not there
    if(sequence.scene && !(scenesElement && scenesElement[sequence.scene])){
      createScene(sequence.scene);
    }
    switch (sequence.type) {
      case 'bigText':
      case 'text':  
        sequence.options = sequence.options || {};
        sequence.options.fontFamily = sequence.options.fontFamily || "https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf";
        sequence.options.x = sequence.options.x || '50vw';
        sequence.options.fontSize = sequence.options.fontSize || "15rpx"
        sequence.options.color = sequence.options.color || '#FFF';
        sequence.options.duration  = sequence.options.duration  || '2';
        sequence.text = sequence.text || sequence.options.text || 'Text Here';

        if(sequence.top && !(sequence.options && sequence.options.y)) {
            sequence.options.y = '25vh';
            sequence.options.x = '50vw';
        }
        if(sequence.center && !(sequence.options && sequence.options.y)) {
            sequence.options.y = '50vh';
            sequence.options.x = '50vw';
        }
        if(sequence.bottom && !(sequence.options && sequence.options.y)) {
            sequence.options.y = '75vh';
            sequence.options.x = '50vw';
        }
        //Nothing mentioned, so picking up top as default
        if(!(sequence.options && sequence.options.y) && !(sequence.top || sequence.center || sequence.bottom)) {
            sequence.options.y = '25vh';
            sequence.options.x = '50vw';
        }

        // Create 'text' element as a child of 'spine' (doc, target, text, textconfig, audioconfig)
        createBigTextElement(xmlDoc,  sequence.scene ? scenesElement[sequence.scene] : spineElement, sequence.text, sequence.options, sequence.audio);
        break;
      
      case 'transition':
        // Create 'trans' element as a child of 'spine'
        createTransitionElement(xmlDoc, sequence.scene ? scenesElement[sequence.scene] : spineElement, sequence.options);   
        break;

      case 'image': 
         // Create 'image' element as a child of 'spine'/scene  
        var imageElement = createImageElement(xmlDoc, sequence.scene ? scenesElement[sequence.scene] : spineElement, sequence.options);  

        if(sequence.textElements){
          sequence.textElements.forEach((textObj) => {
              textObj.options = textObj.options || {};
              textObj.options.fontFamily = textObj.options.fontFamily || "https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf";
              textObj.options.x = textObj.options.x || '50vw';
              textObj.options.fontSize = textObj.options.fontSize || "15rpx"
              textObj.options.color = textObj.options.color || '#FFF';
              textObj.options.duration  = textObj.options.duration  || '2';
              textObj.text = textObj.text || textObj.options.text || 'Text Here';

              if(textObj.top && !(textObj.options && textObj.options.y)) {
                  textObj.options.y = '25vh';
                  textObj.options.x = '50vw';
              }
              if(textObj.center && !(textObj.options && textObj.options.y)) {
                  textObj.options.y = '50vh';
                  textObj.options.x = '50vw';
              }
              if(textObj.bottom && !(textObj.options && textObj.options.y)) {
                  textObj.options.y = '75vh';
                  textObj.options.x = '50vw';
              }
              //Nothing mentioned, so picking up top as default
              if(!(textObj.options && textObj.options.y) && !(textObj.top || textObj.center || textObj.bottom)) {
                  textObj.options.y = '25vh';
                  textObj.options.x = '50vw';
              }

              if(textObj.asMask){
                // Create 'text' element as a child of 'video' and mask and animate it for target videoelement1
                createTextMaskElement(xmlDoc, imageElement, textObj.text ,textObj.animate || false, textObj.options);

              }else{
                createBigTextElement(xmlDoc, imageElement, textObj.text, textObj.options, textObj.audio);  
              } 
          })
        }
        break; 
  
      case 'video':  
        var videoElement1 = createVideoElement(xmlDoc,  sequence.scene ? scenesElement[sequence.scene] : spineElement, sequence.options);
        if(sequence.textElements){
            sequence.textElements.forEach((textObj) => {
                textObj.options = textObj.options || {};
                textObj.options.fontFamily = textObj.options.fontFamily || "https://cos.mirav.cn/fonts/FangZhengHeiTi.ttf";
                textObj.options.x = textObj.options.x || '50vw';
                textObj.options.fontSize = textObj.options.fontSize || "15rpx"
                textObj.options.color = textObj.options.color || '#FFF';
                textObj.options.duration  = textObj.options.duration  || '2';
                textObj.text = textObj.text || textObj.options.text || 'Text Here';

                if(textObj.top && !(textObj.options && textObj.options.y)) {
                    textObj.options.y = '25vh';
                    textObj.options.x = '50vw';
                }
                if(textObj.center && !(textObj.options && textObj.options.y)) {
                    textObj.options.y = '50vh';
                    textObj.options.x = '50vw';
                }
                if(textObj.bottom && !(textObj.options && textObj.options.y)) {
                    textObj.options.y = '75vh';
                    textObj.options.x = '50vw';
                }
                //Nothing mentioned, so picking up top as default
                if(!(textObj.options && textObj.options.y) && !(textObj.top || textObj.center || textObj.bottom)) {
                    textObj.options.y = '25vh';
                    textObj.options.x = '50vw';
                }
  
                if(textObj.asMask){
                  // Create 'text' element as a child of 'video' and mask and animate it for target videoelement1
                  createTextMaskElement(xmlDoc, videoElement1, textObj.text ,textObj.animate || false, textObj.options);
                }else{
                  createBigTextElement(xmlDoc, videoElement1, textObj.text, textObj.options, textObj.audio);  
                } 
            })
        }
        if(sequence.images){
            sequence.images.forEach((image) => {
                // Create 'text' element as a child of 'video' and mask and animate it for target videoelement1
                createImageElement(xmlDoc, videoElement1, image.options);
            })
        }
        if(sequence.animations){
            // Create 'animate' elements for 'video1' under 'video1'
            animateGivenElement(xmlDoc, videoElement1,sequence.animations);
        }
        break;

      case 'audio':
        // Create 'audio' element as a child of 'canvas'
        var audioElement2 = createAudioElement(xmlDoc, canvasElement, sequence.options);
        canvasElement.appendChild(audioElement2);
        break;  

    }
  
    // Add additional checks for other types of sequences if needed
  });

  if(toCanvas && toCanvas.length > 0){
    toCanvas.forEach((canvasObj) => {
      var videoElement1 = createVideoElement(xmlDoc,  canvasElement,  canvasObj.options);
    })
  }

  // Serialize XML document to string
  var xmlString = new XMLSerializer().serializeToString(xmlDoc);

  // Return the XML string
  return xmlString;
}

module.exports = {
  createMiraMLXML,
}

