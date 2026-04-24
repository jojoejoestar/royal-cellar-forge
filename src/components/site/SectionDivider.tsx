"use client";

import { Grape } from "lucide-react";

type Props = {
  /** Gradient direction: blends 'from' color into 'to' color vertically */
  from?: "background" | "scarlet-deep" | "scarlet" | "imperial";
  to?: "background" | "scarlet-deep" | "scarlet" | "imperial";
  /** Show the central grape ornament between two filigree lines */
  ornament?: boolean;
};

const colorVar: Record<NonNullable<Props["from"]>, string> = {
  background: "var(--background)",
  "scarlet-deep": "var(--scarlet-deep)",
  scarlet: "var(--scarlet)",
  imperial: "color-mix(in oklch, var(--scarlet) 56%, var(--background) 44%)",
};

/**
 * Elegant transition between two sections — the signature seal between acts.
 * - Smooth vertical color blend (no harsh edges).
 * - Twin gold filigree lines flanking a grape glyph and rotated diamonds.
 * - Soft radial gold spotlight to draw the eye.
 */
export function SectionDivider({
  from = "background",
  to = "background",
  ornament = true,
}: Props) {
  const fromC = colorVar[from];
  const toC = colorVar[to];

  return (
    <div
      aria-hidden
      className="section-divider-edge relative h-24 w-full overflow-hidden md:h-28"
      style={{
        ["--divider-from" as string]: fromC,
        ["--divider-to" as string]: toC,
        backgroundColor: "transparent",
      }}
    >
      {/* Cinematic blend veil without creating a hard color band */}
      <div className="section-divider-blend-top absolute inset-x-0 top-0 h-[62%]" />
      <div className="section-divider-blend-bottom absolute inset-x-0 bottom-0 h-[62%]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-12 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklch, var(--divider-from) 35%, var(--divider-to) 35%) 0%, transparent 72%)",
          opacity: 0.35,
        }}
      />

      {ornament && (
        <div className="relative flex h-full items-center justify-center px-6">
          {/* Left filigree */}
          <span
            className="h-px flex-1 max-w-[36%]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(0.72 0.10 78 / 0.55) 70%, oklch(0.72 0.10 78 / 0.85) 100%)",
            }}
          />
          {/* Diamond + grape glyph */}
          <span className="mx-4 flex items-center gap-3">
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
          {/* Right filigree */}
          <span
            className="h-px flex-1 max-w-[36%]"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.72 0.10 78 / 0.85) 0%, oklch(0.72 0.10 78 / 0.55) 30%, transparent 100%)",
            }}
          />
        </div>
      )}
    </div>
  );
}

