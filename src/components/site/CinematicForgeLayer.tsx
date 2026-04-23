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
      let removeTitleInteractions: (() => void) | undefined;

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

      const floralNodes: HTMLElement[] = [];

      const createRoyalFloral = (
        section: HTMLElement,
        side: "left" | "right",
        index: number,
      ) => {
        const ornament = document.createElement("div");
        ornament.className = `royal-floral royal-floral-${side}`;
        ornament.innerHTML = `
          <svg class="royal-floral-svg" viewBox="0 0 320 320" aria-hidden="true">
            <g class="royal-floral-stroke">
              <path class="royal-floral-line" d="M20 260 C 70 240, 120 200, 130 150 C 140 95, 170 60, 220 40" />
              <path class="royal-floral-line" d="M105 210 C 140 175, 158 135, 155 100" />
              <path class="royal-floral-line" d="M78 234 C 110 222, 140 202, 164 176" />
              <path class="royal-floral-line" d="M120 152 C 98 134, 84 112, 82 84" />
            </g>
            <g class="royal-floral-petals">
              <ellipse cx="164" cy="176" rx="18" ry="10" />
              <ellipse cx="176" cy="164" rx="12" ry="7" />
              <ellipse cx="146" cy="188" rx="9" ry="5.5" />
              <ellipse cx="132" cy="150" rx="11" ry="6.5" />
              <ellipse cx="112" cy="122" rx="9" ry="5.5" />
              <ellipse cx="88" cy="92" rx="8" ry="5" />
            </g>
            <g class="royal-floral-bloom">
              <circle cx="220" cy="40" r="12" />
              <circle cx="232" cy="32" r="6" />
              <circle cx="208" cy="48" r="5" />
            </g>
          </svg>
        `;

        ornament.style.setProperty("--floral-delay", `${index * 0.06}s`);
        section.appendChild(ornament);
        floralNodes.push(ornament);

        const lines = ornament.querySelectorAll<SVGPathElement>(".royal-floral-line");
        const petals = ornament.querySelectorAll<SVGEllipseElement>(".royal-floral-petals ellipse");
        const bloom = ornament.querySelectorAll<SVGCircleElement>(".royal-floral-bloom circle");

        lines.forEach((line) => {
          const len = line.getTotalLength();
          line.style.strokeDasharray = `${len}`;
          line.style.strokeDashoffset = `${len}`;
        });

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
          defaults: { ease: "power3.out" },
        });

        reveal
          .fromTo(
            ornament,
            { opacity: 0, scale: 0.9, rotate: side === "left" ? -8 : 8 },
            { opacity: 1, scale: 1, rotate: 0, duration: 1.1 },
          )
          .to(
            lines,
            {
              strokeDashoffset: 0,
              duration: 1.2,
              stagger: 0.12,
            },
            "-=0.75",
          )
          .fromTo(
            petals,
            { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" },
            { opacity: 1, scale: 1, duration: 0.9, stagger: 0.08 },
            "-=0.6",
          )
          .fromTo(
            bloom,
            { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" },
            { opacity: 1, scale: 1, duration: 0.7, stagger: 0.06 },
            "-=0.45",
          );

        gsap.to(ornament, {
          y: side === "left" ? -8 : -10,
          x: side === "left" ? 4 : -4,
          duration: 4.6 + index * 0.03,
          ease: "sine.inOut",
          repeat: reducedMotion ? 0 : -1,
          yoyo: true,
        });
      };

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

        revealTargets.forEach((section, index) => {
          if (section.id === "top") return;
          if (getComputedStyle(section).position === "static") {
            section.style.position = "relative";
          }
          createRoyalFloral(section, index % 2 === 0 ? "left" : "right", index);
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

        const headingTargets = gsap.utils.toArray<HTMLElement>("h1, h2, h3");
        const highlightTargets = gsap.utils.toArray<HTMLElement>(
          ".text-gradient-gold, .gold-divider, .section-ornament",
        );
        const interactionHandlers: Array<{
          node: HTMLElement;
          enter: () => void;
          leave: () => void;
          move: (event: MouseEvent) => void;
        }> = [];

        headingTargets.forEach((node) => {
          node.classList.add("luxury-title-interactive");
          const toX = gsap.quickTo(node, "x", { duration: 0.42, ease: "power3.out" });
          const toY = gsap.quickTo(node, "y", { duration: 0.42, ease: "power3.out" });
          const toRotateY = gsap.quickTo(node, "rotateY", {
            duration: 0.48,
            ease: "power3.out",
          });
          const toRotateX = gsap.quickTo(node, "rotateX", {
            duration: 0.48,
            ease: "power3.out",
          });
          const toScale = gsap.quickTo(node, "scale", { duration: 0.44, ease: "power3.out" });

          const enter = () => {
            node.classList.add("is-active");
            toScale(1.012);
            gsap.to(node, {
              letterSpacing: "0.02em",
              duration: 0.38,
              ease: "power2.out",
              overwrite: true,
            });
          };

          const leave = () => {
            node.classList.remove("is-active");
            toX(0);
            toY(0);
            toRotateX(0);
            toRotateY(0);
            toScale(1);
            gsap.to(node, {
              letterSpacing: "0.01em",
              duration: 0.42,
              ease: "power2.out",
              overwrite: true,
            });
          };

          const move = (event: MouseEvent) => {
            const bounds = node.getBoundingClientRect();
            const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
            const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
            toX(relX * 9);
            toY(relY * 6);
            toRotateY(relX * 6);
            toRotateX(relY * -5);
          };

          node.addEventListener("mouseenter", enter);
          node.addEventListener("mouseleave", leave);
          node.addEventListener("mousemove", move);
          interactionHandlers.push({ node, enter, leave, move });
        });

        highlightTargets.forEach((node) => {
          node.classList.add("luxury-highlight-interactive");
          const toY = gsap.quickTo(node, "y", { duration: 0.34, ease: "power2.out" });
          const enter = () => {
            gsap.to(node, {
              filter: "brightness(1.25) saturate(1.15)",
              duration: 0.28,
              ease: "power2.out",
              overwrite: true,
            });
            toY(-2);
          };
          const leave = () => {
            gsap.to(node, {
              filter: "brightness(1) saturate(1)",
              duration: 0.33,
              ease: "power2.out",
              overwrite: true,
            });
            toY(0);
          };
          node.addEventListener("mouseenter", enter);
          node.addEventListener("mouseleave", leave);
          interactionHandlers.push({
            node,
            enter,
            leave,
            move: () => undefined,
          });
        });

        removeTitleInteractions = () => {
          interactionHandlers.forEach(({ node, enter, leave, move }) => {
            node.removeEventListener("mouseenter", enter);
            node.removeEventListener("mouseleave", leave);
            node.removeEventListener("mousemove", move);
            node.classList.remove("luxury-title-interactive", "luxury-highlight-interactive", "is-active");
            gsap.set(node, {
              clearProps:
                "x,y,rotateX,rotateY,scale,letterSpacing,filter,transform,perspective,transformStyle",
            });
          });
        };

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

        return () => {
          removePointerMove?.();
          removePointerMove = undefined;
          removeTitleInteractions?.();
          removeTitleInteractions = undefined;
        };
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

        revealTargets.forEach((section, index) => {
          if (section.id === "top") return;
          if (getComputedStyle(section).position === "static") {
            section.style.position = "relative";
          }
          createRoyalFloral(section, index % 2 === 0 ? "left" : "right", index);
          const node = floralNodes[floralNodes.length - 1];
          gsap.to(node, { opacity: 0.75, duration: 0.6 });
        });
      });

      return () => {
        removePointerMove?.();
        removeTitleInteractions?.();
        floralNodes.forEach((node) => node.remove());
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
