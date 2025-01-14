declare function ping(value: string): Promise<string | null>;
type AnimationEasing = "EaseInSine" | "EaseOutSine" | "EaseInOutSine" | "EaseInQuad" | "EaseOutQuad" | "EaseInOutQuad" | "EaseInCubic" | "EaseOutCubic" | "EaseInOutCubic" | "EaseInQuart" | "EaseOutQuart" | "EaseInOutQuart" | "EaseInQuint" | "EaseOutQuint" | "EaseInOutQuint" | "EaseInExpo" | "EaseOutExpo" | "EaseInOutExpo" | "EaseInCirc" | "EaseOutCirc" | "EaseInOutCirc" | "EaseOutBack" | "EaseInOutBack" | "EaseOutElastic" | "EaseOutBounce" | "EaseInBounce";
type AnimationPayload = {
    windowname: string;
    steps: number;
    duration: number;
    from?: number[];
    to: number[];
    easing: AnimationEasing;
};
declare function animateMe(windowname: string, steps: number, duration: number, to: number[], easing: AnimationEasing, from?: number[]): Promise<boolean | null>;
declare function animateMeSize(windowname: string, steps: number, duration: number, to: number[], easing: AnimationEasing, from?: number[]): Promise<boolean | null>;

export { type AnimationEasing, type AnimationPayload, animateMe, animateMeSize, ping };
