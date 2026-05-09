import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { ClientDeferredShell } from "@/components/site/ClientDeferredShell";
import { Navigation } from "@/components/site/Navigation";
import { Hero } from "@/components/site/Hero";

/** Mobile-only: shrinks Style & Layout work for off-screen sections (content-visibility). */
function Cv({ children }: { children: ReactNode }) {
  return <div className="cv-mobile-auto">{children}</div>;
}

const SectionDivider = dynamic(
  () => import("@/components/site/SectionDivider").then((m) => ({ default: m.SectionDivider })),
  { ssr: true },
);

const Philosophy = dynamic(
  () => import("@/components/site/Philosophy").then((m) => ({ default: m.Philosophy })),
  { ssr: true },
);
const Heritage = dynamic(
  () => import("@/components/site/Heritage").then((m) => ({ default: m.Heritage })),
  { ssr: true },
);
const Catalog = dynamic(
  () => import("@/components/site/Catalog").then((m) => ({ default: m.Catalog })),
  { ssr: true },
);
const Gallery = dynamic(
  () => import("@/components/site/Gallery").then((m) => ({ default: m.Gallery })),
  { ssr: true },
);
const Tasting = dynamic(
  () => import("@/components/site/Tasting").then((m) => ({ default: m.Tasting })),
  { ssr: true },
);
const Sommelier = dynamic(
  () => import("@/components/site/Sommelier").then((m) => ({ default: m.Sommelier })),
  { ssr: true },
);
const Chalet = dynamic(
  () => import("@/components/site/Chalet").then((m) => ({ default: m.Chalet })),
  { ssr: true },
);
const Faq = dynamic(() => import("@/components/site/Faq").then((m) => ({ default: m.Faq })), {
  ssr: true,
});
const Confraria = dynamic(
  () => import("@/components/site/Confraria").then((m) => ({ default: m.Confraria })),
  { ssr: true },
);
const Footer = dynamic(
  () => import("@/components/site/Footer").then((m) => ({ default: m.Footer })),
  { ssr: true },
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <ClientDeferredShell />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={null}>
          <Cv>
            <Philosophy />
          </Cv>
        </Suspense>
        <Suspense fallback={null}>
          <SectionDivider from="imperial" to="background" />
        </Suspense>
        <Suspense fallback={null}>
          <Cv>
            <Heritage />
          </Cv>
        </Suspense>
        <Suspense fallback={null}>
          <SectionDivider from="background" to="background" />
        </Suspense>
        <Suspense fallback={null}>
          <Cv>
            <Catalog />
          </Cv>
        </Suspense>
        <Suspense fallback={null}>
          <SectionDivider from="background" to="background" />
        </Suspense>
        <Suspense fallback={null}>
          <Cv>
            <Gallery />
          </Cv>
        </Suspense>
        <Suspense fallback={null}>
          <SectionDivider from="background" to="imperial" />
        </Suspense>
        <Suspense fallback={null}>
          <Cv>
            <Sommelier />
          </Cv>
        </Suspense>
        <Suspense fallback={null}>
          <SectionDivider from="imperial" to="background" />
        </Suspense>
        <Suspense fallback={null}>
          <Cv>
            <Tasting />
          </Cv>
        </Suspense>
        <Suspense fallback={null}>
          <SectionDivider from="background" to="background" />
        </Suspense>
        <Suspense fallback={null}>
          <Cv>
            <Chalet />
          </Cv>
        </Suspense>
        <Suspense fallback={null}>
          <SectionDivider from="background" to="imperial" />
        </Suspense>
        <Suspense fallback={null}>
          <Cv>
            <Faq />
          </Cv>
        </Suspense>
        <Suspense fallback={null}>
          <SectionDivider from="imperial" to="background" />
        </Suspense>
        <Suspense fallback={null}>
          <Cv>
            <Confraria />
          </Cv>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <SectionDivider from="background" to="imperial" />
      </Suspense>
      <Suspense fallback={null}>
        <Cv>
          <Footer />
        </Cv>
      </Suspense>
    </div>
  );
}
