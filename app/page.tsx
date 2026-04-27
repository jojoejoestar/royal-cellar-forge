import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ClientDeferredShell } from "@/components/site/ClientDeferredShell";
import { Navigation } from "@/components/site/Navigation";
import { Hero } from "@/components/site/Hero";
import { SectionDivider } from "@/components/site/SectionDivider";

const Philosophy = dynamic(() =>
  import("@/components/site/Philosophy").then((m) => ({ default: m.Philosophy })),
);
const Heritage = dynamic(() =>
  import("@/components/site/Heritage").then((m) => ({ default: m.Heritage })),
);
const Catalog = dynamic(() =>
  import("@/components/site/Catalog").then((m) => ({ default: m.Catalog })),
);
const Gallery = dynamic(() =>
  import("@/components/site/Gallery").then((m) => ({ default: m.Gallery })),
);
const Tasting = dynamic(() =>
  import("@/components/site/Tasting").then((m) => ({ default: m.Tasting })),
);
const Sommelier = dynamic(() =>
  import("@/components/site/Sommelier").then((m) => ({ default: m.Sommelier })),
);
const Chalet = dynamic(() =>
  import("@/components/site/Chalet").then((m) => ({ default: m.Chalet })),
);
const Faq = dynamic(() => import("@/components/site/Faq").then((m) => ({ default: m.Faq })));
const Confraria = dynamic(() =>
  import("@/components/site/Confraria").then((m) => ({ default: m.Confraria })),
);
const Footer = dynamic(() =>
  import("@/components/site/Footer").then((m) => ({ default: m.Footer })),
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <ClientDeferredShell />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={null}>
          <Philosophy />
        </Suspense>
        <SectionDivider from="imperial" to="background" />
        <Suspense fallback={null}>
          <Heritage />
        </Suspense>
        <SectionDivider from="background" to="background" />
        <Suspense fallback={null}>
          <Catalog />
        </Suspense>
        <SectionDivider from="background" to="background" />
        <Suspense fallback={null}>
          <Gallery />
        </Suspense>
        <SectionDivider from="background" to="imperial" />
        <Suspense fallback={null}>
          <Tasting />
        </Suspense>
        <SectionDivider from="imperial" to="background" />
        <Suspense fallback={null}>
          <Sommelier />
        </Suspense>
        <SectionDivider from="background" to="background" />
        <Suspense fallback={null}>
          <Chalet />
        </Suspense>
        <SectionDivider from="background" to="imperial" />
        <Suspense fallback={null}>
          <Faq />
        </Suspense>
        <SectionDivider from="imperial" to="background" />
        <Suspense fallback={null}>
          <Confraria />
        </Suspense>
      </main>
      <SectionDivider from="background" to="imperial" />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
