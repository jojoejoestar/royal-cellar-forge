"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mountain, Droplets, Sun } from "lucide-react";
import wineGlassSolo from "@/assets/wine-glass-solo.webp";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Mountain,
    title: "Solo",
    text: "Cada terroir guarda séculos de minerais que dialogam com a videira.",
  },
  {
    icon: Sun,
    title: "Clima",
    text: "Estações que esculpem caráter, taninos e a alma de cada safra.",
  },
  {
    icon: Droplets,
    title: "Mãos",
    text: "Vignerons que tratam a uva como se fosse herança da família.",
  },
];

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".philo-line", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15,
      });
      gsap.from(".philo-glass", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        x: -60,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });
      gsap.from(".philo-pillar", {
        scrollTrigger: { trigger: ".philo-grid", start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.18,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="terroir"
      ref={ref}
      className="relative overflow-hidden bg-gradient-scarlet py-20 md:py-28"
    >
      <div className="absolute inset-0 pattern-damask opacity-40" />
      <div className="absolute inset-0 pattern-grapes opacity-30" />
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 spotlight-gold" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Two-column hero: glass + manifesto */}
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Glass image — left */}
          <div className="philo-glass relative lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Outer gold halo */}
              <div className="pointer-events-none absolute -inset-10 rounded-full opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.78 0.13 85 / 0.25) 0%, transparent 65%)",
                }}
              />
              {/* Frame */}
              <div className="relative overflow-hidden rounded-sm border border-gold/25 shadow-velvet">
                <img
                  src={wineGlassSolo.src}
                  alt="Taça de cristal com vinho tinto profundo iluminada por luz dourada"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="block h-auto w-full"
                />
                {/* Inner gold gradient frame */}
                <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-gold/20" />
                {/* Top shimmer line */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                {/* Bottom shimmer line */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
              </div>
              {/* Caption */}
              <p className="mt-5 text-center text-[11px] uppercase tracking-[0.4em] text-gold/70">
                · In Vino Veritas ·
              </p>
            </div>
          </div>

          {/* Manifesto — right */}
          <div className="lg:col-span-7">
            <p className="philo-line text-xs uppercase tracking-[0.5em] text-gold">
              A Filosofia
            </p>
            <div className="philo-line mt-6 gold-divider w-32" />

            <h2 className="philo-line mt-8 font-serif text-4xl leading-tight text-champagne md:text-6xl lg:text-7xl">
              Onde o Solo
              <br />
              <span className="optical-word optical-word-destino italic text-gradient-gold">
                Dita o Destino.
              </span>
            </h2>

            <p className="philo-line mt-10 max-w-2xl text-base font-light leading-relaxed text-champagne/75 md:text-lg">
              Não vendemos vinhos. Custodiamos cápsulas líquidas do tempo —
              meticulosamente eleitas dos vinhedos mais nobres da Borgonha,
              Toscana e do Vale do Douro. Cada rótulo da Cave Royale carrega o
              silêncio de gerações, a paciência das pedras e a ousadia de
              mestres vignerons que recusam atalhos.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="philo-grid mt-24 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="philo-pillar group relative overflow-hidden rounded-sm border border-gold/15 bg-background/40 p-10 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:bg-background/60"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p.icon className="mx-auto h-9 w-9 text-gold transition-transform duration-500 group-hover:scale-110" />
              <h3 className="mt-6 font-serif text-2xl text-champagne text-center">
                {p.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-champagne/65 text-center">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



