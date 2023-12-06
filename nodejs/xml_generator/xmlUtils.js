
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
function isUndefined(value) {
    return typeof value === 'undefined';
}


module.exports = {
    createAndAppendElement,
    isUndefined
}