"use client";

import Image from "next/image";
import { Mountain, Flame, Key, MapPin, ArrowRight, Calendar } from "lucide-react";
import chaletInterior from "@/assets/chalet-interior.jpg";
import chaletExterior from "@/assets/chalet-exterior.jpg";
import chaletTable from "@/assets/chalet-table.jpg";
import { primeAndReveal } from "@/lib/scrollReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Container, PatternBackdrop, Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useCopy } from "@/i18n/LocaleProvider";

export function Chalet() {
  const t = useCopy().chalet;
  const experiences = [
    { icon: Flame, ...t.experiences[0] },
    { icon: Mountain, ...t.experiences[1] },
    { icon: Key, ...t.experiences[2] },
  ];
  const ref = useGsapReveal((root) => {
    primeAndReveal(
      ".chalet-reveal",
      root,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.12 },
      { trigger: root, start: "top 84%" },
    );
    primeAndReveal(
      ".chalet-img",
      root,
      { autoAlpha: 0, y: 52 },
      { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.14 },
      { trigger: root, start: "top 82%" },
    );
    primeAndReveal(
      ".chalet-card",
      root,
      { autoAlpha: 0, y: 44 },
      { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14 },
      { trigger: ".chalet-cards", start: "top 88%" },
    );
  });

  return (
    <Section id="chale" ref={ref}>
      <PatternBackdrop grapes={0.25} />
      <div className="ambient-spotlight absolute -left-32 top-1/3 h-[520px] w-[520px] spotlight-gold opacity-70" />
      <div className="ambient-spotlight absolute bottom-0 right-0 h-[420px] w-[420px] spotlight-gold opacity-50" />

      <Container>
        <SectionHeader
          revealClass="chalet-reveal"
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleLead}
              <br />
              <span className="italic text-gradient-gold">{t.titleGold}</span>
            </>
          }
          titleClassName="leading-[1.05] lg:text-7xl"
          descriptionClassName="mt-8 text-lg text-champagne/75 md:text-xl"
          description={
            <>
              {t.description}
              <span className="italic text-gold/90">{t.descriptionGold}</span>
            </>
          }
        />

        <div className="mt-10 grid grid-cols-12 gap-4 md:gap-6 lg:mt-12">
          <div className="chalet-img col-span-12 lg:col-span-8">
            <div className="image-hover-luxury group relative h-[420px] overflow-hidden rounded-sm border border-gold/20 shadow-velvet md:h-[540px]">
              <Image
                src={chaletInterior}
                alt={t.interiorAlt}
                fill
                className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 66vw"
                quality={78}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
                  {t.salonKicker}
                </p>
                <p className="mt-2 font-serif text-2xl text-champagne md:text-3xl">
                  {t.salonTitle}
                </p>
              </div>
            </div>
          </div>

          <div className="chalet-img col-span-12 flex flex-col gap-4 md:gap-6 lg:col-span-4">
            <div className="image-hover-luxury group relative h-[200px] overflow-hidden rounded-sm border border-gold/20 shadow-velvet md:h-[260px]">
              <Image
                src={chaletExterior}
                alt={t.exteriorAlt}
                fill
                className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 34vw"
                quality={78}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-champagne/85">
                  {t.location}
                </p>
              </div>
            </div>
            <div className="image-hover-luxury group relative h-[200px] overflow-hidden rounded-sm border border-gold/20 shadow-velvet md:h-[260px]">
              <Image
                src={chaletTable}
                alt={t.tableAlt}
                fill
                className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 34vw"
                quality={78}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                  {t.candlelight}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="chalet-reveal mx-auto mt-12 max-w-4xl rounded-sm border border-gold/20 glass-dark px-8 py-10 text-center md:px-14 md:py-14 lg:mt-14">
          <div className="mx-auto gold-divider w-24" />
          <p className="mt-6 font-serif text-2xl italic leading-relaxed text-champagne md:text-3xl">
            {t.quote}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.4em] text-gold">{t.quoteBy}</p>
        </div>

        <div className="chalet-cards mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6 lg:mt-14">
          {experiences.map((item) => (
            <div
              key={item.title}
              className="chalet-card scroll-premium-card group relative overflow-hidden rounded-sm border border-gold/15 bg-card/45 px-5 py-4 backdrop-blur-sm transition-[border-color,background-color] duration-500 will-change-transform hover:border-gold/35 md:px-6 md:py-5"
            >
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-gold/35 bg-background/55 md:h-10 md:w-10">
                <item.icon
                  className="h-4 w-4 text-gold md:h-[17px] md:w-[17px]"
                  strokeWidth={1.35}
                />
              </div>
              <h3 className="relative mt-3.5 font-serif text-lg leading-snug tracking-wide text-champagne md:mt-4 md:text-xl">
                {item.title}
              </h3>
              <div className="relative mt-2.5 gold-divider w-10 md:w-11" />
              <p className="relative mt-2.5 text-[13px] font-light leading-relaxed text-champagne/72 md:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="chalet-reveal mt-12 flex flex-col items-center justify-center gap-5 text-center lg:mt-14 lg:gap-6">
          <div className="flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold/40" />
            <Calendar className="h-4 w-4" />
            <span className="text-[11px] uppercase tracking-[0.4em]">
              {t.staysKicker}
            </span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
          <p className="max-w-xl text-sm font-light text-champagne/65">
            {t.staysText}
          </p>
          <a
            href="#confraria"
            className="btn-gold-glow inline-flex items-center gap-3 rounded-sm px-9 py-4 text-xs font-semibold uppercase tracking-[0.3em]"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </Section>
  );
}
