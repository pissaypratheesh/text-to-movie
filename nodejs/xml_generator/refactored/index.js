const { XMLSerializer } = require('xmldom');
const { createMiraML } = require('./miraML');

// Create XML document
var xmlDoc = createMiraML();

var xmlString = new XMLSerializer().serializeToString(xmlDoc);
console.log(xmlString);
