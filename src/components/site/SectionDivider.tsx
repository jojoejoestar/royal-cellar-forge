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
 * Elegant transition between two sections.
 * - Smooth vertical color blend (no harsh edges).
 * - Optional gold filigree ornament with a grape glyph at center.
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
      className="relative h-32 w-full overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${fromC} 0%, ${toC} 100%)`,
      }}
    >
      {/* Subtle grape vine pattern bridging the two tones */}
      <div className="absolute inset-0 pattern-grapes opacity-40" />

      {/* Soft gold spotlight to catch the eye */}
      <div
        className="absolute left-1/2 top-1/2 h-40 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.13 85 / 0.18) 0%, transparent 70%)",
        }}
      />

      {ornament && (
        <div className="relative flex h-full items-center justify-center">
          {/* Left filigree */}
          <span
            className="h-px flex-1 max-w-[34%]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, oklch(0.78 0.13 85 / 0.5) 80%, oklch(0.78 0.13 85 / 0.7) 100%)",
            }}
          />
          {/* Diamond + grape glyph */}
          <span className="mx-5 flex items-center gap-3">
            <span
              className="block h-1.5 w-1.5 rotate-45 border border-gold/70"
              style={{ background: "transparent" }}
            />
            <Grape className="h-4 w-4 text-gold/80" strokeWidth={1.2} />
            <span
              className="block h-1.5 w-1.5 rotate-45 border border-gold/70"
              style={{ background: "transparent" }}
            />
          </span>
          {/* Right filigree */}
          <span
            className="h-px flex-1 max-w-[34%]"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.78 0.13 85 / 0.7) 0%, oklch(0.78 0.13 85 / 0.5) 20%, transparent 100%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
