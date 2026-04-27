"use client";

import { SmoothDesktopScroll } from "@/components/site/SmoothDesktopScroll";
import { GoldenGrapeCursor } from "@/components/site/GoldenGrapeCursor";
import { CinematicForgeLayer } from "@/components/site/CinematicForgeLayer";

export default function DeferredClientEffects() {
  return (
    <>
      <SmoothDesktopScroll />
      <GoldenGrapeCursor />
      <CinematicForgeLayer />
    </>
  );
}
