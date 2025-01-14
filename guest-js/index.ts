import { invoke } from "@tauri-apps/api/core";

export async function ping(value: string): Promise<string | null> {
  return await invoke<{ value?: string }>("plugin:taurimation|ping", {
    payload: {
      value,
    },
  }).then((r) => (r.value ? r.value : null));
}

export type AnimationEasing =
  | "EaseInSine"
  | "EaseOutSine"
  | "EaseInOutSine"
  | "EaseInQuad"
  | "EaseOutQuad"
  | "EaseInOutQuad"
  | "EaseInCubic"
  | "EaseOutCubic"
  | "EaseInOutCubic"
  | "EaseInQuart"
  | "EaseOutQuart"
  | "EaseInOutQuart"
  | "EaseInQuint"
  | "EaseOutQuint"
  | "EaseInOutQuint"
  | "EaseInExpo"
  | "EaseOutExpo"
  | "EaseInOutExpo"
  | "EaseInCirc"
  | "EaseOutCirc"
  | "EaseInOutCirc"
  | "EaseOutBack"
  | "EaseInOutBack"
  | "EaseOutElastic"
  | "EaseOutBounce"
  | "EaseInBounce";

export type AnimationPayload = {
  windowname: string;
  steps: number;
  duration: number;
  from?: number[];
  to: number[];
  easing: AnimationEasing;
};
export async function animateMe(
  windowname: string,
  steps: number,
  duration: number,
  to: number[],
  easing: AnimationEasing,
  from?: number[]
): Promise<boolean | null> {
  return await invoke<{ value?: boolean }>("plugin:taurimation|animate_me", {
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
export async function animateMeSize(
  windowname: string,
  steps: number,
  duration: number,
  to: number[],
  easing: AnimationEasing,
  from?: number[]
): Promise<boolean | null> {
  return await invoke<{ value?: boolean }>(
    "plugin:taurimation|animate_me_size",
    {
      payload: {
        windowname: windowname,
        steps: steps,
        duration: duration,
        to: to,
        easing: easing,
        from: from,
      },
    }
  ).then((r) => true);
}
