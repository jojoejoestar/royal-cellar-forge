"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsapBoot";

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

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
      requestAnimationFrame(() => ScrollTrigger.refresh());
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

  useEffect(() => {
    let resizeTimer = 0;
    const refreshNow = () => ScrollTrigger.refresh();
    const refreshResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(refreshNow, 120);
    };
    window.addEventListener("load", refreshNow);
    window.addEventListener("resize", refreshResize, { passive: true });
    const id = requestAnimationFrame(refreshNow);
    return () => {
      window.removeEventListener("load", refreshNow);
      window.removeEventListener("resize", refreshResize);
      cancelAnimationFrame(id);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return null;
}
