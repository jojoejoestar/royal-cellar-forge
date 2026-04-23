"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, Wine, Award, Calendar, MapPin, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import bordeaux from "@/assets/wine-bordeaux.jpg";
import brunello from "@/assets/wine-brunello.jpg";
import burgundy from "@/assets/wine-burgundy.jpg";
import champagneImg from "@/assets/wine-champagne.jpg";
import loire from "@/assets/wine-loire.jpg";
import rioja from "@/assets/wine-rioja.jpg";
import douro from "@/assets/wine-douro.jpg";
import napa from "@/assets/wine-napa.jpg";

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
  image: string | { src: string };
  rarity: string;
  bottles: string;
  notes: string;
  pairing: string;
  story: string;
  score: string;
};

const resolveImgSrc = (image: RareWine["image"]) =>
  typeof image === "string" ? image : image.src;

const collection: RareWine[] = [
  {
    id: "bordeaux-2010",
    name: "Château Premier Cru",
    region: "França",
    appellation: "Bordeaux · Pauillac",
    vintage: "2010",
    image: bordeaux,
    rarity: "Edição Limitada",
    bottles: "412 garrafas no mundo",
    notes:
      "Cassis maduro, cedro, trufa negra e tabaco fino. Taninos sedosos e final mineral que persiste por minutos infinitos.",
    pairing: "Cordeiro confitado · Queijos azuis envelhecidos",
    story:
      "Engarrafado em uma das safras mais aclamadas do século XXI em Bordeaux, este rótulo descansou em barricas de carvalho francês por 22 meses antes de adormecer 14 anos em nossa adega subterrânea.",
    score: "100/100",
  },
  {
    id: "brunello-2015",
    name: "Brunello di Montalcino",
    region: "Itália",
    appellation: "Toscana · Montalcino",
    vintage: "2015",
    image: brunello,
    rarity: "Reserva Histórica",
    bottles: "780 garrafas",
    notes:
      "Cereja preta, couro italiano, alcaçuz e violetas. Estrutura imponente e elegância aristocrática que evolui na taça.",
    pairing: "Bistecca alla Fiorentina · Risotto de funghi porcini",
    story:
      "Sangiovese Grosso de cepas centenárias plantadas nos solos calcários da colina sagrada de Montalcino. Apenas safras excepcionais merecem a denominação Brunello.",
    score: "98/100",
  },
  {
    id: "burgundy-2012",
    name: "Domaine Grand Cru",
    region: "França",
    appellation: "Borgonha · Côte de Nuits",
    vintage: "2012",
    image: burgundy,
    rarity: "Coleção Privada",
    bottles: "240 garrafas",
    notes:
      "Framboesa silvestre, terra úmida e pétalas de rosa. A definição clássica de finesse em Pinot Noir borgonhês.",
    pairing: "Pato selvagem ao molho de cassis · Cogumelos selvagens",
    story:
      "Pinot Noir de uma parcela de 0,4 hectares trabalhada manualmente há sete gerações. O terroir mais cobiçado da França condensado em líquido.",
    score: "99/100",
  },
  {
    id: "champagne-2008",
    name: "Cuvée de Prestige",
    region: "França",
    appellation: "Champagne · Côte des Blancs",
    vintage: "2008",
    image: champagneImg,
    rarity: "Millésime Excepcional",
    bottles: "1.200 garrafas",
    notes:
      "Brioche tostada, mel de acácia, amêndoas e cítricos confitados. Perlage finíssima e cremosidade régia.",
    pairing: "Ostras Belon · Caviar Oscietra · Carpaccio de vieira",
    story:
      "Apenas safras com energia solar e acidez impecável recebem o título Millésime. 2008 entrou para a história como uma das três maiores em meio século.",
    score: "97/100",
  },
  {
    id: "loire-2014",
    name: "Cuvée Royale Loire",
    region: "França",
    appellation: "Vale do Loire · Vouvray",
    vintage: "2014",
    image: loire,
    rarity: "Edição Numerada",
    bottles: "560 garrafas",
    notes:
      "Marmelo, mel silvestre, sílex molhado e camomila. Acidez vibrante sustenta uma textura sedosa de ouro líquido.",
    pairing: "Foie gras de Estrasburgo · Queijo de cabra Sainte-Maure",
    story:
      "Chenin Blanc de vinhas plantadas sobre o tuffeau, a pedra calcária branca dos castelos do Loire. Vinificação ancestral em barricas centenárias.",
    score: "96/100",
  },
  {
    id: "rioja-2004",
    name: "Gran Reserva Castillo",
    region: "Espanha",
    appellation: "Rioja · Alavesa",
    vintage: "2004",
    image: rioja,
    rarity: "Joia da Adega",
    bottles: "180 garrafas",
    notes:
      "Ameixa preta, baunilha mexicana, tabaco cubano e couro de Córdoba. Tempranillo no auge absoluto de sua maturidade.",
    pairing: "Cochinillo asado · Jamón ibérico de bellota",
    story:
      "Vinificado em uma das três safras mais lendárias da Rioja moderna. Repousou cinco anos em barricas de carvalho americano e mais dez em garrafa.",
    score: "98/100",
  },
  {
    id: "douro-2003",
    name: "Vintage Port Royal",
    region: "Portugal",
    appellation: "Douro · Pinhão",
    vintage: "2003",
    image: douro,
    rarity: "Declaração de Vintage",
    bottles: "320 garrafas",
    notes:
      "Frutas negras compotadas, chocolate amargo, especiarias do Oriente e final infinito de cacau. Néctar puro.",
    pairing: "Queijo Stilton · Sobremesas de chocolate 80% · Charutos cubanos",
    story:
      "Apenas três a quatro safras por década recebem a Declaração de Vintage. As uvas foram pisadas em lagares de granito por gerações de famílias do Douro.",
    score: "99/100",
  },
  {
    id: "napa-2013",
    name: "Cabernet Reserva Onyx",
    region: "Estados Unidos",
    appellation: "Napa Valley · Oakville",
    vintage: "2013",
    image: napa,
    rarity: "Cult Wine",
    bottles: "96 garrafas",
    notes:
      "Cassis confitado, mocha, grafite e baunilha tostada. Potência californiana com elegância europeia.",
    pairing: "Costela Wagyu A5 · Magret de pato com molho de figo",
    story:
      "Produzido em quantidades minúsculas por um dos mais lendários enólogos do Vale de Napa. Lista de espera de cinco anos para entrar no clube de alocação.",
    score: "100/100",
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
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
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
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      <div className="absolute inset-0 pattern-grapes opacity-25" />
      <div className="absolute inset-0 pattern-damask opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="gal-head text-xs uppercase tracking-[0.5em] text-gold">
            Galeria de Rótulos Raros
          </p>
          <div className="gal-head mx-auto mt-6 gold-divider w-32" />
          <h2 className="gal-head mt-8 font-serif text-4xl leading-tight text-champagne md:text-6xl">
            Tesouros <span className="italic text-gradient-gold">Selecionados</span>
            <br />
            por Terroir.
          </h2>
          <p className="gal-head mx-auto mt-6 max-w-2xl text-base font-light text-champagne/70">
            Filtre por região, percorra o carrossel e descubra a história
            completa de cada relíquia em nosso acervo privado.
          </p>
        </div>

        {/* Filters */}
        <div className="gal-head mt-16 flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
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
                  className="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-sm border border-gold/15 bg-gradient-royal text-left shadow-card-luxury transition-all duration-500 hover:-translate-y-2 hover:border-gold/55 sm:w-[320px]"
                >
                  <div className="absolute inset-0 spotlight-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative h-[360px] overflow-hidden">
                    <img
                      src={resolveImgSrc(w.image)}
                      alt={`${w.name} ${w.vintage}`}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold transition-all group-hover:gap-3">
                      Ver Ficha Completa →
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-champagne/60">
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
                <img
                  src={resolveImgSrc(selected.image)}
                  alt={selected.name}
                  className="relative h-full w-full object-cover"
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


