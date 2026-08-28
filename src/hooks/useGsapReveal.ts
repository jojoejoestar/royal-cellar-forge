"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapBoot";
import { prefersReducedMotion } from "@/lib/media";

gsap.registerPlugin(useGSAP);

export function useGsapReveal(compose: (root: HTMLElement) => void) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      compose(root);
    },
    { scope: ref },
  );

  return ref;
}
