import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  revealClass?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  revealClass,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : undefined}>
      <p className={cn(revealClass, "text-xs uppercase tracking-[0.5em] text-gold")}>{eyebrow}</p>
      <div className={cn(revealClass, "mt-6 gold-divider w-32", centered && "mx-auto")} />
      <AnimatedTitle
        as="h2"
        className={cn(
          revealClass,
          "mt-8 font-serif text-4xl leading-tight md:text-6xl",
          titleClassName,
        )}
      >
        {title}
      </AnimatedTitle>
      {description ? (
        <div
          className={cn(
            revealClass,
            "mt-6 text-base font-light leading-relaxed text-champagne/70",
            centered && "mx-auto max-w-2xl",
            descriptionClassName,
          )}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
}
