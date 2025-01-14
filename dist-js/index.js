import { invoke } from '@tauri-apps/api/core';

async function ping(value) {
    return await invoke("plugin:taurimation|ping", {
        payload: {
            value,
        },
    }).then((r) => (r.value ? r.value : null));
}
async function animateMe(windowname, steps, duration, to, easing, from) {
    return await invoke("plugin:taurimation|animate_me", {
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
    return await invoke("plugin:taurimation|animate_me_size", {
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

export { animateMe, animateMeSize, ping };
//# sourceMappingURL=index.js.map
