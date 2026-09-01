"use client";

import Image from "next/image";
import { Crown, Scroll, Grape } from "lucide-react";
import chalice from "@/assets/heritage-chalice.jpg";
import grapes from "@/assets/heritage-grapes.jpg";
import cellar from "@/assets/heritage-cellar.jpg";
import { primeAndReveal } from "@/lib/scrollReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Container, PatternBackdrop, Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useCopy } from "@/i18n/LocaleProvider";

export function Heritage() {
  const t = useCopy().heritage;
  const eras = [
    { icon: Grape, ...t.eras[0] },
    { icon: Scroll, ...t.eras[1] },
    { icon: Crown, ...t.eras[2] },
  ];
  const ref = useGsapReveal((root) => {
    primeAndReveal(
      ".heritage-line",
      root,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.12 },
      { trigger: root, start: "top 84%" },
    );
    primeAndReveal(
      ".heritage-img",
      root,
      { autoAlpha: 0, y: 52 },
      { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.14 },
      { trigger: ".heritage-mosaic", start: "top 88%" },
    );
    primeAndReveal(
      ".heritage-era",
      root,
      { autoAlpha: 0, y: 44 },
      { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14 },
      { trigger: ".heritage-timeline", start: "top 90%" },
    );
  });

  return (
    <Section id="heritage" ref={ref}>
      <PatternBackdrop damask={0.2} grapes={0.3} />
      <div className="ambient-spotlight absolute left-1/2 top-32 h-[620px] w-[620px] -translate-x-1/2 spotlight-gold opacity-75" />

      <Container>
        <SectionHeader
          revealClass="heritage-line"
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleLead}
              <br />
              <span className="optical-word optical-word-eternidades italic text-gradient-gold">
                {t.titleGold}
              </span>
            </>
          }
          titleClassName="lg:text-7xl"
          descriptionClassName="mt-10 max-w-3xl text-champagne/75 md:text-lg"
          description={t.description}
        />

        <div className="heritage-mosaic mt-12 grid gap-5 md:grid-cols-12 md:gap-6 lg:mt-14">
          <figure className="heritage-img group relative md:col-span-7 md:row-span-2">
            <div
              className="pointer-events-none absolute -inset-6 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.78 0.13 85 / 0.22) 0%, transparent 65%)",
              }}
            />
            <div className="image-hover-luxury relative overflow-hidden rounded-sm border border-gold/25 shadow-velvet">
              <Image
                src={chalice}
                alt={t.relicAlt}
                loading="lazy"
                width={1280}
                height={896}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 58vw"
                quality={78}
                className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                  {t.relicKicker}
                </p>
                <p className="mt-2 font-serif text-xl text-champagne md:text-2xl">
                  {t.relicTitle}
                </p>
              </figcaption>
            </div>
          </figure>

          <figure className="heritage-img group relative md:col-span-5">
            <div className="image-hover-luxury relative overflow-hidden rounded-sm border border-gold/25 shadow-velvet">
              <Image
                src={grapes}
                alt={t.fruitAlt}
                loading="lazy"
                width={1024}
                height={1280}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 38vw"
                quality={78}
                className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ aspectRatio: "5 / 4" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">{t.fruitKicker}</p>
                <p className="mt-1.5 font-serif text-lg text-champagne md:text-xl">
                  {t.fruitTitle}
                </p>
              </figcaption>
            </div>
          </figure>

          <figure className="heritage-img group relative md:col-span-5">
            <div className="image-hover-luxury relative overflow-hidden rounded-sm border border-gold/25 shadow-velvet">
              <Image
                src={cellar}
                alt={t.sanctuaryAlt}
                loading="lazy"
                width={1280}
                height={896}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 38vw"
                quality={78}
                className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ aspectRatio: "5 / 4" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                  {t.sanctuaryKicker}
                </p>
                <p className="mt-1.5 font-serif text-lg text-champagne md:text-xl">
                  {t.sanctuaryTitle}
                </p>
              </figcaption>
            </div>
          </figure>
        </div>

        <div className="heritage-timeline mt-14 lg:mt-16">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-gold">{t.timelineKicker}</p>
            <h3 className="mt-5 font-serif text-3xl text-champagne md:text-4xl">
              {t.timelineTitle}
            </h3>
          </div>

          <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            <div
              className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px md:block"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, oklch(0.78 0.13 85 / 0.45) 15%, oklch(0.78 0.13 85 / 0.45) 85%, transparent 100%)",
              }}
            />

            {eras.map((era) => (
              <article
                key={era.year}
                className="heritage-era group relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-background shadow-gold-soft transition-[border-color] duration-500 will-change-transform group-hover:border-gold group-hover:shadow-gold">
                  <era.icon
                    className="h-6 w-6 text-gold transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.4}
                  />
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-[0.4em] text-gold/80">
                  {era.year}
                </p>
                <h4 className="mt-3 font-serif text-2xl italic text-gradient-gold">{era.title}</h4>
                <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-champagne/70">
                  {era.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center lg:mt-16">
          <div className="mx-auto gold-divider w-24" />
          <blockquote className="mt-10 font-serif text-2xl italic leading-relaxed text-champagne md:text-3xl lg:text-4xl">
            {t.quote}
            <span className="text-gradient-gold not-italic">{t.quoteGold}</span>”
          </blockquote>
          <p className="mt-8 text-[11px] uppercase tracking-[0.45em] text-gold/70">
            {t.manifesto}
          </p>
        </div>
      </Container>
    </Section>
  );
}
