/** Shared GSAP ease + ScrollTrigger defaults (no GSAP import — safe for hero-critical path). */
export const revealEase = "power3.out";

export const stRevealOnce = {
  once: true as const,
  toggleActions: "play none none none" as const,
  invalidateOnRefresh: true as const,
};
