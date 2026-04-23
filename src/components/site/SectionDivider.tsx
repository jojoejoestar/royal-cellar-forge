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
      className="relative h-24 w-full overflow-hidden md:h-28"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${fromC} 0%, ${toC} 100%)`,
      }}
    >
      {/* Subtle grape vine pattern bridging the two tones */}
      <div className="absolute inset-0 pattern-grapes opacity-50" />

      {/* Soft gold spotlight to catch the eye */}
      <div
        className="absolute left-1/2 top-1/2 h-44 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.13 85 / 0.32) 0%, transparent 70%)",
        }}
      />

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
