import { Bodoni_Moda } from "next/font/google";
import type { ReactNode } from "react";

const serif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export function RootBody({ children }: { children: ReactNode }) {
  return (
    <body className={`${serif.variable} relative`}>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_85%_at_50%_-8%,oklch(0.26_0.12_312_/_0.42)_0%,oklch(0.14_0.07_318_/_0.92)_42%,oklch(0.06_0.03_322)_100%)]"
      />
      {children}
    </body>
  );
}
