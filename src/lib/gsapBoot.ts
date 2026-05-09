import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration + perf-friendly defaults for every GSAP entry point.
 * Import from here instead of `gsap` directly so ScrollTrigger config runs once.
 */
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

export { gsap, ScrollTrigger };
export default gsap;
