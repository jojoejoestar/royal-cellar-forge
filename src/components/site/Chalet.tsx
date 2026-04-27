"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mountain, Flame, Key, MapPin, ArrowRight, Calendar } from "lucide-react";
import chaletInterior from "@/assets/chalet-interior\.jpg";
import chaletExterior from "@/assets/chalet-exterior\.jpg";
import chaletTable from "@/assets/chalet-table\.jpg";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    icon: Flame,
    title: "Lareira & Decanters",
    desc: "Noites silenciosas diante do fogo, com decanters de cristal e safras escolhidas a dedo pelo próprio anfitrião.",
  },
  {
    icon: Mountain,
    title: "Vinhedo Privativo",
    desc: "Caminhadas ao amanhecer entre as videiras que cercam o chalé - terroir vivo, intocado pelo turismo.",
  },
  {
    icon: Key,
    title: "Acesso por Convite",
    desc: "Apenas oito hóspedes por temporada. Cada estadia é desenhada como uma carta pessoal de Henrique.",
  },
];

export function Chalet() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".chalet-reveal", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        y: 42,
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.12,
      });
      gsap.from(".chalet-img", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", once: true },
        y: 56,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.14,
      });
      gsap.from(".chalet-card", {
        scrollTrigger: { trigger: ".chalet-cards", start: "top 80%", once: true },
        y: 48,
        duration: 1,
        ease: "power3.out",
        stagger: 0.14,
      });

      const premiumCards = gsap.utils.toArray<HTMLElement>("[data-scroll-premium]", ref.current);
      premiumCards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          end: "bottom 24%",
          toggleClass: { targets: card, className: "is-scroll-lit" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chale"
      ref={ref}
      className="relative overflow-hidden bg-transparent py-14 md:py-20"
    >
      {/* Floral grape backdrop + gold spotlight */}
      <div className="absolute inset-0 pattern-grapes opacity-25" />
      <div className="ambient-spotlight absolute -left-32 top-1/3 h-[520px] w-[520px] spotlight-gold opacity-70" />
      <div className="ambient-spotlight absolute right-0 bottom-0 h-[420px] w-[420px] spotlight-gold opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="chalet-reveal text-xs uppercase tracking-[0.5em] text-gold">
            Um Convite Pessoal
          </p>
          <div className="chalet-reveal mx-auto mt-6 gold-divider w-32" />
          <AnimatedTitle
            as="h2"
            className="chalet-reveal mt-8 font-serif text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
          >
            O Chalé do
            <br />
            <span className="italic text-gradient-gold">Mestre Valverde.</span>
          </AnimatedTitle>
          <p className="chalet-reveal mt-8 text-lg font-light leading-relaxed text-champagne/75 md:text-xl">
            Encravado entre vinhedos seculares, o refúgio particular de
            Henrique Valverde abre as portas - apenas algumas vezes ao ano -
            para hóspedes dispostos a viver o vinho como ele é vivido por quem
            o ama profundamente. Não é um hotel. É uma casa. <span className="italic text-gold/90">A casa dele.</span>
          </p>
        </div>

        {/* Mosaic of three images */}
        <div className="mt-10 grid grid-cols-12 gap-4 md:gap-6 lg:mt-12">
          <div className="chalet-img col-span-12 lg:col-span-8">
            <div className="image-hover-luxury group relative h-[420px] overflow-hidden rounded-sm border border-gold/20 shadow-velvet md:h-[540px]">
              <img
                src={chaletInterior.src}
                alt="Salão íntimo do chalé com lareira e adega particular"
                className="h-full w-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                loading="lazy"
                width={1536}
                height={1024}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
                  O Salão Privativo
                </p>
                <p className="mt-2 font-serif text-2xl text-champagne md:text-3xl">
                  Onde o silêncio se serve em taças.
                </p>
              </div>
            </div>
          </div>

          <div className="chalet-img col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-6">
            <div className="image-hover-luxury group relative h-[200px] overflow-hidden rounded-sm border border-gold/20 shadow-velvet md:h-[260px]">
              <img
                src={chaletExterior.src}
                alt="Fachada do chalé alpino entre vinhedos ao entardecer"
                className="h-full w-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                loading="lazy"
                width={1536}
                height={1024}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-champagne/85">
                  Vale dos Vinhedos · Reservado
                </p>
              </div>
            </div>
            <div className="image-hover-luxury group relative h-[200px] overflow-hidden rounded-sm border border-gold/20 shadow-velvet md:h-[260px]">
              <img
                src={chaletTable.src}
                alt="Mesa íntima posta com cristais e candelabros"
                className="h-full w-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                loading="lazy"
                width={1024}
                height={1280}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                  Jantar à Luz de Velas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quote band */}
        <div className="chalet-reveal mt-12 mx-auto max-w-4xl rounded-sm border border-gold/20 glass-dark px-8 py-10 text-center md:px-14 md:py-14 lg:mt-14">
          <div className="mx-auto gold-divider w-24" />
          <p className="mt-6 font-serif text-2xl italic leading-relaxed text-champagne md:text-3xl">
            "Aqui não recebo clientes. Recebo amigos do vinho. Quem cruza
            esta porta sai com mais do que memórias - sai com um pedaço da
            minha biblioteca líquida no paladar."
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold">
            - Henrique Valverde
          </p>
        </div>

        {/* Three experience pillars */}
        <div className="chalet-cards mt-12 grid gap-6 md:grid-cols-3 md:gap-8 lg:mt-14">
          {experiences.map((e) => (
            <div
              key={e.title}
              data-scroll-premium
              className="chalet-card scroll-premium-card group relative overflow-hidden rounded-sm border border-gold/15 bg-card/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold/50 hover:shadow-gold-soft hover:-translate-y-1"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/5 blur-2xl transition-opacity duration-500 group-hover:bg-gold/15" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-sm border border-gold/40 bg-background/60">
                <e.icon className="h-5 w-5 text-gold" strokeWidth={1.4} />
              </div>
              <h3 className="relative mt-6 font-serif text-2xl text-champagne">
                {e.title}
              </h3>
              <div className="relative mt-3 gold-divider w-12" />
              <p className="relative mt-4 text-sm font-light leading-relaxed text-champagne/70">
                {e.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="chalet-reveal mt-12 flex flex-col items-center justify-center gap-5 text-center lg:mt-14 lg:gap-6">
          <div className="flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold/40" />
            <Calendar className="h-4 w-4" />
            <span className="text-[11px] uppercase tracking-[0.4em]">
              Estadias por Convite · 2026
            </span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
          <p className="max-w-xl text-sm font-light text-champagne/65">
            Devido à natureza íntima do espaço, recebemos no máximo oito
            hóspedes por temporada. Solicite seu convite e nossa curadoria
            entrará em contato pessoalmente.
          </p>
          <a
            href="#confraria"
            className="btn-gold-glow inline-flex items-center gap-3 rounded-sm px-9 py-4 text-xs font-semibold uppercase tracking-[0.3em]"
          >
            Solicitar Convite ao Chalé
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}



