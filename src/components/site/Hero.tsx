"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { SectionDivider } from "@/components/site/SectionDivider";
import { fireflyMotionStyle } from "@/lib/fireflyMotionStyle";
import { MOBILE_PERF_MQ } from "@/lib/mobilePerf";

export function Hero() {
  const heroEase: [number, number, number, number] = [0.25, 1, 0.5, 1];
  const [canAnimate, setCanAnimate] = useState(false);
  const [mobilePerf, setMobilePerf] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_PERF_MQ);
    const syncMobile = () => setMobilePerf(mq.matches);
    syncMobile();
    mq.addEventListener("change", syncMobile);
    return () => mq.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    const delay = mobilePerf ? 0 : 100;
    let timer = 0;
    const raf = requestAnimationFrame(() => {
      timer = window.setTimeout(() => setCanAnimate(true), delay);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (timer) window.clearTimeout(timer);
    };
  }, [mobilePerf]);

  const fireflyCount = mobilePerf ? 12 : 28;
  const particles = Array.from({ length: fireflyCount });

  return (
    <section
      id="top"
      className="relative w-full overflow-x-clip overflow-y-visible bg-transparent md:min-h-screen"
    >
      {/* Background image — LCP: prioritize decode path + responsive selection */}
      <div className="absolute inset-0 [contain:layout_paint]">
        <Image
          src="/hero-background-new.png"
          alt="Adega real iluminada com luz dourada"
          fill
          priority
          fetchPriority="high"
          decoding={mobilePerf ? "async" : "sync"}
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={mobilePerf ? 74 : 78}
          className="object-cover object-center"
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
            className="hero-firefly absolute block h-1 w-1 rounded-full bg-gold/75 shadow-[0_0_6px_oklch(0.72_0.1_78_/_0.55)] will-change-transform"
            style={fireflyMotionStyle(i, 0.42)}
          />
        ))}
      </div>

      <div className="relative z-20 mx-auto flex w-full min-w-0 max-w-7xl flex-col justify-start px-4 pb-28 pt-[5.75rem] sm:px-5 md:min-h-screen md:justify-center md:px-6 md:pb-32 md:pt-28 lg:px-10 lg:pb-36 lg:pt-32">
        <motion.div
          initial={canAnimate ? { opacity: 0, x: -44 } : false}
          whileInView={canAnimate ? { opacity: 1, x: 0 } : undefined}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.05, delay: 0.1, ease: heroEase }}
          className="will-change-transform mx-auto w-full min-w-0 max-w-3xl text-center md:max-w-4xl"
        >
          <motion.div
            initial={canAnimate ? { opacity: 0, x: -26 } : false}
            whileInView={canAnimate ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.75, delay: 0.2, ease: heroEase }}
            className="mb-7 flex w-full min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-2 will-change-transform md:mb-8 md:flex-nowrap md:justify-center"
          >
            <span
              className="hidden h-px w-10 shrink-0 bg-gold sm:block md:w-12"
              aria-hidden
            />
            <span className="inline-flex max-w-full min-w-0 items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.22em] text-gold sm:text-xs sm:tracking-[0.32em] md:tracking-[0.4em]">
              <Sparkles className="h-3 w-3 shrink-0" /> Curadoria Privada · Desde 1987
            </span>
            <span
              className="hidden h-px w-10 shrink-0 bg-gold md:block md:w-12"
              aria-hidden
            />
          </motion.div>

          <AnimatedTitle
            as="h1"
            className="mx-auto max-w-[min(100%,14ch)] font-serif text-[clamp(1.85rem,10.5vw,5.5rem)] leading-[1.04] md:max-w-5xl md:leading-[1.02] md:text-center"
          >
            O Tempo Engarrafado.
            <br />
            <span className="optical-word optical-word-realeza italic text-gradient-gold">A Realeza</span>{" "}
            <span className="text-champagne">em Cada Taça.</span>
          </AnimatedTitle>

          <motion.p
            initial={canAnimate ? { opacity: 0, x: 28 } : false}
            whileInView={canAnimate ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.88, delay: 0.35, ease: heroEase }}
            className="mx-auto mt-6 max-w-xl px-0.5 will-change-transform text-[0.98rem] font-light leading-relaxed text-champagne/78 md:mt-8 md:px-0 md:text-lg md:text-center"
          >
            Uma curadoria exclusiva de rótulos raros e safras históricas. Para paladares que exigem a
            excelência absoluta e o verdadeiro sabor do terroir.
          </motion.p>

          <motion.div
            initial={canAnimate ? { opacity: 0, x: -30 } : false}
            whileInView={canAnimate ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.95, delay: 0.5, ease: heroEase }}
            className="mx-auto mt-8 flex w-full min-w-0 max-w-md will-change-transform flex-col items-stretch gap-3.5 sm:mt-10 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:items-center md:justify-center"
          >
            <a
              href="#acervo"
              className="btn-gold-glow group inline-flex w-full items-center justify-center gap-3 rounded-sm px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] sm:w-auto sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.25em]"
            >
              Explorar o Acervo Privado
              <ArrowRight className="h-4 w-4 will-change-transform transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#sommelier"
              className="btn-outline-gold inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.28em] sm:w-auto sm:px-7 sm:py-4 sm:text-xs sm:tracking-[0.3em]"
            >
              Conhecer o Mestre
            </a>
          </motion.div>

          <motion.div
            initial={canAnimate ? { opacity: 0, x: 30 } : false}
            whileInView={canAnimate ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.7, duration: 0.95, ease: heroEase }}
            className="mx-auto mt-11 grid w-full min-w-0 max-w-xl grid-cols-2 gap-x-5 gap-y-6 text-champagne/60 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-5 md:mt-16 md:max-w-3xl md:gap-x-8 lg:gap-x-10"
          >
            <div className="min-w-0 text-center">
              <p className="font-serif text-3xl text-gold">37+</p>
              <p className="text-[10px] uppercase tracking-widest">Anos de Curadoria</p>
            </div>
            <div className="hidden h-10 w-px shrink-0 self-center bg-gold/20 sm:block" aria-hidden />
            <div className="min-w-0 text-center">
              <p className="font-serif text-3xl text-gold">120</p>
              <p className="text-[10px] uppercase tracking-widest">Vinícolas Premiadas</p>
            </div>
            <div className="hidden h-10 w-px shrink-0 self-center bg-gold/20 lg:block" aria-hidden />
            <div className="col-span-2 min-w-0 text-center sm:col-span-1">
              <p className="font-serif text-3xl text-gold">∞</p>
              <p className="text-[10px] uppercase tracking-widest">Memórias Eternas</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={canAnimate ? { opacity: 0, y: 16 } : false}
        whileInView={canAnimate ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ delay: 1, duration: 0.7, ease: heroEase }}
        className="will-change-transform absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-gold/60 md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em]">Descubra</span>
          <span className="hero-scroll-cue-line block h-10 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 max-w-full translate-y-1/2">
        <SectionDivider from="background" to="imperial" />
      </div>
    </section>
  );
}
