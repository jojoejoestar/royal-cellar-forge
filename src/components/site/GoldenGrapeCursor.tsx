"use client";

import { useEffect, useId, useRef } from "react";

export function GoldenGrapeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const gid = useId().replace(/:/g, "");

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

  const gradId = `royal-cursor-gold-${gid}`;
  const glowId = `royal-cursor-glow-${gid}`;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden lg:block">
      <div ref={auraRef} className="grape-cursor-aura" />
      <div ref={cursorRef} className="grape-cursor-dot">
        <svg
          className="wine-cursor-svg"
          viewBox="0 0 44 60"
          width="44"
          height="60"
          role="img"
          aria-label="Selo Cave Royale"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff6cc" />
              <stop offset="38%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#6b5420" />
            </linearGradient>
            <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="0.9" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M22 3c-1.2 0-2.2.85-2.2 1.9v1.4h4.4V4.9C24.2 3.85 23.2 3 22 3z"
            fill={`url(#${gradId})`}
            filter={`url(#${glowId})`}
            opacity="0.95"
          />
          <path
            d="M16.2 8.2h11.6c.9 0 1.6.7 1.6 1.55v2.1c0 2.1-1.4 3.95-3.45 4.55L24 17.2l-1.95-.8c-2.05-.6-3.45-2.45-3.45-4.55V9.75c0-.85.7-1.55 1.6-1.55z"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.15"
            strokeLinejoin="round"
            filter={`url(#${glowId})`}
          />
          <path
            d="M14.5 17.8c0-1.1.35-2.15 1-3.05M29.5 17.8c0-1.1-.35-2.15-1-3.05"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="0.85"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M17.2 17.5h9.6c1.35 0 2.45 1 2.6 2.3l2.35 28.4c.2 2.45-1.55 4.55-3.95 4.8H16.2c-2.4-.25-4.15-2.35-3.95-4.8l2.35-28.4c.15-1.3 1.25-2.3 2.6-2.3z"
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="1.25"
            strokeLinejoin="round"
            filter={`url(#${glowId})`}
          />
          <path
            d="M18.5 24h7"
            stroke={`url(#${gradId})`}
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.35"
          />
          <ellipse cx="22" cy="42" rx="5.5" ry="7" fill={`url(#${gradId})`} opacity="0.12" />
          <circle cx="22" cy="12.5" r="0.9" fill="#fff8dc" opacity="0.85" />
        </svg>
      </div>
    </div>
  );
}
