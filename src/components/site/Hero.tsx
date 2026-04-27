"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-cellar.jpg";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { fireflyMotionStyle } from "@/lib/fireflyMotionStyle";

const particles = Array.from({ length: 28 });

export function Hero() {
  const heroEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

  return (
    <section id="top" className="relative w-full overflow-hidden bg-transparent md:min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg.src}
          alt="Adega real iluminada com luz dourada"
          className="h-full w-full object-cover object-center"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 pattern-damask opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-background/82 to-background" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/70 to-transparent blur-xl" />
      </div>

      {/* Floating gold particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((_, i) => (
          <span
            key={i}
            className="hero-firefly absolute block h-1 w-1 rounded-full bg-gold/75 shadow-[0_0_6px_oklch(0.72_0.1_78_/_0.55)]"
            style={fireflyMotionStyle(i, 0.42)}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col justify-start px-4 pb-12 pt-24 sm:px-5 md:min-h-screen md:justify-center md:px-6 md:pb-16 md:pt-28 lg:px-10 lg:pb-20 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, x: -44 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.05, delay: 0.1, ease: heroEase }}
          className="mx-auto max-w-3xl text-center md:mx-0 md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.75, delay: 0.2, ease: heroEase }}
            className="mb-7 flex items-center justify-center gap-3 md:mb-8 md:justify-start"
          >
            <span className="h-px w-10 bg-gold md:w-12" />
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gold sm:text-xs sm:tracking-[0.4em]">
              <Sparkles className="h-3 w-3" /> Curadoria Privada · Desde 1987
            </span>
          </motion.div>

          <AnimatedTitle
            as="h1"
            className="mx-auto max-w-[14ch] font-serif text-[clamp(1.95rem,11.3vw,5.5rem)] leading-[1.03] md:mx-0 md:max-w-none md:leading-[1.02]"
          >
            O Tempo Engarrafado.
            <br />
            <span className="optical-word optical-word-realeza italic text-gradient-gold">
              A Realeza
            </span>{" "}
            <span className="text-champagne">em Cada Taça.</span>
          </AnimatedTitle>

          <motion.p
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.88, delay: 0.35, ease: heroEase }}
            className="mx-auto mt-6 max-w-xl text-[0.98rem] font-light leading-relaxed text-champagne/78 md:mx-0 md:mt-8 md:text-lg"
          >
            Uma curadoria exclusiva de rótulos raros e safras históricas. Para paladares que exigem
            a excelência absoluta e o verdadeiro sabor do terroir.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.95, delay: 0.5, ease: heroEase }}
            className="mx-auto mt-8 flex w-full max-w-md flex-col items-center gap-3.5 sm:mt-10 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-4 md:mx-0 md:items-start"
          >
            <a
              href="#acervo"
              className="btn-gold-glow group inline-flex w-full items-center justify-center gap-3 rounded-sm px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] sm:w-auto sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.25em]"
            >
              Explorar o Acervo Privado
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#sommelier"
              className="btn-outline-gold inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.28em] sm:w-auto sm:px-7 sm:py-4 sm:text-xs sm:tracking-[0.3em]"
            >
              Conhecer o Mestre
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.7, duration: 0.95, ease: heroEase }}
            className="mx-auto mt-11 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-5 text-champagne/60 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 md:mx-0 md:mt-16 md:flex-nowrap md:gap-10"
          >
            <div className="text-center sm:text-left">
              <p className="font-serif text-3xl text-gold">37+</p>
              <p className="text-[10px] uppercase tracking-widest">Anos de Curadoria</p>
            </div>
            <div className="hidden h-10 w-px bg-gold/20 sm:block" />
            <div className="text-center sm:text-left">
              <p className="font-serif text-3xl text-gold">120</p>
              <p className="text-[10px] uppercase tracking-widest">Vinícolas Premiadas</p>
            </div>
            <div className="hidden h-10 w-px bg-gold/20 lg:block" />
            <div className="col-span-2 text-center sm:col-span-1 sm:text-left">
              <p className="font-serif text-3xl text-gold">∞</p>
              <p className="text-[10px] uppercase tracking-widest">Memórias Eternas</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ delay: 1, duration: 0.7, ease: heroEase }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-gold/60 md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em]">Descubra</span>
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
