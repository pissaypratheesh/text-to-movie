function genericTransitionOps (options) {
    return {
        duration: `${options.d || 1}`,
        key:  `${options.k || 'cube'}`,
    }
}

module.exports = {
    genericTransitionOps
}