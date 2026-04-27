import { Navigation } from "@/components/site/Navigation";
import { Hero } from "@/components/site/Hero";
import { Philosophy } from "@/components/site/Philosophy";
import { Heritage } from "@/components/site/Heritage";
import { Catalog } from "@/components/site/Catalog";
import { Gallery } from "@/components/site/Gallery";
import { Tasting } from "@/components/site/Tasting";
import { Sommelier } from "@/components/site/Sommelier";
import { Chalet } from "@/components/site/Chalet";
import { Faq } from "@/components/site/Faq";
import { Confraria } from "@/components/site/Confraria";
import { Footer } from "@/components/site/Footer";
import { SectionDivider } from "@/components/site/SectionDivider";
import { CinematicForgeLayer } from "@/components/site/CinematicForgeLayer";
import { SmoothDesktopScroll } from "@/components/site/SmoothDesktopScroll";
import { GoldenGrapeCursor } from "@/components/site/GoldenGrapeCursor";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <SmoothDesktopScroll />
      <GoldenGrapeCursor />
      <CinematicForgeLayer />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Philosophy />
        <SectionDivider from="imperial" to="background" />
        <Heritage />
        <SectionDivider from="background" to="background" />
        <Catalog />
        <SectionDivider from="background" to="background" />
        <Gallery />
        <SectionDivider from="background" to="imperial" />
        <Tasting />
        <SectionDivider from="imperial" to="background" />
        <Sommelier />
        <SectionDivider from="background" to="background" />
        <Chalet />
        <SectionDivider from="background" to="imperial" />
        <Faq />
        <SectionDivider from="imperial" to="background" />
        <Confraria />
      </main>
      <SectionDivider from="background" to="imperial" />
      <Footer />
    </div>
  );
}
