"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Wine as WineIcon,
  Award,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { wines, wineRegions, type Wine, type WineRegion } from "@/content/wines";
import { primeAndReveal } from "@/lib/scrollReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Container, PatternBackdrop, Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";

type RegionFilter = "Todos" | WineRegion;

export function Gallery() {
  const [filter, setFilter] = useState<RegionFilter>("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Wine | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const sectionRef = useGsapReveal((root) => {
    primeAndReveal(
      ".gal-head",
      root,
      { autoAlpha: 0, x: -40 },
      { autoAlpha: 1, x: 0, duration: 1.05, stagger: 0.12 },
      { trigger: root, start: "top 84%" },
    );
    primeAndReveal(
      ".gal-track",
      root,
      { autoAlpha: 0, x: 44 },
      { autoAlpha: 1, x: 0, duration: 1.1 },
      { trigger: ".gal-track-wrap", start: "top 88%" },
    );
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return wines.filter((wine) => {
      const byRegion = filter === "Todos" || wine.region === filter;
      const byQuery =
        !q ||
        wine.name.toLowerCase().includes(q) ||
        wine.appellation.toLowerCase().includes(q) ||
        wine.vintage.includes(q);
      return byRegion && byQuery;
    });
  }, [filter, search]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <Section id="galeria" ref={sectionRef}>
      <PatternBackdrop damask={0.2} grapes={0.25} />
      <Container>
        <SectionHeader
          revealClass="gal-head"
          eyebrow="Galeria de Rótulos Raros"
          title={
            <>
              Tesouros <span className="italic text-gradient-gold">Selecionados</span>
              <br />
              por Terroir.
            </>
          }
          description="Filtre por região, percorra o carrossel e descubra a história completa de cada relíquia em nosso acervo privado."
        />

        <div className="gal-head mt-10 flex flex-col items-center gap-5 lg:mt-12 lg:flex-row lg:justify-between lg:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {wineRegions.map((region) => {
              const active = filter === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setFilter(region)}
                  className={`rounded-sm border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.25em] transition-[border-color,background-color,color,opacity] duration-300 ${
                    active
                      ? "border-gold bg-gold text-onyx shadow-gold-soft"
                      : "border-gold/25 text-champagne/70 hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  {region}
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

        <div className="gal-track-wrap relative mt-12">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Anterior"
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gold/30 bg-background/70 p-3 text-gold backdrop-blur-md transition hover:bg-gold/15 lg:block"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Próximo"
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-gold/30 bg-background/70 p-3 text-gold backdrop-blur-md transition hover:bg-gold/15 lg:block"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            className="gal-track flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((wine, i) => (
                <motion.button
                  layout
                  key={wine.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  onClick={() => setSelected((prev) => (prev?.id === wine.id ? null : wine))}
                  className="gal-card image-hover-luxury group relative flex h-[570px] w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-gold/20 bg-onyx/95 text-left shadow-card-luxury transition-[transform,border-color] duration-500 will-change-transform hover:border-gold/55 sm:w-[320px]"
                >
                  <div className="absolute inset-0 spotlight-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 flex items-center justify-between border-b border-gold/15 bg-onyx px-4 py-3">
                    <span className="rounded-full border border-gold/40 bg-onyx px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">
                      {wine.rarity}
                    </span>
                    <span className="rounded-full border border-gold/40 bg-onyx px-3 py-1 text-[10px] font-semibold tracking-widest text-gold">
                      {wine.score}
                    </span>
                  </div>

                  <div className="relative h-[320px] overflow-hidden bg-onyx p-4">
                    <div className="relative h-full w-full overflow-hidden rounded-sm border border-gold/15 bg-black/90">
                      <Image
                        src={wine.image}
                        alt={`${wine.name} ${wine.vintage}`}
                        fill
                        className="object-cover scale-[1.12] transition-transform duration-700 group-hover:scale-[1.17]"
                        style={{ objectPosition: `50% ${wine.focusY ?? 66}%` }}
                        sizes="(max-width: 640px) 85vw, 320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/22 to-transparent" />
                    </div>
                    <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-gold/40 bg-onyx/85 px-3 py-1.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-3 w-3 fill-gold text-gold"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative flex min-h-0 flex-1 flex-col border-t border-gold/15 bg-onyx/95 p-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                      Safra {wine.vintage}
                    </p>
                    <h3 className="mt-2 line-clamp-2 min-h-[4.25rem] font-serif text-xl leading-tight text-champagne">
                      {wine.name}
                    </h3>
                    <p className="mt-1 line-clamp-1 min-h-[1rem] text-[11px] uppercase tracking-widest text-champagne/60">
                      {wine.appellation}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-gold/80">
                      {wine.marketPrice}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[11px] uppercase tracking-[0.25em] text-gold transition-transform duration-300 will-change-transform group-hover:translate-x-1">
                      Ver Ficha Completa →
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-champagne/60 md:py-14">
              <WineIcon className="mx-auto mb-4 h-10 w-10 text-gold/60" />
              <p className="font-serif text-2xl">Nenhum rótulo encontrado.</p>
              <p className="mt-2 text-sm">Ajuste os filtros para revelar outros tesouros.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Anterior"
            className="rounded-full border border-gold/30 bg-background/60 p-3 text-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Próximo"
            className="rounded-full border border-gold/30 bg-background/60 p-3 text-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>

      <WineDialog wine={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}

function WineDialog({ wine, onClose }: { wine: Wine | null; onClose: () => void }) {
  return (
    <Dialog open={!!wine} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="left-1/2 top-1/2 grid h-auto max-h-[92dvh] w-[96vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden border-gold/30 bg-background p-0 sm:rounded-sm">
        {wine && (
          <div className="grid max-h-[92dvh] gap-0 lg:grid-cols-2">
            <div className="relative h-56 overflow-hidden bg-gradient-royal sm:h-64 lg:h-auto">
              <div className="absolute inset-0 spotlight-gold opacity-70" />
              <Image
                src={wine.image}
                alt={wine.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-onyx/40" />
            </div>

            <div className="relative flex max-h-[calc(92dvh-14rem)] flex-col overflow-y-auto p-4 sm:max-h-[calc(92dvh-16rem)] sm:p-5 md:p-7 lg:max-h-[92dvh] lg:p-8">
              <div className="absolute inset-0 pattern-damask opacity-30" />
              <div className="relative pb-3 sm:pb-4 lg:pb-0">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-gold/40 bg-onyx/70 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">
                    {wine.rarity}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] tracking-widest text-gold">
                    <Award className="h-3 w-3" /> {wine.score}
                  </span>
                  <span
                    className="inline-flex items-center gap-0.5"
                    aria-label="Classificação cinco estrelas"
                  >
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-3.5 w-3.5 fill-gold text-gold"
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                </div>

                <DialogTitle className="mt-3 font-serif text-2xl leading-tight text-champagne sm:mt-4 sm:text-3xl md:text-4xl">
                  {wine.name}
                </DialogTitle>
                <DialogDescription className="mt-2 text-[11px] uppercase tracking-[0.3em] text-champagne/60">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-gold" />
                    {wine.appellation}
                  </span>
                  <span className="mx-3 text-gold/40">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-gold" />
                    Safra {wine.vintage}
                  </span>
                </DialogDescription>

                <div className="my-4 gold-divider w-20 sm:my-5 sm:w-24" />

                <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold">
                  Notas de Degustação
                </h4>
                <p className="mt-2 text-sm font-light leading-relaxed text-champagne/85">
                  {wine.notes}
                </p>

                <h4 className="mt-5 text-[11px] uppercase tracking-[0.3em] text-gold">
                  Harmonização
                </h4>
                <p className="mt-2 text-sm italic font-light text-champagne/75">{wine.pairing}</p>

                <h4 className="mt-5 text-[11px] uppercase tracking-[0.3em] text-gold">
                  A História
                </h4>
                <p className="mt-2 text-sm font-light leading-relaxed text-champagne/75">
                  {wine.story}
                </p>

                <div className="mt-5 rounded-sm border border-gold/20 bg-onyx/40 p-4 sm:mt-6">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-gold/80">
                    Disponibilidade
                  </p>
                  <p className="mt-1 font-serif text-base text-champagne">{wine.bottles}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-gold/80">
                    {wine.marketPrice}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-sm border border-gold/30 bg-background/70 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold transition-colors hover:bg-gold/12 lg:hidden"
                >
                  Fechar ficha
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
