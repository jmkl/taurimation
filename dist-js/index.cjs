'use strict';

var core = require('@tauri-apps/api/core');

async function ping(value) {
    return await core.invoke("plugin:taurimation|ping", {
        payload: {
            value,
        },
    }).then((r) => (r.value ? r.value : null));
}
async function animateMe(windowname, steps, duration, to, easing, from) {
    return await core.invoke("plugin:taurimation|animate_me", {
        payload: {
            windowname: windowname,
            steps: steps,
            duration: duration,
            to: to,
            easing: easing,
            from: from,
        },
    }).then((r) => true);
}
async function animateMeSize(windowname, steps, duration, to, easing, from) {
    return await core.invoke("plugin:taurimation|animate_me_size", {
        payload: {
            windowname: windowname,
            steps: steps,
            duration: duration,
            to: to,
            easing: easing,
            from: from,
        },
    }).then((r) => true);
}

exports.animateMe = animateMe;
exports.animateMeSize = animateMeSize;
exports.ping = ping;
//# sourceMappingURL=index.cjs.map
