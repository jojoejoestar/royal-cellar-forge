"use client";

import { useLayoutEffect, useRef, useState, useMemo } from "react";
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
    id: "bordeaux-premium-2018",
    name: "Bordeaux Premium Reserve",
    region: "França",
    appellation: "Bordeaux · Blend tinto",
    vintage: "2018",
    image: bordeaux,
    rarity: "Rótulo de Curadoria",
    bottles: "Lote privado selecionado",
    marketPrice: "US$ 55 - 140 (R$ 290 - 740)",
    notes:
      "Cassis maduro, cedro e grafite, com tanino macio e final limpo.",
    pairing: "Carré de cordeiro · Entrecôte maturado",
    story:
      "Garrafa de perfil clássico bordalês, escolhida pela elegância visual e pelo estilo gastronômico versátil para adegas de assinatura.",
    score: "94/100",
  },
  {
    id: "brunello-riserva-2017",
    name: "Italian Brunello Riserva",
    region: "Itália",
    appellation: "Toscana · Brunello di Montalcino",
    vintage: "2017",
    image: brunello,
    rarity: "Rótulo de Curadoria",
    bottles: "Lote com disponibilidade reduzida",
    marketPrice: "US$ 70 - 220 (R$ 370 - 1.160)",
    notes:
      "Cereja seca, couro fino e ervas mediterrâneas com acidez longa e precisa.",
    pairing: "Bistecca alla Fiorentina · Pappardelle al ragù",
    story:
      "Representa a escola toscana de longa guarda: estrutura, concentração e elegância rústica refinada.",
    score: "95/100",
  },
  {
    id: "pinot-vintage-2016",
    name: "Pinot Noir Vintage",
    region: "França",
    appellation: "Borgonha · Pinot Noir",
    vintage: "2016",
    image: burgundy,
    rarity: "Safra de Adega",
    bottles: "Pequeno lote maturado",
    marketPrice: "US$ 45 - 120 (R$ 240 - 635)",
    notes:
      "Framboesa, cereja e terra úmida em perfil sedoso, com final delicado.",
    pairing: "Magret de pato · Cogumelos selvagens",
    story:
      "Estilo clássico de Pinot Noir com caráter de adega e assinatura aromática elegante.",
    score: "93/100",
  },
  {
    id: "champagne-dom-perignon-2013",
    name: "Champagne Dom Perignon Cuvée",
    region: "França",
    appellation: "Champagne · Brut",
    vintage: "2013",
    image: champagneImg,
    rarity: "Prestige Cuvée",
    bottles: "Alocação sazonal",
    marketPrice: "US$ 220 - 340 (R$ 1.160 - 1.790)",
    notes:
      "Brioche, cítricos confit e notas de amêndoas com mousse cremosa e vibrante.",
    pairing: "Ostras · Caviar Oscietra",
    story:
      "Rótulo de inspiração prestige, selecionado para experiências de celebração e harmonizações de alta precisão.",
    score: "96/100",
  },
  {
    id: "loire-cuvee-2019",
    name: "Loire Valley Cuvée",
    region: "França",
    appellation: "Vale do Loire · Espumante",
    vintage: "2019",
    image: loire,
    rarity: "Edição Curadoria",
    bottles: "Lote limitado",
    marketPrice: "US$ 35 - 95 (R$ 185 - 500)",
    notes:
      "Frutas brancas, flores secas e toques de pão tostado em corpo fresco e longo.",
    pairing: "Queijo de cabra · Frutos do mar",
    story:
      "Expressão do Loire em estilo espumante, com foco em frescor mineral e versatilidade gastronômica.",
    score: "92/100",
  },
  {
    id: "rioja-reserva-2014",
    name: "Rioja Reserva Antigua",
    region: "Espanha",
    appellation: "Rioja · Reserva",
    vintage: "2014",
    image: rioja,
    rarity: "Biblioteca Ibérica",
    bottles: "Lote de adega histórica",
    marketPrice: "US$ 40 - 110 (R$ 210 - 580)",
    notes:
      "Ameixa madura, baunilha e couro, com taninos redondos e final especiado.",
    pairing: "Cordeiro assado · Jamón ibérico",
    story:
      "Perfil clássico de Rioja de guarda, com madeira integrada e assinatura terrosa elegante.",
    score: "93/100",
  },
  {
    id: "douro-valley-2016",
    name: "Douro Valley Reserva",
    region: "Portugal",
    appellation: "Douro · Reserva",
    vintage: "2016",
    image: douro,
    rarity: "Seleção Atlântica",
    bottles: "Micro lote de curadoria",
    marketPrice: "US$ 45 - 130 (R$ 240 - 690)",
    notes:
      "Fruta negra concentrada, cacau e especiarias quentes, com final profundo.",
    pairing: "Queijos curados · Carnes de caça",
    story:
      "Rótulo de estilo duriense, com concentração e estrutura para serviço meditativo.",
    score: "94/100",
  },
  {
    id: "napa-cabernet-2019",
    name: "Napa Valley Cabernet Sauvignon",
    region: "Estados Unidos",
    appellation: "Napa Valley · Cabernet Sauvignon",
    vintage: "2019",
    image: napa,
    rarity: "Napa Signature",
    bottles: "Alocação concorrida",
    marketPrice: "US$ 80 - 240 (R$ 420 - 1.265)",
    notes:
      "Amora, cassis, cacau e cedro em estrutura ampla com final persistente.",
    pairing: "Prime rib dry-aged · Short rib braseada",
    story:
      "Cabernet de perfil californiano clássico: fruta intensa, concentração e acabamento polido.",
    score: "95/100",
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

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".gal-head", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        y: 42,
        opacity: 0,
        duration: 1.05,
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
                  className="gal-card image-hover-luxury group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-sm border border-gold/15 bg-gradient-royal text-left shadow-card-luxury transition-all duration-500 hover:-translate-y-2 hover:border-gold/55 sm:w-[320px]"
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



