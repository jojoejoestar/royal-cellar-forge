"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { featuredWines, type Wine } from "@/content/wines";
import { easeLuxury } from "@/lib/ease";
import { primeAndReveal } from "@/lib/scrollReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Container, PatternBackdrop, Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { WineDetails } from "@/components/site/WineDetails";

const SWIPE_PX = 42;
const AUTOPLAY_MS = 4200;
const MOBILE_MAX = 1023;

export function Catalog() {
  const mobileResumeTimeoutRef = useRef<number | null>(null);
  const mobileAutoPausedRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState<number | null>(null);
  const wine = featuredWines[active];

  const sectionRef = useGsapReveal((root) => {
    primeAndReveal(
      ".cat-head",
      root,
      { autoAlpha: 0, x: -40 },
      { autoAlpha: 1, x: 0, duration: 1.05, stagger: 0.12 },
      { trigger: root, start: "top 84%" },
    );
    primeAndReveal(
      ".cat-card",
      root,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14 },
      { trigger: ".cat-grid", start: "top 88%" },
    );
    primeAndReveal(
      ".cat-showcase-left",
      root,
      { autoAlpha: 0, x: -48 },
      { autoAlpha: 1, x: 0, duration: 1.05 },
      { trigger: ".cat-showcase", start: "top 88%" },
    );
    primeAndReveal(
      ".cat-showcase-right",
      root,
      { autoAlpha: 0, x: 48 },
      { autoAlpha: 1, x: 0, duration: 1.05, delay: 0.08 },
      { trigger: ".cat-showcase", start: "top 88%" },
    );
  });

  const next = useCallback(() => setActive((i) => (i + 1) % featuredWines.length), []);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + featuredWines.length) % featuredWines.length),
    [],
  );

  const pauseMobileAutoplay = useCallback(() => {
    mobileAutoPausedRef.current = true;
    if (mobileResumeTimeoutRef.current) window.clearTimeout(mobileResumeTimeoutRef.current);
    mobileResumeTimeoutRef.current = window.setTimeout(() => {
      mobileAutoPausedRef.current = false;
      mobileResumeTimeoutRef.current = null;
    }, 5200);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const section = sectionRef.current;
    let timer: number | null = null;
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
        setActive((i) => (i + 1) % featuredWines.length);
      }, AUTOPLAY_MS);
    };

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
    media.addEventListener("change", startTimer);
    reducedMotion.addEventListener("change", startTimer);

    return () => {
      media.removeEventListener("change", startTimer);
      reducedMotion.removeEventListener("change", startTimer);
      clearTimer();
      io?.disconnect();
      if (mobileResumeTimeoutRef.current) window.clearTimeout(mobileResumeTimeoutRef.current);
    };
  }, [sectionRef]);

  const onMobileTouchStart = (e: TouchEvent) => {
    pauseMobileAutoplay();
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onMobileTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_PX) return;
    if (dx > 0) prev();
    else next();
  };

  return (
    <Section id="acervo" ref={sectionRef}>
      <PatternBackdrop damask={0.25} grapes={0.25} />
      <Container>
        <SectionHeader
          revealClass="cat-head"
          eyebrow="O Acervo Privado"
          title={
            <>
              Um <span className="italic text-gradient-gold">Museu Vivo</span>
              <br />
              em Sua Taça.
            </>
          }
          description={
            <>
              <span className="lg:hidden">
                Deslize o palco ou use as setas — a curadoria avança sozinha enquanto você aprecia.
              </span>
              <span className="hidden lg:inline">
                Passe sobre cada rótulo para revelar suas notas de degustação.
              </span>
            </>
          }
        />

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
                  transition={{ duration: 0.35, ease: easeLuxury }}
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
                {featuredWines.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActive(i);
                      pauseMobileAutoplay();
                    }}
                    className={`h-1 w-7 shrink-0 origin-center rounded-full transition-[transform,background-color] duration-300 will-change-transform ${
                      i === active ? "scale-x-100 bg-gold" : "scale-x-[0.36] bg-gold/35"
                    }`}
                    aria-label={`Exibir ${item.name}`}
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
            transition={{ duration: 0.35, ease: easeLuxury }}
            className="rounded-sm border border-gold/15 bg-card/45 px-5 py-5 backdrop-blur-sm sm:px-6"
          >
            <WineDetails wine={wine} compact />
          </motion.div>
        </div>

        <DesktopShowcase active={active} wine={wine} next={next} prev={prev} onSelect={setActive} />

        <div className="cat-grid mt-14 hidden gap-6 lg:mt-16 lg:grid lg:grid-cols-4">
          {featuredWines.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
              className="cat-card image-hover-luxury group relative h-80 overflow-hidden rounded-sm border border-gold/15 bg-gradient-royal text-left shadow-card-luxury transition-[transform,border-color] duration-500 will-change-transform hover:border-gold/50 hover:-translate-y-1"
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
                      <p className="mt-3 text-sm font-light leading-relaxed text-champagne/85">
                        {item.notes}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.25em] text-gold">
                      Consultar Valor →
                    </span>
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
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1280px) 25vw, 320px"
                      />
                    </div>
                    <div className="border-t border-gold/15 p-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                        {item.vintage}
                      </p>
                      <h4 className="mt-1 font-serif text-lg leading-tight text-champagne">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-champagne/60">
                        {item.appellation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function DesktopShowcase({
  active,
  wine,
  next,
  prev,
  onSelect,
}: {
  active: number;
  wine: Wine;
  next: () => void;
  prev: () => void;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="cat-showcase mt-12 hidden items-center gap-10 lg:mt-14 lg:grid lg:grid-cols-2 lg:gap-12">
      <div className="cat-showcase-left image-hover-luxury relative h-[430px] overflow-hidden rounded-sm border border-gold/15 bg-gradient-royal sm:h-[470px] lg:h-[520px]">
        <div className="absolute inset-0 spotlight-gold" />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: easeLuxury }}
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
            {featuredWines.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(i)}
                className={`h-1 w-8 origin-center rounded-full transition-[transform,background-color] duration-300 will-change-transform ${
                  i === active ? "scale-x-100 bg-gold" : "scale-x-50 bg-gold/30"
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
          <WineDetails wine={wine} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
