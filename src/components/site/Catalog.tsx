"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, Wine } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { primeAndReveal } from "@/lib/scrollReveal";
import bordeaux from "@/assets/wine-bordeaux.jpg";
import brunello from "@/assets/wine-brunello.jpg";
import burgundy from "@/assets/wine-burgundy.jpg";
import champagneImg from "@/assets/wine-champagne.jpg";

gsap.registerPlugin(ScrollTrigger);

type Wine = {
  name: string;
  region: string;
  vintage: string;
  image: StaticImageData;
  notes: string;
  pairing: string;
  marketPrice: string;
};

const wines: Wine[] = [
  {
    name: "Bordeaux Premium Reserve",
    region: "Bordeaux · França",
    vintage: "2018",
    image: bordeaux,
    notes:
      "Cassis maduro, cedro e grafite com textura sedosa. Perfil clássico bordalês de corpo médio-alto e final elegante.",
    pairing: "Cordeiro confitado · Queijos azuis envelhecidos",
    marketPrice: "US$ 55 - 140 (R$ 290 - 740)",
  },
  {
    name: "Italian Brunello Riserva",
    region: "Toscana · Itália",
    vintage: "2017",
    image: brunello,
    notes:
      "Cereja seca, ervas mediterrâneas, couro e especiarias doces. Estruturado, com acidez firme e vocação gastronômica.",
    pairing: "Bistecca alla Fiorentina · Risotto de funghi",
    marketPrice: "US$ 70 - 220 (R$ 370 - 1.160)",
  },
  {
    name: "Pinot Noir Vintage",
    region: "Borgonha · França",
    vintage: "2016",
    image: burgundy,
    notes:
      "Framboesa, cereja fresca, sous-bois e toque terroso. Pinot de corpo médio, tanino fino e final delicado.",
    pairing: "Pato selvagem · Cogumelos selvagens",
    marketPrice: "US$ 45 - 120 (R$ 240 - 635)",
  },
  {
    name: "Champagne Dom Perignon Cuvée",
    region: "Champagne · França",
    vintage: "2013",
    image: champagneImg,
    notes:
      "Brioche, frutas cítricas confitadas e amêndoas tostadas. Perlage fino, acidez vibrante e final mineral.",
    pairing: "Ostras Belon · Caviar Oscietra",
    marketPrice: "US$ 220 - 340 (R$ 1.160 - 1.790)",
  },
];

const MOBILE_MAX = 1023;
const SWIPE_PX = 42;
const AUTOPLAY_MS = 4200;

