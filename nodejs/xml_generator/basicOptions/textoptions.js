function genericTxtOps (options) {
    return {
        zIndex: options.z || '2',
        x: `${options.x}vw`,
        y: `${options.y}vh`,
        height: `${options.h}rpx`,
        width: `${options.w}rpx`,
        text: options.t,
        fontSize: `${options.f || 20}px`,
    }
}

module.exports = {
    genericTxtOps
}