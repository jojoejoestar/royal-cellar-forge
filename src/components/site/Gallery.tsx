"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, Search, Wine, Award, Calendar, MapPin, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import bordeaux from "@/assets/wine-bordeaux\.jpg";
import brunello from "@/assets/wine-brunello\.jpg";
import burgundy from "@/assets/wine-burgundy\.jpg";
import champagneImg from "@/assets/wine-champagne\.jpg";
import loire from "@/assets/wine-loire\.jpg";
import rioja from "@/assets/wine-rioja\.jpg";
import douro from "@/assets/wine-douro\.jpg";
import napa from "@/assets/wine-napa\.jpg";

gsap.registerPlugin(ScrollTrigger);

type Region =
  | "Todos"
  | "França"
  | "Itália"
  | "Espanha"
  | "Portugal"
  | "Estados Unidos";

type RareWine = {
  id: string;
  name: string;
  region: Region;
  appellation: string;
  vintage: string;
  image: StaticImageData;
  rarity: string;
  bottles: string;
  marketPrice: string;
  notes: string;
  pairing: string;
  story: string;
  score: string;
};

const collection: RareWine[] = [
  {
    id: "margaux-2015",
    name: "Chateau Margaux",
    region: "França",
    appellation: "Bordeaux · Margaux",
    vintage: "2015",
    image: bordeaux,
    rarity: "1er Grand Cru Classé",
    bottles: "Alocação extremamente limitada",
    marketPrice: "US$ 1.200 - 2.000 (R$ 6.300 - 10.500)",
    notes:
      "Fruta negra precisa, violeta, tabaco fino e grafite. Profundo, aristocrático e de final persistente.",
    pairing: "Carré de cordeiro · Rossini de filé com trufas",
    story:
      "Um dos grandes ícones de Bordeaux, produzido no lendário terroir de Margaux com seleção parcelar rigorosa e potencial de guarda por décadas.",
    score: "99/100",
  },
  {
    id: "lafite-2010",
    name: "Chateau Lafite Rothschild",
    region: "França",
    appellation: "Bordeaux · Pauillac",
    vintage: "2010",
    image: bordeaux,
    rarity: "1er Grand Cru Classé",
    bottles: "Mercado secundário disputado",
    marketPrice: "US$ 1.050 - 1.400 (R$ 5.500 - 7.400)",
    notes:
      "Cassis, cedro, caixa de charuto e mineralidade precisa. Estrutura impecável, nobreza e longevidade exemplar.",
    pairing: "Cordeiro em crosta de ervas · Queijos curados",
    story:
      "Safra histórica em Pauillac, reverenciada por críticos e colecionadores; Lafite 2010 é referência de equilíbrio entre poder e elegância.",
    score: "100/100",
  },
  {
    id: "sassicaia-2018",
    name: "Tenuta San Guido Sassicaia",
    region: "Itália",
    appellation: "Toscana · Bolgheri Sassicaia DOC",
    vintage: "2018",
    image: brunello,
    rarity: "Super Toscano Icônico",
    bottles: "Alocação premium internacional",
    marketPrice: "US$ 255 - 500 (R$ 1.350 - 2.650)",
    notes:
      "Cassis, ervas secas, cedro e toque marítimo. Tanino refinado, acidez viva e textura de grande precisão.",
    pairing: "Bistecca alla Fiorentina · Tagliata de wagyu",
    story:
      "O vinho que redefiniu a Toscana moderna ao provar o potencial bordalês em Bolgheri; safra 2018 une classicismo e energia.",
    score: "97/100",
  },
  {
    id: "vega-unico-2012",
    name: "Vega Sicilia Unico",
    region: "Espanha",
    appellation: "Ribera del Duero · Unico Gran Reserva",
    vintage: "2012",
    image: rioja,
    rarity: "Gran Reserva de culto",
    bottles: "Lotes restritos por safra",
    marketPrice: "US$ 394 - 720 (R$ 2.100 - 3.800)",
    notes:
      "Ameixa preta, cedro, especiarias finas e couro. Potente e ao mesmo tempo preciso, com final de longa reverberação.",
    pairing: "Leitão assado · Jamón ibérico bellota",
    story:
      "Ícone absoluto da Espanha, elaborado com longuíssimo envelhecimento antes de chegar ao mercado e reputação de guarda lendária.",
    score: "97/100",
  },
  {
    id: "drc-echezeaux-2012",
    name: "Domaine de la Romanee-Conti Echezeaux",
    region: "França",
    appellation: "Borgonha · Echezeaux Grand Cru",
    vintage: "2012",
    image: burgundy,
    rarity: "Grand Cru de elite",
    bottles: "Extrema escassez global",
    marketPrice: "US$ 1.450 - 2.900 (R$ 7.600 - 15.300)",
    notes:
      "Framboesa silvestre, rosa seca, especiarias doces e sous-bois. Profundo, sedoso e de assinatura etérea.",
    pairing: "Pato ao molho de cassis · Cogumelos selvagens",
    story:
      "Produzido pela casa mais desejada da Borgonha, combina precisão artesanal extrema e um dos terroirs mais cobiçados do planeta.",
    score: "99/100",
  },
  {
    id: "noval-nacional-2017",
    name: "Quinta do Noval Nacional Vintage Port",
    region: "Portugal",
    appellation: "Douro · Porto Vintage Nacional",
    vintage: "2017",
    image: douro,
    rarity: "Nacional - lendário",
    bottles: "Produção mínima da parcela Nacional",
    marketPrice: "GBP 1.790+ (aprox. R$ 11.500+)",
    notes:
      "Fruta negra licorosa, cacau, alcaçuz e especiarias orientais. Concentração monumental e final praticamente infinito.",
    pairing: "Stilton · Chocolate amargo 80% · Charutos premium",
    story:
      "Nacional é um dos nomes mais míticos do vinho do Porto, proveniente de vinhas não enxertadas e produzido apenas em anos excepcionais.",
    score: "100/100",
  },
  {
    id: "krug-2008",
    name: "Krug Vintage Brut",
    region: "França",
    appellation: "Champagne · Reims",
    vintage: "2008",
    image: champagneImg,
    rarity: "Millesime de referência",
    bottles: "Alta demanda internacional",
    marketPrice: "US$ 470 - 575 (R$ 2.500 - 3.050)",
    notes:
      "Cítricos confit, brioche, amêndoas e notas calcárias. Tensão e cremosidade em equilíbrio magistral.",
    pairing: "Ostras Belon · Caviar Oscietra",
    story:
      "Krug lança Vintage apenas em anos de identidade singular; 2008 tornou-se uma safra cultuada entre colecionadores.",
    score: "98/100",
  },
  {
    id: "opus-one-2019",
    name: "Opus One",
    region: "Estados Unidos",
    appellation: "Napa Valley · Oakville",
    vintage: "2019",
    image: napa,
    rarity: "Napa icon",
    bottles: "Alocação concorrida",
    marketPrice: "US$ 314 - 500 (R$ 1.650 - 2.650)",
    notes:
      "Amora, violeta, cacau, grafite e especiarias doces. Cabernet de luxo com tanino refinado e final expansivo.",
    pairing: "Prime rib dry-aged · Magret de pato",
    story:
      "Nascido da parceria entre Robert Mondavi e Baron Philippe de Rothschild, Opus One é símbolo do encontro Napa + Bordeaux.",
    score: "97/100",
  },
];

