import dynamic from "next/dynamic";
import { DeferredEffects } from "@/components/site/DeferredEffects";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Navigation } from "@/components/site/Navigation";
import { SectionDivider } from "@/components/site/SectionDivider";

const HomeBelowFold = dynamic(() =>
  import("@/components/site/HomeBelowFold").then((m) => ({ default: m.HomeBelowFold })),
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <DeferredEffects />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <HomeBelowFold />
      </main>
      <SectionDivider />
      <Footer />
    </div>
  );
}
