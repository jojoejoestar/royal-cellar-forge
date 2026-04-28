"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothDesktopScroll } from "@/components/site/SmoothDesktopScroll";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
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
