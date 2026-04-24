"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, Wine } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import bordeaux from "@/assets/wine-bordeaux\.jpg";
import brunello from "@/assets/wine-brunello\.jpg";
import burgundy from "@/assets/wine-burgundy\.jpg";
import champagneImg from "@/assets/wine-champagne\.jpg";

gsap.registerPlugin(ScrollTrigger);

type Wine = {
  name: string;
  region: string;
  vintage: string;
  image: StaticImageData;
  notes: string;
  pairing: string;
};

const wines: Wine[] = [
  {
    name: "Château Premier Cru",
    region: "Bordeaux · França",
    vintage: "2010",
    image: bordeaux,
    notes:
      "Cassis maduro, cedro, trufa negra e tabaco fino. Taninos sedosos e final mineral que persiste por minutos.",
    pairing: "Cordeiro confitado · Queijos azuis envelhecidos",
  },
  {
    name: "Brunello di Montalcino",
    region: "Toscana · Itália",
    vintage: "2015",
    image: brunello,
    notes:
      "Cereja preta, couro italiano, alcaçuz e violetas. Estrutura imponente e elegância aristocrática.",
    pairing: "Bistecca alla Fiorentina · Risotto de funghi",
  },
  {
    name: "Domaine Grand Cru",
    region: "Borgonha · França",
    vintage: "2012",
    image: burgundy,
    notes:
      "Framboesa silvestre, terra úmida e pétalas de rosa. A definição clássica de finesse em Pinot Noir.",
    pairing: "Pato selvagem · Cogumelos selvagens",
  },
  {
    name: "Cuvée de Prestige",
    region: "Champagne · França",
    vintage: "2008",
    image: champagneImg,
    notes:
      "Brioche tostada, mel de acácia, amêndoas e cítricos confitados. Perlage finíssima e cremosidade régia.",
    pairing: "Ostras Belon · Caviar Oscietra",
  },
];

export function Catalog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".cat-head", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      });
      gsap.from(".cat-card", {
        scrollTrigger: { trigger: ".cat-grid", start: "top 80%" },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const next = () => setActive((p) => (p + 1) % wines.length);
  const prev = () => setActive((p) => (p - 1 + wines.length) % wines.length);

  return (
    <section
      id="acervo"
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent py-20 md:py-28"
    >
      <div className="absolute inset-0 pattern-damask opacity-25" />
      <div className="absolute inset-0 pattern-grapes opacity-25" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="cat-head text-xs uppercase tracking-[0.5em] text-gold">
            O Acervo Privado
          </p>
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
            Passe sobre cada rótulo para revelar suas notas de degustação.
          </p>
        </div>

        {/* Featured carousel */}
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-[520px] overflow-hidden rounded-sm border border-gold/15 bg-gradient-royal">
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
                  src={wines[active].image}
                  alt={wines[active].name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
              <button
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
                    onClick={() => setActive(i)}
                    className={`h-1 rounded-full transition-all ${
                      i === active ? "w-8 bg-gold" : "w-4 bg-gold/30"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
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
            >
              <p className="text-xs uppercase tracking-[0.4em] text-gold">
                Safra {wines[active].vintage}
              </p>
              <h3 className="mt-4 font-serif text-4xl text-champagne md:text-5xl">
                {wines[active].name}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-widest text-champagne/60">
                {wines[active].region}
              </p>
              <div className="my-8 gold-divider w-24" />
              <h4 className="text-xs uppercase tracking-[0.3em] text-gold">
                Notas de Degustação
              </h4>
              <p className="mt-3 text-base font-light leading-relaxed text-champagne/80">
                {wines[active].notes}
              </p>
              <h4 className="mt-8 text-xs uppercase tracking-[0.3em] text-gold">
                Harmonização
              </h4>
              <p className="mt-3 text-sm font-light italic text-champagne/70">
                {wines[active].pairing}
              </p>
              <a
                href="#confraria"
                className="mt-10 btn-outline-gold inline-flex items-center gap-3 rounded-sm px-7 py-4 text-xs font-medium uppercase tracking-[0.3em]"
              >
                <Wine className="h-4 w-4" /> Consultar Valor
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mini grid of all */}
        <div className="cat-grid mt-28 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wines.map((w, i) => (
            <button
              key={w.name}
              onClick={() => setActive(i)}
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
              className="cat-card group relative h-80 overflow-hidden rounded-sm border border-gold/15 bg-gradient-royal text-left shadow-card-luxury transition-all duration-500 hover:border-gold/50 hover:-translate-y-1"
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
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                        Notas
                      </p>
                      <p className="mt-3 text-sm font-light leading-relaxed text-champagne/85">
                        {w.notes}
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
                        src={w.image}
                        alt={w.name}
                        fill
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    </div>
                    <div className="border-t border-gold/15 p-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                        {w.vintage}
                      </p>
                      <h4 className="mt-1 font-serif text-lg text-champagne leading-tight">
                        {w.name}
                      </h4>
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-champagne/60">
                        {w.region}
                      </p>
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



