const {createAndAppendElement} = require('./xmlUtils');

// Create 'text' element as a child of 'spine'
function animateGivenElement(xmlDoc, spineElement, config = [{ time: '0.5', delay: '5', from: { scale: '1' }, to: { scale: '0.2', y: '150', x: '250' } }]) {
    config.map((conf) => {
        var animateElementVideo1 = createAndAppendElement(xmlDoc, spineElement, 'animate', { time: conf.time, delay: conf.delay || '0' });
        createAndAppendElement(xmlDoc, animateElementVideo1, 'from', conf.from);
        createAndAppendElement(xmlDoc, animateElementVideo1, 'to', conf.to);
    })
}

module.exports = {
    animateGivenElement
}
