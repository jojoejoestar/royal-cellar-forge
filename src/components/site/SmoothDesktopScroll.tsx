"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothDesktopScroll() {
  useEffect(() => {
    const desktopMq = window.matchMedia("(min-width: 1025px) and (pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis: Lenis | null = null;
    let rafId = 0;

    const stopLenis = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };

    const setupLenis = () => {
      stopLenis();
      if (!desktopMq.matches || reduceMq.matches) return;

      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.09,
        wheelMultiplier: 0.85,
        autoRaf: false,
        anchors: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    setupLenis();
    desktopMq.addEventListener("change", setupLenis);
    reduceMq.addEventListener("change", setupLenis);

    return () => {
      desktopMq.removeEventListener("change", setupLenis);
      reduceMq.removeEventListener("change", setupLenis);
      stopLenis();
    };
  }, []);

  return null;
}
