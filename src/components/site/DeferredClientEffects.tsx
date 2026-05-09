"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOBILE_PERF_MQ } from "@/lib/mobilePerf";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

const SmoothDesktopScroll = dynamic(
  () => import("@/components/site/SmoothDesktopScroll").then((m) => ({ default: m.SmoothDesktopScroll })),
  { ssr: false },
);

const GoldenGrapeCursor = dynamic(
  () => import("@/components/site/GoldenGrapeCursor").then((m) => ({ default: m.GoldenGrapeCursor })),
  { ssr: false },
);

const CinematicForgeLayer = dynamic(
  () =>
    import("@/components/site/CinematicForgeLayer").then((m) => ({
      default: m.CinematicForgeLayer,
    })),
  { ssr: false },
);

export default function DeferredClientEffects() {
  const [desktopSmoothScroll, setDesktopSmoothScroll] = useState(false);
  const [showForge, setShowForge] = useState(false);

  useLayoutEffect(() => {
    const smoothMq = window.matchMedia("(min-width: 1025px) and (pointer: fine)");
    const syncSmooth = () => setDesktopSmoothScroll(smoothMq.matches);
    syncSmooth();
    smoothMq.addEventListener("change", syncSmooth);
    return () => smoothMq.removeEventListener("change", syncSmooth);
  }, []);

  useLayoutEffect(() => {
    if (!window.matchMedia(MOBILE_PERF_MQ).matches) {
      setShowForge(true);
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia(MOBILE_PERF_MQ).matches) return;

    let idleId = 0;
    let timeoutId = 0;

    const enableForge = () => setShowForge(true);

    if (typeof requestIdleCallback !== "undefined") {
      idleId = requestIdleCallback(enableForge, { timeout: 480 });
    } else {
      timeoutId = window.setTimeout(enableForge, 48);
    }

    return () => {
      if (idleId && typeof cancelIdleCallback !== "undefined") {
        cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {desktopSmoothScroll ? <SmoothDesktopScroll /> : null}
      <GoldenGrapeCursor />
      {showForge ? <CinematicForgeLayer /> : null}
    </>
  );
}
