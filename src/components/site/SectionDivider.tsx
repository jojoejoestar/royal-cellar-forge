"use client";

import { Wine } from "lucide-react";

type Props = {
  /** Gradient direction: blends 'from' color into 'to' color vertically */
  from?: "background" | "scarlet-deep" | "scarlet" | "imperial";
  to?: "background" | "scarlet-deep" | "scarlet" | "imperial";
  /** Show the central wine ornament between two filigree lines */
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
 * - Twin gold filigree lines flanking a wine glyph and rotated diamonds.
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
        backgroundImage:
          "linear-gradient(to bottom, color-mix(in oklch, var(--divider-from) 88%, transparent) 0%, color-mix(in oklch, var(--divider-from) 52%, transparent) 36%, color-mix(in oklch, var(--divider-to) 52%, transparent) 64%, color-mix(in oklch, var(--divider-to) 88%, transparent) 100%)",
      }}
    >
      {/* Cinematic blend veil: eliminates hard pixel seams between sections */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-background/18 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/18 to-transparent" />

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
          {/* Diamond + wine glyph */}
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
              <Wine
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

