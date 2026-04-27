"use client";

import { Grape } from "lucide-react";

type Props = {
  /** Kept for backwards compatibility with existing call sites */
  from?: "background" | "scarlet-deep" | "scarlet" | "imperial";
  to?: "background" | "scarlet-deep" | "scarlet" | "imperial";
  /** Show the central grape ornament over a continuous gold hairline */
  ornament?: boolean;
  /** Optional spacing control for edge-to-edge section cuts */
  className?: string;
};

/**
 * Elegant transition between two sections - the signature seal between acts.
 * - One continuous gold hairline behind the center glyph (no edge cut-outs).
 * - Diamond accents and a soft radial glow on the grape seal.
 */
export function SectionDivider({ ornament = true, className = "" }: Props) {
  return (
    <div
      aria-hidden
      className={`section-divider-edge relative z-20 h-16 w-full overflow-hidden md:h-20 ${className}`}
      style={{
        backgroundColor: "transparent",
      }}
    >
      {ornament && (
        <div className="relative flex h-full items-center justify-center px-6">
          {/* Split hairline: keep center clean for ornament emphasis */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-6 top-1/2 h-[1.5px] w-[calc(50%-74px)] -translate-y-1/2 rounded-full md:left-10 md:w-[calc(50%-86px)]"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.72 0.10 78 / 0.22) 0%, oklch(0.72 0.10 78 / 0.55) 45%, oklch(0.8 0.12 82 / 0.88) 100%)",
              boxShadow: "0 0 10px oklch(0.72 0.10 78 / 0.16), 0 0 18px oklch(0.72 0.10 78 / 0.08)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-6 top-1/2 h-[1.5px] w-[calc(50%-74px)] -translate-y-1/2 rounded-full md:right-10 md:w-[calc(50%-86px)]"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.8 0.12 82 / 0.88) 0%, oklch(0.72 0.10 78 / 0.55) 55%, oklch(0.72 0.10 78 / 0.22) 100%)",
              boxShadow: "0 0 10px oklch(0.72 0.10 78 / 0.16), 0 0 18px oklch(0.72 0.10 78 / 0.08)",
            }}
          />
          {/* Diamond + grape glyph */}
          <span className="relative z-[1] mx-4 flex items-center gap-3">
            <span
              className="block h-1.5 w-1.5 rotate-45 border border-gold/80"
              style={{ background: "transparent" }}
            />
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span
                className="absolute inset-0 rounded-full opacity-45 blur-md"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.72 0.10 78 / 0.38) 0%, transparent 72%)",
                }}
              />
              <Grape
                className="relative h-5 w-5 text-gold drop-shadow-[0_0_5px_oklch(0.72_0.10_78_/_0.5)]"
                strokeWidth={1.3}
              />
            </span>
            <span
              className="block h-1.5 w-1.5 rotate-45 border border-gold/80"
              style={{ background: "transparent" }}
            />
          </span>
        </div>
      )}
    </div>
  );
}
