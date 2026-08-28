"use client";

import Image from "next/image";
import { Mountain, Droplets, Sun } from "lucide-react";
import wineGlassSolo from "@/assets/wine-glass-solo.jpg";
import { primeAndReveal } from "@/lib/scrollReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Container, PatternBackdrop, Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";

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
  const ref = useGsapReveal((root) => {
    primeAndReveal(
      ".philo-line",
      root,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.12 },
      { trigger: root, start: "top 84%" },
    );
    primeAndReveal(
      ".philo-glass",
      root,
      { autoAlpha: 0, x: -48 },
      { autoAlpha: 1, x: 0, duration: 1.1 },
      { trigger: root, start: "top 82%" },
    );
    primeAndReveal(
      ".philo-pillar",
      root,
      { autoAlpha: 0, y: 44 },
      { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14 },
      { trigger: ".philo-grid", start: "top 88%" },
    );
  });

  return (
    <Section id="terroir" ref={ref}>
      <PatternBackdrop damask={0.4} grapes={0.2} />
      <div className="ambient-spotlight absolute left-1/2 top-28 h-[520px] w-[520px] -translate-x-1/2 spotlight-gold opacity-68" />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="philo-glass relative lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div
                className="pointer-events-none absolute -inset-10 rounded-full opacity-70 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.78 0.13 85 / 0.25) 0%, transparent 65%)",
                }}
              />
              <div className="image-hover-luxury relative overflow-hidden rounded-sm border border-gold/25 shadow-velvet">
                <Image
                  src={wineGlassSolo}
                  alt="Taça de cristal com vinho tinto profundo iluminada por luz dourada"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  sizes="(max-width: 1024px) min(92vw, 28rem), 420px"
                  quality={78}
                  className="block h-auto w-full"
                />
                <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-gold/20" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
              </div>
              <p className="mt-5 text-center text-[11px] uppercase tracking-[0.4em] text-gold/70">
                · In Vino Veritas ·
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeader
              align="left"
              revealClass="philo-line"
              eyebrow="A Filosofia"
              title={
                <>
                  Onde o Solo
                  <br />
                  <span className="optical-word optical-word-destino italic text-gradient-gold">
                    Dita o Destino.
                  </span>
                </>
              }
              titleClassName="lg:text-7xl"
              descriptionClassName="mt-10 max-w-2xl text-champagne/75 md:text-lg"
              description="Não vendemos vinhos. Custodiamos cápsulas líquidas do tempo - meticulosamente eleitas dos vinhedos mais nobres da Borgonha, Toscana e do Vale do Douro. Cada rótulo da Cave Royale carrega o silêncio de gerações, a paciência das pedras e a ousadia de mestres vignerons que recusam atalhos."
            />
          </div>
        </div>

        <div className="philo-grid mt-12 grid gap-6 md:grid-cols-3 lg:mt-14">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="philo-pillar scroll-premium-card group relative overflow-hidden rounded-sm border border-gold/15 bg-background/40 p-10 backdrop-blur-sm transition-[border-color,background-color] duration-500 will-change-transform hover:border-gold/40 hover:bg-background/60"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <pillar.icon className="mx-auto h-9 w-9 text-gold transition-transform duration-500 group-hover:scale-110" />
              <h3 className="mt-6 text-center font-serif text-2xl text-champagne">
                {pillar.title}
              </h3>
              <p className="mt-3 text-center text-sm font-light leading-relaxed text-champagne/65">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
