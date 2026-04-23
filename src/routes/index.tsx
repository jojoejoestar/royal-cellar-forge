import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/site/Navigation";
import { Hero } from "@/components/site/Hero";
import { Philosophy } from "@/components/site/Philosophy";
import { Heritage } from "@/components/site/Heritage";
import { Catalog } from "@/components/site/Catalog";
import { Sommelier } from "@/components/site/Sommelier";
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
        {/* Catalog → Sommelier (same tone, ornament only) */}
        <SectionDivider from="background" to="background" />
        <Sommelier />
        {/* Sommelier → Faq (background → scarlet top) */}
        <SectionDivider from="background" to="scarlet" />
        <Faq />
        {/* Faq → Confraria (scarlet bottom → background) */}
        <SectionDivider from="scarlet-deep" to="background" />
        <Confraria />
      </main>
      <Footer />
    </div>
  );
}
