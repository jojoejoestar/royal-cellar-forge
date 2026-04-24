"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-cellar\.jpg";

const particles = Array.from({ length: 28 });

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-transparent"
    >
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
      </div>

      {/* Floating gold particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 rounded-full bg-gold/60 animate-float-particle"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 0.7}s`,
              animationDuration: `${5 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-12 bg-gold" />
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-gold">
              <Sparkles className="h-3 w-3" /> Curadoria Privada · Desde 1987
            </span>
          </div>

          <h1 className="font-serif text-5xl leading-[1.05] text-champagne sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            O Tempo Engarrafado.
            <br />
            <span className="optical-word optical-word-realeza italic text-gradient-gold">
              A Realeza
            </span>{" "}
            <span className="text-champagne">em Cada Taça.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-champagne/75 md:text-lg"
          >
            Uma curadoria exclusiva de rótulos raros e safras históricas. Para
            paladares que exigem a excelência absoluta e o verdadeiro sabor do
            terroir.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#acervo"
              className="btn-gold-glow group inline-flex items-center gap-3 rounded-sm px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em]"
            >
              Explorar o Acervo Privado
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#sommelier"
              className="btn-outline-gold inline-flex items-center gap-2 rounded-sm px-7 py-4 text-xs font-medium uppercase tracking-[0.3em]"
            >
              Conhecer o Mestre
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 flex items-center gap-10 text-champagne/60"
          >
            <div>
              <p className="font-serif text-3xl text-gold">37+</p>
              <p className="text-[10px] uppercase tracking-widest">
                Anos de Curadoria
              </p>
            </div>
            <div className="h-10 w-px bg-gold/20" />
            <div>
              <p className="font-serif text-3xl text-gold">120</p>
              <p className="text-[10px] uppercase tracking-widest">
                Vinícolas Premiadas
              </p>
            </div>
            <div className="hidden h-10 w-px bg-gold/20 sm:block" />
            <div className="hidden sm:block">
              <p className="font-serif text-3xl text-gold">∞</p>
              <p className="text-[10px] uppercase tracking-widest">
                Memórias Eternas
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em]">Descubra</span>
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}



