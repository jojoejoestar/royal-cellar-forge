"use client";

import { Grape } from "lucide-react";
import { useEffect, useRef } from "react";

export function GoldenGrapeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const desktopMq = window.matchMedia("(min-width: 1025px) and (pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let active = false;
    let ax = 0;
    let ay = 0;
    let tx = 0;
    let ty = 0;

    const html = document.documentElement;

    const stopRaf = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const tick = () => {
      ax += (tx - ax) * 0.2;
      ay += (ty - ay) * 0.2;
      if (auraRef.current) {
        auraRef.current.style.left = `${ax}px`;
        auraRef.current.style.top = `${ay}px`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${event.clientX}px`;
        cursorRef.current.style.top = `${event.clientY}px`;
        cursorRef.current.style.opacity = "1";
      }
      if (auraRef.current) {
        auraRef.current.style.opacity = "1";
      }
    };

    const deactivate = () => {
      active = false;
      html.classList.remove("joestar-custom-cursor");
      stopRaf();
      window.removeEventListener("pointermove", handleMove);
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      if (auraRef.current) auraRef.current.style.opacity = "0";
    };

    const activate = () => {
      if (active) return;
      active = true;
      html.classList.add("joestar-custom-cursor");
      window.addEventListener("pointermove", handleMove, { passive: true });
      stopRaf();
      rafRef.current = requestAnimationFrame(tick);
    };

    const updateState = () => {
      if (desktopMq.matches && !reduceMq.matches) {
        activate();
      } else {
        deactivate();
      }
    };

    updateState();
    desktopMq.addEventListener("change", updateState);
    reduceMq.addEventListener("change", updateState);

    return () => {
      desktopMq.removeEventListener("change", updateState);
      reduceMq.removeEventListener("change", updateState);
      deactivate();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden lg:block">
      <div ref={auraRef} className="grape-cursor-aura" />
      <div ref={cursorRef} className="grape-cursor-dot">
        <span className="grape-cursor-icon" role="img" aria-label="Selo de uvas">
          <Grape className="h-5 w-5 text-gold" strokeWidth={1.3} />
        </span>
      </div>
    </div>
  );
}
