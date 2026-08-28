"use client";

import { Grape } from "lucide-react";
import { useEffect, useRef } from "react";
import { DESKTOP_POINTER_MQ, REDUCED_MOTION_MQ } from "@/lib/media";

function setTranslateCentered(
  el: HTMLElement | null,
  x: number,
  y: number,
  halfW: number,
  halfH: number,
) {
  if (!el) return;
  el.style.transform = `translate3d(${x - halfW}px, ${y - halfH}px, 0)`;
}

export function GoldenGrapeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktopMq = window.matchMedia(DESKTOP_POINTER_MQ);
    const reduceMq = window.matchMedia(REDUCED_MOTION_MQ);

    let active = false;

    const html = document.documentElement;

    const handleMove = (event: PointerEvent) => {
      setTranslateCentered(cursorRef.current, event.clientX, event.clientY, 16, 16);
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };

    const deactivate = () => {
      active = false;
      html.classList.remove("joestar-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    const activate = () => {
      if (active) return;
      active = true;
      html.classList.add("joestar-custom-cursor");
      window.addEventListener("pointermove", handleMove, { passive: true });
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
      <div ref={cursorRef} className="grape-cursor-dot">
        <span className="grape-cursor-icon" role="img" aria-label="Selo de uvas">
          <Grape className="h-5 w-5 text-gold" strokeWidth={1.3} />
        </span>
      </div>
    </div>
  );
}
