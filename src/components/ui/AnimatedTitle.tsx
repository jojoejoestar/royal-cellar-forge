"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { revealEase, stRevealOnce } from "@/lib/revealTiming";

gsap.registerPlugin(useGSAP);

type AnimatedTitleProps = {
  as?: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
};

export function AnimatedTitle({ as = "h2", className = "", children }: AnimatedTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      const isMobile = window.matchMedia("(max-width: 1024px)").matches;

      if (isMobile) {
        gsap.set(node, { "--title-underline-scale": 0 });

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.set(node, { autoAlpha: 1, y: 0, "--title-underline-scale": 1 });
          return () => undefined;
        }

        gsap.set(node, { autoAlpha: 1, y: 0, force3D: true });

        const obs = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              gsap.to(node, {
                "--title-underline-scale": 1,
                duration: 1.05,
                ease: revealEase,
              });
              obs.disconnect();
            }
          },
          { root: null, rootMargin: "0px 0px 12% 0px", threshold: 0.01 },
        );
        obs.observe(node);
        return () => obs.disconnect();
      }

      let cancelled = false;
      let rafId = 0;
      let timerId = 0;
      let revertCtx: (() => void) | undefined;

      const stopScheduling = () => {
        cancelAnimationFrame(rafId);
        window.clearTimeout(timerId);
        rafId = 0;
        timerId = 0;
      };

      void (async () => {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        if (cancelled || !node) return;
        gsap.registerPlugin(ScrollTrigger);

        const st = () => ({
          ...stRevealOnce,
          trigger: node,
          start: "top bottom-=8%",
        });

        const ctx = gsap.context(() => {
          gsap.set(node, { "--title-underline-scale": 0 });

          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set(node, { autoAlpha: 1, y: 0, "--title-underline-scale": 1 });
            return;
          }

          gsap.set(node, { autoAlpha: 0, y: 14, force3D: true });

          const run = () => {
            if (cancelled) return;
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

          rafId = requestAnimationFrame(() => {
            if (cancelled) return;
            timerId = window.setTimeout(run, 100);
          });
        }, node);

        revertCtx = () => {
          stopScheduling();
          ctx.revert();
        };
      })();

      return () => {
        cancelled = true;
        stopScheduling();
        revertCtx?.();
      };
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
