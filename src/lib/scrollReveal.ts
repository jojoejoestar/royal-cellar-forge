import gsap from "@/lib/gsapBoot";

/** Shared ease for editorial scroll reveals */
export const revealEase = "power3.out";

export const stRevealOnce = {
  once: true as const,
  toggleActions: "play none none none" as const,
  invalidateOnRefresh: true as const,
};

export type RevealScroll = {
  trigger: gsap.DOMTarget;
  start?: string;
  end?: string;
};

/**
 * Primes targets to the hidden “from” state immediately (before paint when called from useLayoutEffect),
 * then animates to rest on scroll. Fixes gsap.from + ScrollTrigger leaving content visible until the tween starts.
 */
export function primeAndReveal(
  selector: string,
  scope: Element | null | undefined,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  scroll: RevealScroll,
) {
  if (!scope) return;
  const targets = gsap.utils.toArray<Element>(selector, scope);
  if (!targets.length) return;

  gsap.set(targets, from);

  return gsap.to(targets, {
    ...to,
    ease: to.ease ?? revealEase,
    scrollTrigger: {
      ...stRevealOnce,
      trigger: scroll.trigger,
      start: scroll.start ?? "top 88%",
      ...(scroll.end ? { end: scroll.end } : {}),
    },
  });
}
