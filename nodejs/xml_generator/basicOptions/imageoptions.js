function genericImgOps (options, dimensions) {
    let { w, h } = dimensions;
    return {
        zIndex: options.z || '2',
        x: options.x_value || `${options.x ||  Math.floor(w/7.1)}rpx`, //180
        y: options.y_value || `${options.y || Math.floor(h/7.1)}rpx`, //100
        height: options.h_value ||  `${options.h || Math.floor(h/3.5)}rpx`,
        width: options.w_value || `${options.w || Math.floor(w/3.5)}rpx`,
        src: options.s,
        duration: options.d,
        ss: options.ss,
        loop: options.l || 'false',
        audio: options.a || 'true',
        preload: 'true',
    }
}
module.exports = {
    genericImgOps
}