export function Catalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileResumeTimeoutRef = useRef<number | null>(null);
  const mobileAutoPausedRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState<number | null>(null);

  const wine = wines[active];

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      primeAndReveal(
        ".cat-head",
        sectionRef.current,
        { autoAlpha: 0, x: -40 },
        { autoAlpha: 1, x: 0, duration: 1.05, stagger: 0.12 },
        { trigger: sectionRef.current, start: "top 84%" },
      );
      primeAndReveal(
        ".cat-card",
        sectionRef.current,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14 },
        { trigger: ".cat-grid", start: "top 88%" },
      );
      primeAndReveal(
        ".cat-showcase-left",
        sectionRef.current,
        { autoAlpha: 0, x: -48 },
        { autoAlpha: 1, x: 0, duration: 1.05 },
        { trigger: ".cat-showcase", start: "top 88%" },
      );
      primeAndReveal(
        ".cat-showcase-right",
        sectionRef.current,
        { autoAlpha: 0, x: 48 },
        { autoAlpha: 1, x: 0, duration: 1.05, delay: 0.08 },
        { trigger: ".cat-showcase", start: "top 88%" },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const next = useCallback(() => setActive((p) => (p + 1) % wines.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + wines.length) % wines.length), []);

  const pauseMobileAutoplay = useCallback(() => {
    mobileAutoPausedRef.current = true;
    if (mobileResumeTimeoutRef.current) {
      window.clearTimeout(mobileResumeTimeoutRef.current);
    }
    mobileResumeTimeoutRef.current = window.setTimeout(() => {
      mobileAutoPausedRef.current = false;
      mobileResumeTimeoutRef.current = null;
    }, 5200);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | null = null;
    const section = sectionRef.current;
    let sectionVisible = false;
    if (section) {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      sectionVisible = r.bottom > 0 && r.top < vh * 0.94;
    }

    const clearTimer = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const startTimer = () => {
      clearTimer();
      if (!media.matches || reducedMotion.matches) return;
      timer = window.setInterval(() => {
        if (mobileAutoPausedRef.current || !sectionVisible) return;
        setActive((i) => (i + 1) % wines.length);
      }, AUTOPLAY_MS);
    };

    const onBreakpointOrMotion = () => startTimer();

    let io: IntersectionObserver | null = null;
    if (section && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          sectionVisible = entries[0]?.isIntersecting ?? false;
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
      );
      io.observe(section);
    } else {
      sectionVisible = true;
    }

    startTimer();
    media.addEventListener("change", onBreakpointOrMotion);
    reducedMotion.addEventListener("change", onBreakpointOrMotion);

    return () => {
      media.removeEventListener("change", onBreakpointOrMotion);
      reducedMotion.removeEventListener("change", onBreakpointOrMotion);
      clearTimer();
      io?.disconnect();
      if (mobileResumeTimeoutRef.current) {
        window.clearTimeout(mobileResumeTimeoutRef.current);
      }
    };
  }, []);

  const onMobileTouchStart = (e: React.TouchEvent) => {
    pauseMobileAutoplay();
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onMobileTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_PX) return;
    if (dx > 0) prev();
    else next();
  };

  return (
    <section
      id="acervo"
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-14 md:py-20"
    >
      <div className="absolute inset-0 pattern-damask opacity-25" />
      <div className="absolute inset-0 pattern-grapes opacity-25" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="cat-head text-xs uppercase tracking-[0.5em] text-gold">O Acervo Privado</p>
          <div className="cat-head mx-auto mt-6 gold-divider w-32" />
          <AnimatedTitle
            as="h2"
            className="cat-head mt-8 font-serif text-4xl leading-tight md:text-6xl"
          >
            Um <span className="italic text-gradient-gold">Museu Vivo</span>
            <br />
            em Sua Taça.
          </AnimatedTitle>
          <p className="cat-head mx-auto mt-6 max-w-xl text-base font-light text-champagne/70">
            <span className="lg:hidden">
              Deslize o palco ou use as setas — a curadoria avança sozinha enquanto você aprecia.
            </span>
            <span className="hidden lg:inline">
              Passe sobre cada rótulo para revelar suas notas de degustação.
            </span>
          </p>
        </div>

        {/* Mobile & tablet portrait: single cinematic stage (one hero image, no duplicate strip) */}
        <div className="cat-mobile-stage mt-10 space-y-4 lg:hidden">
          <div
            className="relative overflow-hidden rounded-sm border border-gold/20 bg-gradient-royal shadow-velvet"
            onTouchStart={onMobileTouchStart}
            onTouchEnd={onMobileTouchEnd}
          >
            <div className="pointer-events-none absolute inset-0 spotlight-gold opacity-70" />
            <div className="relative aspect-[3/4] max-h-[min(52vh,480px)] w-full sm:max-h-[min(56vh,520px)]">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={wine.image}
                    alt={wine.name}
                    fill
                    className="object-contain p-6 sm:p-8"
                    sizes="100vw"
                    priority={active === 0}
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/95 via-background/35 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-3 pb-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  prev();
                  pauseMobileAutoplay();
                }}
                className="rounded-full border border-gold/35 bg-background/70 p-2.5 text-gold backdrop-blur-md transition active:scale-95"
                aria-label="Rótulo anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex min-w-0 flex-1 justify-center gap-1.5 px-1">
                {wines.map((_, i) => (
                  <button
                    key={`m-dot-${i}`}
                    type="button"
                    onClick={() => {
                      setActive(i);
                      pauseMobileAutoplay();
                    }}
                    className={`h-1 shrink-0 rounded-full transition-all duration-300 ${
                      i === active ? "w-7 bg-gold" : "w-2.5 bg-gold/35"
                    }`}
                    aria-label={`Exibir ${wines[i].name}`}
                    aria-current={i === active}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  next();
                  pauseMobileAutoplay();
                }}
                className="rounded-full border border-gold/35 bg-background/70 p-2.5 text-gold backdrop-blur-md transition active:scale-95"
                aria-label="Próximo rótulo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="rounded-sm border border-gold/15 bg-card/45 px-5 py-5 backdrop-blur-sm sm:px-6"
          >
            <p className="text-[10px] uppercase tracking-[0.38em] text-gold">Safra {wine.vintage}</p>
            <h3 className="mt-2 font-serif text-2xl leading-tight tracking-wide text-champagne sm:text-3xl">
              {wine.name}
            </h3>
            <p className="mt-1.5 text-xs uppercase tracking-widest text-champagne/60">{wine.region}</p>
            <div className="my-5 gold-divider w-20" />
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-gold">Notas de Degustação</h4>
            <p className="mt-2 text-sm font-light leading-relaxed text-champagne/82">{wine.notes}</p>
            <h4 className="mt-5 text-[10px] uppercase tracking-[0.28em] text-gold">Harmonização</h4>
            <p className="mt-2 text-xs font-light italic leading-relaxed text-champagne/72">{wine.pairing}</p>
            <h4 className="mt-5 text-[10px] uppercase tracking-[0.28em] text-gold">Preço de Mercado (750ml)</h4>
            <p className="mt-2 text-xs font-light text-champagne/78">{wine.marketPrice}</p>
            <a
              href="#galeria"
              className="mt-6 btn-outline-gold inline-flex w-full items-center justify-center gap-2 rounded-sm py-3.5 text-[11px] font-medium uppercase tracking-[0.28em] sm:w-auto sm:px-7"
            >
              <Wine className="h-4 w-4 shrink-0" /> Consultar Valor
            </a>
          </motion.div>
        </div>

        {/* Desktop: split showcase + copy */}
        <div className="cat-showcase mt-12 hidden items-center gap-10 lg:mt-14 lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="cat-showcase-left image-hover-luxury relative h-[430px] overflow-hidden rounded-sm border border-gold/15 bg-gradient-royal sm:h-[470px] lg:h-[520px]">
            <div className="absolute inset-0 spotlight-gold" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={wine.image}
                  alt={wine.name}
                  fill
                  className="object-contain p-5 sm:p-7 lg:p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
              <button
                type="button"
                onClick={prev}
                className="rounded-full border border-gold/30 bg-background/60 p-3 text-gold backdrop-blur-md transition hover:bg-gold/15"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {wines.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`h-1 rounded-full transition-all ${
                      i === active ? "w-8 bg-gold" : "w-4 bg-gold/30"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="rounded-full border border-gold/30 bg-background/60 p-3 text-gold backdrop-blur-md transition hover:bg-gold/15"
                aria-label="Próximo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="cat-showcase-right"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Safra {wine.vintage}</p>
              <h3 className="mt-4 font-serif text-4xl text-champagne md:text-5xl">{wine.name}</h3>
              <p className="mt-2 text-sm uppercase tracking-widest text-champagne/60">{wine.region}</p>
              <div className="my-8 gold-divider w-24" />
              <h4 className="text-xs uppercase tracking-[0.3em] text-gold">Notas de Degustação</h4>
              <p className="mt-3 text-base font-light leading-relaxed text-champagne/80">{wine.notes}</p>
              <h4 className="mt-8 text-xs uppercase tracking-[0.3em] text-gold">Harmonização</h4>
              <p className="mt-3 text-sm font-light italic text-champagne/70">{wine.pairing}</p>
              <h4 className="mt-8 text-xs uppercase tracking-[0.3em] text-gold">Preço de Mercado (750ml)</h4>
              <p className="mt-3 text-sm font-light text-champagne/78">{wine.marketPrice}</p>
              <a
                href="#galeria"
                className="mt-10 btn-outline-gold inline-flex items-center gap-3 rounded-sm px-7 py-4 text-xs font-medium uppercase tracking-[0.3em]"
              >
                <Wine className="h-4 w-4" /> Consultar Valor
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mini grid — large screens only (same breakpoint as split showcase) */}
        <div className="cat-grid mt-14 hidden gap-6 lg:mt-16 lg:grid lg:grid-cols-4">
          {wines.map((w, i) => (
            <button
              key={w.name}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
              className="cat-card image-hover-luxury group relative h-80 overflow-hidden rounded-sm border border-gold/15 bg-gradient-royal text-left shadow-card-luxury transition-all duration-500 hover:border-gold/50 hover:-translate-y-1"
            >
              <div className="absolute inset-0 spotlight-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <AnimatePresence>
                {flipped === i ? (
                  <motion.div
                    key="back"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col justify-between p-6"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Notas</p>
                      <p className="mt-3 text-sm font-light leading-relaxed text-champagne/85">{w.notes}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.25em] text-gold">Consultar Valor →</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="front"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div className="relative flex-1 overflow-hidden">
                      <Image
                        src={w.image}
                        alt={w.name}
                        fill
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1280px) 25vw, 320px"
                      />
                    </div>
                    <div className="border-t border-gold/15 p-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{w.vintage}</p>
                      <h4 className="mt-1 font-serif text-lg leading-tight text-champagne">{w.name}</h4>
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-champagne/60">{w.region}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
