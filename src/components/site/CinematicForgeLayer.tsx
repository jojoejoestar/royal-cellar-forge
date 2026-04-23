"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CinematicForgeLayer() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const spotlight = rootRef.current?.querySelector<HTMLElement>(".forge-cursor-spotlight");
      const mm = gsap.matchMedia();
      let removePointerMove: (() => void) | undefined;

      const sectionConfigs = [
        { id: "#top", selectors: ".philo-line, .cat-head", lag: 0.05 },
        { id: "#terroir", selectors: ".philo-line, .philo-pillar", lag: 0.12 },
        { id: "#heritage", selectors: ".heritage-line, .heritage-era", lag: 0.11 },
        { id: "#acervo", selectors: ".cat-head, .cat-card", lag: 0.1 },
        { id: "#galeria", selectors: ".gal-head", lag: 0.08 },
        { id: "#degustacao", selectors: ".tast-head, .tast-step", lag: 0.1 },
        { id: "#sommelier", selectors: ".som-text", lag: 0.09 },
        { id: "#chale", selectors: ".chalet-reveal, .chalet-card", lag: 0.1 },
        { id: "#confraria", selectors: ".conf-el", lag: 0.09 },
      ];

      mm.add("(min-width: 1025px) and (pointer: fine)", () => {
        const revealTargets = gsap.utils.toArray<HTMLElement>("section");
        revealTargets.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, yPercent: 4.5 },
            {
              opacity: 1,
              yPercent: 0,
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 84%",
                once: true,
              },
            },
          );
        });

        sectionConfigs.forEach((cfg) => {
          gsap.from(`${cfg.id} ${cfg.selectors}`, {
            y: 26,
            opacity: 0,
            duration: 1.05,
            ease: "power3.out",
            stagger: cfg.lag,
            scrollTrigger: {
              trigger: cfg.id,
              start: "top 72%",
            },
          });
        });

        gsap.utils
          .toArray<HTMLElement>(".spotlight-gold, .pattern-damask, .pattern-grapes")
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

        gsap.to(".spotlight-gold", {
          scale: 1.06,
          opacity: 0.88,
          duration: 4.8,
          ease: "sine.inOut",
          repeat: reducedMotion ? 0 : -1,
          yoyo: true,
          transformOrigin: "50% 50%",
        });

        gsap.to(".btn-gold-glow, .btn-outline-gold", {
          boxShadow:
            "0 0 0 1px oklch(0.85 0.15 88 / 0.85), 0 0 42px oklch(0.78 0.13 85 / 0.45)",
          duration: 2.6,
          ease: "sine.inOut",
          repeat: reducedMotion ? 0 : -1,
          yoyo: true,
        });

        if (spotlight && !reducedMotion) {
          const moveSpotlight = (event: PointerEvent) => {
            gsap.to(spotlight, {
              x: event.clientX,
              y: event.clientY,
              duration: 0.35,
              ease: "power2.out",
              overwrite: true,
            });
          };

          window.addEventListener("pointermove", moveSpotlight, { passive: true });
          removePointerMove = () => window.removeEventListener("pointermove", moveSpotlight);
        }
      });

      mm.add("(max-width: 1024px), (pointer: coarse)", () => {
        const revealTargets = gsap.utils.toArray<HTMLElement>("section");
        revealTargets.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        gsap.to(".btn-gold-glow, .btn-outline-gold", {
          boxShadow:
            "0 0 0 1px oklch(0.85 0.15 88 / 0.65), 0 0 30px oklch(0.78 0.13 85 / 0.3)",
          duration: 3.1,
          ease: "sine.inOut",
          repeat: reducedMotion ? 0 : -1,
          yoyo: true,
        });
      });

      return () => {
        removePointerMove?.();
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <div className="forge-cursor-spotlight absolute left-0 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="forge-noise absolute inset-0" />
      <div className="forge-vignette absolute inset-0" />
      <div className="forge-particles absolute inset-0" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-[3px] w-[3px] rounded-full bg-gold/60 animate-float-particle"
            style={{
              left: `${(i * 31) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animationDuration: `${5 + (i % 5)}s`,
              animationDelay: `${(i % 7) * 0.45}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
