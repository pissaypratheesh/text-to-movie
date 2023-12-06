function genericAudioOps (options) {
    return {
        src: options.s,
        duration: options.d || '10',
        ss: options.ss || '0',
        loop: options.l || 'true',
        audio: options.a || 'true',
        preload: 'true',
        fadeOut: options.fo || '1',
        fadeIn: options.fi || '0.5',
    }
}

module.exports = {
    genericAudioOps
}
