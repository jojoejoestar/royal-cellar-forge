"use client";

import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useState } from "react";
import { DESKTOP_POINTER_MQ, MOBILE_MQ } from "@/lib/media";
import { useMatchMedia } from "@/hooks/useBrowser";

const SmoothDesktopScroll = dynamic(
  () =>
    import("@/components/site/SmoothDesktopScroll").then((m) => ({
      default: m.SmoothDesktopScroll,
    })),
  { ssr: false },
);

const GoldenGrapeCursor = dynamic(
  () =>
    import("@/components/site/GoldenGrapeCursor").then((m) => ({
      default: m.GoldenGrapeCursor,
    })),
  { ssr: false },
);

const ForgeAtmosphere = dynamic(
  () =>
    import("@/components/site/ForgeAtmosphere").then((m) => ({
      default: m.ForgeAtmosphere,
    })),
  { ssr: false },
);

export function DeferredEffects() {
  const desktopSmoothScroll = useMatchMedia(DESKTOP_POINTER_MQ);
  const [showForge, setShowForge] = useState(false);

  useLayoutEffect(() => {
    if (!window.matchMedia(MOBILE_MQ).matches) setShowForge(true);
  }, []);

  useEffect(() => {
    if (!window.matchMedia(MOBILE_MQ).matches) return;

    let idleId = 0;
    let timeoutId = 0;
    const enable = () => setShowForge(true);

    if (typeof requestIdleCallback !== "undefined") {
      idleId = requestIdleCallback(enable, { timeout: 1600 });
    } else {
      timeoutId = window.setTimeout(enable, 120);
    }

    return () => {
      if (idleId && typeof cancelIdleCallback !== "undefined") cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {desktopSmoothScroll ? <SmoothDesktopScroll /> : null}
      <GoldenGrapeCursor />
      {showForge ? <ForgeAtmosphere /> : null}
    </>
  );
}
