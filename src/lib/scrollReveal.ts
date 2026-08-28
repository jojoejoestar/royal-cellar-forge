import gsap from "@/lib/gsapBoot";
import { revealEase, stRevealOnce } from "@/lib/revealTiming";

export { revealEase, stRevealOnce };

type RevealScroll = {
  trigger: gsap.DOMTarget;
  start?: string;
  end?: string;
};

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
