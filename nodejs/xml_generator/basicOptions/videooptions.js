function genericVidOps (options, dimensions = {}) {
    if(!options.s) {
        console.log("🚀 ~ file: videooptions.js:2 ~ genericVidOps ~ options:", options)
        throw new Error('src (s) is not defined')
    }

    let { w, h } = dimensions;
    // w 1280 , h 720
    // x="180.291rpx" y="100.189rpx" height="214.941rpx" width="358.227rpx" 
    return {
        zIndex: options.z || '2',
        x: options.x  || `${options.x ||  Math.floor(w/7.1)}rpx`, //180
        y: options.y  || `${options.y || Math.floor(h/7.1)}rpx`, //100
        height:options.h  ||  `${options.h || Math.floor(h/3.5)}rpx`,
        width: options.w  || `${options.w || Math.floor(w/3.5)}rpx`,
        src: options.s,
        duration: options.d || '10',
        ss: options.ss || '0',
        text: options.t,
        loop: options.l || 'false',
        audio: options.a || 'true',
        preload: 'true',

    }
}
module.exports = {
    genericVidOps
}