import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/site/Navigation";
import { Hero } from "@/components/site/Hero";
import { Philosophy } from "@/components/site/Philosophy";
import { Catalog } from "@/components/site/Catalog";
import { Sommelier } from "@/components/site/Sommelier";
import { Faq } from "@/components/site/Faq";
import { Confraria } from "@/components/site/Confraria";
import { Footer } from "@/components/site/Footer";

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
        <Philosophy />
        <Catalog />
        <Sommelier />
        <Faq />
        <Confraria />
      </main>
      <Footer />
    </div>
  );
}
