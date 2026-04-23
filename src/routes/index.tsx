import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Cave Royale · Adega de Vinhos Finos · Curadoria Privada",
      },
      {
        name: "description",
        content:
          "Curadoria exclusiva de rótulos raros e safras históricas. Para paladares que exigem a excelência absoluta e o verdadeiro sabor do terroir.",
      },
      { property: "og:title", content: "Cave Royale · Adega de Vinhos Finos" },
      {
        property: "og:description",
        content:
          "Cápsulas líquidas do tempo. Acesso por convite à Confraria Cave Royale.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        {/* Hero → Philosophy (background → scarlet top) */}
        <SectionDivider from="background" to="scarlet" />
        <Philosophy />
        {/* Philosophy → Heritage (scarlet bottom → background) */}
        <SectionDivider from="scarlet-deep" to="background" />
        <Heritage />
        {/* Heritage → Catalog (same tone, ornament only) */}
        <SectionDivider from="background" to="background" />
        <Catalog />
        {/* Catalog → Gallery (same tone, ornament only) */}
        <SectionDivider from="background" to="background" />
        <Gallery />
        {/* Gallery → Tasting (background → scarlet) */}
        <SectionDivider from="background" to="scarlet" />
        <Tasting />
        {/* Tasting → Sommelier (scarlet bottom → background) */}
        <SectionDivider from="scarlet-deep" to="background" />
        <Sommelier />
        {/* Sommelier → Chalet (same tone, ornament only) */}
        <SectionDivider from="background" to="background" />
        <Chalet />
        {/* Chalet → Faq (background → scarlet top) */}
        <SectionDivider from="background" to="scarlet" />
        <Faq />
        {/* Faq → Confraria (scarlet bottom → background) */}
        <SectionDivider from="scarlet-deep" to="background" />
        <Confraria />
      </main>
      {/* Confraria → Footer (background → scarlet seal) */}
      <SectionDivider from="background" to="scarlet" />
      <Footer />
    </div>
  );
}
