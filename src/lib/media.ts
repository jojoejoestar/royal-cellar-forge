export const MOBILE_MQ = "(max-width: 1024px)";
export const DESKTOP_POINTER_MQ = "(min-width: 1025px) and (pointer: fine)";
export const REDUCED_MOTION_MQ = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_MQ).matches;
}
