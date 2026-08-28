import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-transparent py-14 md:py-20 cv-mobile-auto",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative mx-auto max-w-7xl px-6 lg:px-10", className)}>{children}</div>
  );
}

export function PatternBackdrop({ damask = 0, grapes = 0 }: { damask?: number; grapes?: number }) {
  return (
    <>
      {damask > 0 ? (
        <div className="absolute inset-0 pattern-damask" style={{ opacity: damask }} />
      ) : null}
      {grapes > 0 ? (
        <div className="absolute inset-0 pattern-grapes" style={{ opacity: grapes }} />
      ) : null}
    </>
  );
}
