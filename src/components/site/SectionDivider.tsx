"use client";

import { Grape } from "lucide-react";

type Props = {
  /** Gradient direction: blends 'from' color into 'to' color vertically */
  from?: "background" | "scarlet-deep" | "scarlet";
  to?: "background" | "scarlet-deep" | "scarlet";
  /** Show the central grape ornament between two filigree lines */
  ornament?: boolean;
};

const colorVar: Record<NonNullable<Props["from"]>, string> = {
  background: "var(--background)",
  "scarlet-deep": "var(--scarlet-deep)",
  scarlet: "var(--scarlet)",
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
      className="section-divider-edge relative h-20 w-full overflow-hidden md:h-24"
      style={{
        ["--divider-from" as string]: fromC,
        ["--divider-to" as string]: toC,
        backgroundImage: `linear-gradient(to bottom, ${fromC} 0%, ${toC} 100%)`,
      }}
    >
      <div className="section-divider-blend-top absolute inset-x-0 top-0 h-7" />
      <div className="section-divider-blend-bottom absolute inset-x-0 bottom-0 h-7" />

      {/* Subtle grape vine pattern bridging the two tones */}
      <div className="absolute inset-0 pattern-grapes opacity-28" />

      {ornament && (
        <div className="relative flex h-full items-center justify-center px-6">
          {/* Left filigree */}
          <span
            className="h-px flex-1 max-w-[36%]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(0.78 0.13 85 / 0.55) 70%, oklch(0.78 0.13 85 / 0.85) 100%)",
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
                className="absolute inset-0 rounded-full opacity-70 blur-md"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.78 0.13 85 / 0.55) 0%, transparent 70%)",
                }}
              />
              <Grape
                className="relative h-5 w-5 text-gold drop-shadow-[0_0_6px_oklch(0.78_0.13_85_/_0.7)]"
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
                "linear-gradient(90deg, oklch(0.78 0.13 85 / 0.85) 0%, oklch(0.78 0.13 85 / 0.55) 30%, transparent 100%)",
            }}
          />
        </div>
      )}
    </div>
  );
}