const regions: Region[] = [
  "Todos",
  "França",
  "Itália",
  "Espanha",
  "Portugal",
  "Estados Unidos",
];

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Region>("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<RareWine | null>(null);

  const filtered = useMemo(() => {
    return collection.filter((w) => {
      const byRegion = filter === "Todos" || w.region === filter;
      const q = search.trim().toLowerCase();
      const byQuery =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.appellation.toLowerCase().includes(q) ||
        w.vintage.includes(q);
      return byRegion && byQuery;
    });
  }, [filter, search]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".gal-head", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        immediateRender: false,
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-14 md:py-20"
    >
      <div className="absolute inset-0 pattern-grapes opacity-25" />
      <div className="absolute inset-0 pattern-damask opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="gal-head text-xs uppercase tracking-[0.5em] text-gold">
            Galeria de Rótulos Raros
          </p>
          <div className="gal-head mx-auto mt-6 gold-divider w-32" />
          <AnimatedTitle
            as="h2"
            className="gal-head mt-8 font-serif text-4xl leading-tight md:text-6xl"
          >
            Tesouros <span className="italic text-gradient-gold">Selecionados</span>
            <br />
            por Terroir.
          </AnimatedTitle>
          <p className="gal-head mx-auto mt-6 max-w-2xl text-base font-light text-champagne/70">
            Filtre por região, percorra o carrossel e descubra a história
            completa de cada relíquia em nosso acervo privado.
          </p>
        </div>

        {/* Filters */}
        <div className="gal-head mt-10 flex flex-col items-center gap-5 lg:mt-12 lg:flex-row lg:justify-between lg:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {regions.map((r) => {
              const active = filter === r;
              return (
                <button
                  key={r}
                  onClick={() => setFilter(r)}
                  className={`rounded-sm border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.25em] transition-all duration-300 ${
                    active
                      ? "border-gold bg-gold text-onyx shadow-gold-soft"
                      : "border-gold/25 text-champagne/70 hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>

          <label className="relative flex w-full items-center lg:w-72">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-gold/70" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar rótulo, safra..."
              className="w-full rounded-sm border border-gold/20 bg-background/40 py-2.5 pl-10 pr-4 text-sm text-champagne placeholder:text-champagne/40 focus:border-gold/60 focus:outline-none"
            />
          </label>
        </div>

        {/* Carousel */}
        <div className="relative mt-12">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Anterior"
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gold/30 bg-background/70 p-3 text-gold backdrop-blur-md transition hover:bg-gold/15 lg:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Próximo"
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gold/30 bg-background/70 p-3 text-gold backdrop-blur-md transition hover:bg-gold/15 lg:block"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((w, i) => (
                <motion.button
                  layout
                  key={w.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  onClick={() => setSelected(w)}
                  className="gal-card group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-sm border border-gold/15 bg-gradient-royal text-left shadow-card-luxury transition-all duration-500 hover:-translate-y-2 hover:border-gold/55 sm:w-[320px]"
                >
                  <div className="absolute inset-0 spotlight-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative h-[360px] overflow-hidden">
                    <Image
                      src={w.image}
                      alt={`${w.name} ${w.vintage}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 85vw, 320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-onyx/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur-md">
                      {w.rarity}
                    </span>
                    <span className="absolute right-4 top-4 rounded-full border border-gold/40 bg-onyx/70 px-3 py-1 text-[10px] font-semibold tracking-widest text-gold backdrop-blur-md">
                      {w.score}
                    </span>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-gold/40 bg-onyx/80 px-3 py-1.5 backdrop-blur-md">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-3 w-3 fill-gold text-gold"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative border-t border-gold/15 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                      Safra {w.vintage}
                    </p>
                    <h3 className="mt-2 font-serif text-xl leading-tight text-champagne">
                      {w.name}
                    </h3>
                    <p className="mt-1 text-[11px] uppercase tracking-widest text-champagne/60">
                      {w.appellation}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-gold/80">
                      {w.marketPrice}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold transition-all group-hover:gap-3">
                      Ver Ficha Completa →
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-champagne/60 md:py-14">
              <Wine className="mx-auto mb-4 h-10 w-10 text-gold/60" />
              <p className="font-serif text-2xl">Nenhum rótulo encontrado.</p>
              <p className="mt-2 text-sm">
                Ajuste os filtros para revelar outros tesouros.
              </p>
            </div>
          )}
        </div>

        {/* Mobile arrows */}
        <div className="mt-6 flex justify-center gap-3 lg:hidden">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Anterior"
            className="rounded-full border border-gold/30 bg-background/60 p-3 text-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Próximo"
            className="rounded-full border border-gold/30 bg-background/60 p-3 text-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-4xl overflow-hidden border-gold/30 bg-background p-0 sm:rounded-sm">
          {selected && (
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative h-72 overflow-hidden bg-gradient-royal lg:h-auto">
                <div className="absolute inset-0 spotlight-gold opacity-70" />
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-onyx/40" />
              </div>

              <div className="relative max-h-[85vh] overflow-y-auto p-8 lg:p-10">
                <div className="absolute inset-0 pattern-damask opacity-30" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-gold/40 bg-onyx/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">
                      {selected.rarity}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] tracking-widest text-gold">
                      <Award className="h-3 w-3" /> {selected.score}
                    </span>
                    <span className="inline-flex items-center gap-0.5" aria-label="Classificação cinco estrelas">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
                      ))}
                    </span>
                  </div>

                  <DialogTitle className="mt-5 font-serif text-3xl leading-tight text-champagne md:text-4xl">
                    {selected.name}
                  </DialogTitle>
                  <DialogDescription className="mt-2 text-[11px] uppercase tracking-[0.3em] text-champagne/60">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gold" />
                      {selected.appellation}
                    </span>
                    <span className="mx-3 text-gold/40">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gold" />
                      Safra {selected.vintage}
                    </span>
                  </DialogDescription>

                  <div className="my-6 gold-divider w-24" />

                  <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold">
                    Notas de Degustação
                  </h4>
                  <p className="mt-3 text-sm font-light leading-relaxed text-champagne/85">
                    {selected.notes}
                  </p>

                  <h4 className="mt-7 text-[11px] uppercase tracking-[0.3em] text-gold">
                    Harmonização
                  </h4>
                  <p className="mt-3 text-sm italic font-light text-champagne/75">
                    {selected.pairing}
                  </p>

                  <h4 className="mt-7 text-[11px] uppercase tracking-[0.3em] text-gold">
                    A História
                  </h4>
                  <p className="mt-3 text-sm font-light leading-relaxed text-champagne/75">
                    {selected.story}
                  </p>

                  <div className="mt-7 flex items-center justify-between rounded-sm border border-gold/20 bg-onyx/40 p-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-gold/80">
                        Disponibilidade
                      </p>
                      <p className="mt-1 font-serif text-base text-champagne">
                        {selected.bottles}
                      </p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-gold/80">
                        {selected.marketPrice}
                      </p>
                    </div>
                    <a
                      href="#confraria"
                      onClick={() => setSelected(null)}
                      className="btn-gold-glow inline-flex items-center gap-2 rounded-sm px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.25em]"
                    >
                      <Wine className="h-4 w-4" /> Consultar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}



