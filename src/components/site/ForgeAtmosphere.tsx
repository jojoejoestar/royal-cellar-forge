"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsapBoot";
import { fireflyBright, fireflyMotionStyle } from "@/lib/fireflyMotionStyle";
import { DESKTOP_POINTER_MQ, MOBILE_MQ, prefersReducedMotion } from "@/lib/media";
import { mountRoyalFloral } from "@/lib/royalFloral";

const FORGE_PARTICLE_DESKTOP = 58;
const FORGE_PARTICLE_MOBILE = 22;

export function ForgeAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [particleCount, setParticleCount] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches
      ? FORGE_PARTICLE_MOBILE
      : FORGE_PARTICLE_DESKTOP,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () =>
      setParticleCount(mq.matches ? FORGE_PARTICLE_MOBILE : FORGE_PARTICLE_DESKTOP);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const reducedMotion = prefersReducedMotion();
      const spotlight = rootRef.current?.querySelector<HTMLElement>(".forge-cursor-spotlight");
      const mm = gsap.matchMedia();
      const floralNodes: HTMLElement[] = [];
      let removePointerMove: (() => void) | undefined;
      let removeLuxuryInteractions: (() => void) | undefined;
      let removeMediaInteractions: (() => void) | undefined;

      const plantFlorals = (opacity?: number) => {
        gsap.utils.toArray<HTMLElement>("section").forEach((section, index) => {
          if (section.id === "top") return;
          if (getComputedStyle(section).position === "static") {
            section.style.position = "relative";
          }
          const node = mountRoyalFloral(
            section,
            index % 2 === 0 ? "left" : "right",
            index,
            gsap,
            reducedMotion,
          );
          floralNodes.push(node);
          if (opacity != null) gsap.to(node, { opacity, duration: 0.6 });
        });
      };

      mm.add(`${DESKTOP_POINTER_MQ}`, () => {
        plantFlorals();

        gsap.utils
          .toArray<HTMLElement>(".ambient-spotlight, .pattern-damask, .pattern-grapes")
          .forEach((node, index) => {
            gsap.to(node, {
              yPercent: index % 2 === 0 ? -14 : 12,
              ease: "none",
              scrollTrigger: {
                trigger: node.closest("section") ?? node,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.75,
              },
            });
          });

        gsap.to(".ambient-spotlight", {
          scale: 1.06,
          opacity: 0.88,
          duration: 4.8,
          ease: "sine.inOut",
          repeat: reducedMotion ? 0 : -1,
          yoyo: true,
          transformOrigin: "50% 50%",
        });

        const highlightTargets = gsap.utils.toArray<HTMLElement>(
          ".text-gradient-gold, .gold-divider, .section-ornament",
        );
        const mediaTargets = gsap.utils.toArray<HTMLElement>(
          ".philo-glass, .heritage-img, .cat-card, .tast-hero, .tast-side, .som-img, .chalet-img, .gal-card",
        );
        const actionableTargets = gsap.utils.toArray<HTMLElement>(
          "a, button, [role='button'], input[type='submit']",
        );

        actionableTargets.forEach((node) => {
          node.classList.add("luxury-action");
          if (node.matches("a")) node.classList.add("luxury-link");
        });

        const luxuryHandlers: Array<{
          node: HTMLElement;
          enter: () => void;
          leave: () => void;
        }> = [];

        highlightTargets.forEach((node) => {
          node.classList.add("luxury-highlight-interactive");
          const toY = gsap.quickTo(node, "y", { duration: 0.34, ease: "power2.out" });
          const enter = () => {
            node.classList.add("is-forge-bright");
            toY(-2);
          };
          const leave = () => {
            node.classList.remove("is-forge-bright");
            toY(0);
          };
          node.addEventListener("mouseenter", enter);
          node.addEventListener("mouseleave", leave);
          luxuryHandlers.push({ node, enter, leave });
        });

        const mediaHandlers: Array<{
          node: HTMLElement;
          enter: () => void;
          leave: () => void;
          move: (event: MouseEvent) => void;
        }> = [];

        mediaTargets.forEach((node) => {
          node.classList.add("luxury-media-interactive");
          gsap.set(node, {
            transformPerspective: 900,
            transformStyle: "preserve-3d",
            willChange: "transform",
          });

          const toX = gsap.quickTo(node, "x", { duration: 0.34, ease: "power2.out" });
          const toY = gsap.quickTo(node, "y", { duration: 0.34, ease: "power2.out" });
          const toRotateY = gsap.quickTo(node, "rotateY", { duration: 0.38, ease: "power2.out" });
          const toRotateX = gsap.quickTo(node, "rotateX", { duration: 0.38, ease: "power2.out" });
          const toScale = gsap.quickTo(node, "scale", { duration: 0.36, ease: "power2.out" });

          const enter = () => {
            toScale(1.012);
            node.classList.add("is-luxury-hover");
          };
          const leave = () => {
            toX(0);
            toY(0);
            toRotateX(0);
            toRotateY(0);
            toScale(1);
            node.classList.remove("is-luxury-hover");
          };
          const move = (event: MouseEvent) => {
            const bounds = node.getBoundingClientRect();
            const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
            const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
            toX(relX * 7);
            toY(relY * 5);
            toRotateY(relX * 4.5);
            toRotateX(relY * -4);
          };

          node.addEventListener("mouseenter", enter);
          node.addEventListener("mouseleave", leave);
          node.addEventListener("mousemove", move);
          mediaHandlers.push({ node, enter, leave, move });
        });

        removeMediaInteractions = () => {
          mediaHandlers.forEach(({ node, enter, leave, move }) => {
            node.removeEventListener("mouseenter", enter);
            node.removeEventListener("mouseleave", leave);
            node.removeEventListener("mousemove", move);
            node.classList.remove("luxury-media-interactive", "is-luxury-hover");
            gsap.set(node, {
              clearProps:
                "x,y,rotateX,rotateY,scale,transformPerspective,transformStyle,willChange",
            });
          });
        };

        removeLuxuryInteractions = () => {
          luxuryHandlers.forEach(({ node, enter, leave }) => {
            node.removeEventListener("mouseenter", enter);
            node.removeEventListener("mouseleave", leave);
            node.classList.remove("luxury-highlight-interactive", "is-forge-bright");
            gsap.set(node, { clearProps: "x,y,scale,transform,perspective,transformStyle" });
          });
        };

        if (spotlight && !reducedMotion) {
          const moveSpotlight = (event: PointerEvent) => {
            gsap.set(spotlight, { x: event.clientX, y: event.clientY, force3D: true });
          };
          window.addEventListener("pointermove", moveSpotlight, { passive: true });
          removePointerMove = () => window.removeEventListener("pointermove", moveSpotlight);
        }

        return () => {
          removePointerMove?.();
          removePointerMove = undefined;
          removeMediaInteractions?.();
          removeMediaInteractions = undefined;
          removeLuxuryInteractions?.();
          removeLuxuryInteractions = undefined;
        };
      });

      mm.add(`(max-width: 1024px), (pointer: coarse)`, () => {
        plantFlorals(0.75);
      });

      return () => {
        removePointerMove?.();
        removeMediaInteractions?.();
        removeLuxuryInteractions?.();
        floralNodes.forEach((node) => node.remove());
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <div className="forge-cursor-spotlight pointer-events-none absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform" />
      <div className="forge-noise absolute inset-0" />
      <div className="forge-vignette absolute inset-0" />
      <div className="forge-particles absolute inset-0" aria-hidden>
        {Array.from({ length: particleCount }).map((_, i) => (
          <span
            key={i}
            className={`absolute rounded-full will-change-transform ${
              fireflyBright(i) ? "forge-particle-bright" : "forge-particle-core"
            }`}
            style={fireflyMotionStyle(i, 1)}
          />
        ))}
      </div>
    </div>
  );
}
