"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapBoot";
import { revealEase, stRevealOnce } from "@/lib/scrollReveal";

gsap.registerPlugin(useGSAP);

type AnimatedTitleProps = {
  as?: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
};

export function AnimatedTitle({
  as = "h2",
  className = "",
  children,
}: AnimatedTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1024px)", () => {
        gsap.set(node, { "--title-underline-scale": 0 });

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.set(node, { autoAlpha: 1, y: 0, "--title-underline-scale": 1 });
          return () => undefined;
        }

        /* Mobile LCP: keep hero copy painted immediately; only animate the underline. */
        gsap.set(node, { autoAlpha: 1, y: 0, force3D: true });
        gsap.to(node, {
          "--title-underline-scale": 1,
          duration: 1.05,
          ease: revealEase,
          scrollTrigger: {
            ...stRevealOnce,
            trigger: node,
            start: "top bottom-=8%",
          },
        });
        return () => undefined;
      });

      mm.add("(min-width: 1025px)", () => {
        let timer = 0;

        const run = () => {
          gsap.set(node, { "--title-underline-scale": 0 });

          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set(node, { autoAlpha: 1, y: 0, "--title-underline-scale": 1 });
            return;
          }

          gsap.set(node, { autoAlpha: 0, y: 14, force3D: true });

          const st = () => ({
            ...stRevealOnce,
            trigger: node,
            start: "top bottom-=8%",
          });

          gsap.to(node, {
            autoAlpha: 1,
            y: 0,
            force3D: true,
            duration: 0.95,
            ease: revealEase,
            scrollTrigger: st(),
          });

          gsap.to(node, {
            "--title-underline-scale": 1,
            duration: 1.05,
            ease: revealEase,
            scrollTrigger: st(),
          });
        };

        const raf = requestAnimationFrame(() => {
          timer = window.setTimeout(run, 100);
        });
        return () => {
          cancelAnimationFrame(raf);
          if (timer) window.clearTimeout(timer);
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [], revertOnUpdate: true },
  );

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`animated-title will-change-transform relative text-champagne ${className}`}
    >
      {children}
    </Tag>
  );
}
