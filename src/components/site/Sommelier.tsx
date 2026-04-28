"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Quote } from "lucide-react";
import sommelierImg from "@/assets/sommelier\.jpg";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { primeAndReveal } from "@/lib/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

export function Sommelier() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      primeAndReveal(
        ".som-img",
        ref.current,
        { autoAlpha: 0, x: -48 },
        { autoAlpha: 1, x: 0, duration: 1.1 },
        { trigger: ref.current, start: "top 84%" },
      );
      primeAndReveal(
        ".som-text",
        ref.current,
        { autoAlpha: 0, x: 48 },
        { autoAlpha: 1, x: 0, duration: 1.1, stagger: 0.12 },
        { trigger: ref.current, start: "top 84%" },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sommelier"
      ref={ref}
      className="relative overflow-hidden bg-transparent py-14 md:py-20"
    >
      <div className="absolute inset-0 pattern-grapes opacity-25" />
      <div className="ambient-spotlight absolute right-0 top-1/4 h-[600px] w-[600px] spotlight-gold" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        {/* Image */}
        <div className="som-img relative">
          <div className="image-hover-luxury relative h-[640px] overflow-hidden rounded-sm border border-gold/20 shadow-velvet">
            <Image
              src={sommelierImg}
              alt="O Mestre Sommelier da Cave Royale"
              fill
              className="object-cover object-center grayscale-[15%] contrast-110"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={78}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>
          <div className="absolute -right-4 -bottom-4 hidden md:flex items-center gap-3 rounded-sm border border-gold/30 bg-background/90 px-5 py-3 backdrop-blur-md shadow-gold-soft">
            <Award className="h-5 w-5 text-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Court of Master Sommeliers
              </p>
              <p className="text-xs text-champagne/80">Diploma Avançado · 2003</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="som-text text-xs uppercase tracking-[0.5em] text-gold">
            O Sommelier
          </p>
          <div className="som-text mx-auto mt-6 gold-divider w-32 md:mx-0" />
          <AnimatedTitle
            as="h2"
            className="som-text mt-8 font-serif text-4xl leading-tight md:text-6xl"
          >
            A Curadoria
            <br />
            <span className="som-heading-gold-shine italic text-gradient-gold">do Mestre.</span>
          </AnimatedTitle>

          <div className="som-text mt-10 flex items-start gap-4">
            <Quote className="mt-1 h-8 w-8 shrink-0 text-gold/60" />
            <p className="text-lg font-light italic leading-relaxed text-champagne/85">
              "Eu não escolho vinhos. Eu descubro heranças. Cada rótulo que
              entra nesta adega passou por uma conversa silenciosa entre o
              vigneron, a terra e o tempo - e meu papel é apenas reconhecer
              quando essa conversa atingiu a perfeição."
            </p>
          </div>

          <p className="som-text mt-8 text-base font-light leading-relaxed text-champagne/70">
            Henrique Valverde percorreu mais de 200 vinícolas em quatro
            continentes ao longo de três décadas. Formado em Bordeaux,
            certificado pela Court of Master Sommeliers e consultor de cartas
            premiadas em Michelin, ele é a única assinatura que valida cada
            rótulo da Cave Royale.
          </p>

          <div className="som-text mt-10 grid grid-cols-3 gap-3 border-t border-gold/15 pt-8 sm:gap-5 md:gap-6">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="som-stat-gold font-serif text-3xl text-gold">30+</p>
              <p className="mt-1 max-w-[11rem] text-[10px] uppercase leading-snug tracking-widest text-champagne/60 md:max-w-none">
                Anos de ofício
              </p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="som-stat-gold font-serif text-3xl text-gold">200+</p>
              <p className="mt-1 max-w-[11rem] text-[10px] uppercase leading-snug tracking-widest text-champagne/60 md:max-w-none">
                Vinícolas visitadas
              </p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="som-stat-gold font-serif text-3xl text-gold">12</p>
              <p className="mt-1 max-w-[11rem] text-[10px] uppercase leading-snug tracking-widest text-champagne/60 md:max-w-none">
                Estrelas Michelin
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



