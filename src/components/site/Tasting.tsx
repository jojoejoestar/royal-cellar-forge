"use client";

import Image from "next/image";
import { Eye, Wind, Wine, Gem } from "lucide-react";
import pour from "@/assets/tasting-pour.jpg";
import swirl from "@/assets/tasting-swirl.jpg";
import nose from "@/assets/tasting-nose.jpg";
import { primeAndReveal } from "@/lib/scrollReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Container, PatternBackdrop, Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useCopy } from "@/i18n/LocaleProvider";

const STEP_ICONS = [Eye, Wind, Wine, Gem] as const;

export function Tasting() {
  const t = useCopy().tasting;
  const steps = t.steps.map((step, i) => ({
    ...step,
    icon: STEP_ICONS[i] ?? Eye,
  }));
  const sectionRef = useGsapReveal((root) => {
    primeAndReveal(
      ".tast-head",
      root,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.12 },
      { trigger: root, start: "top 84%" },
    );
    primeAndReveal(
      ".tast-hero",
      root,
      { autoAlpha: 0, y: 52 },
      { autoAlpha: 1, y: 0, duration: 1.1 },
      { trigger: ".tast-mosaic", start: "top 88%" },
    );
    primeAndReveal(
      ".tast-side",
      root,
      { autoAlpha: 0, y: 52 },
      { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.14 },
      { trigger: ".tast-mosaic", start: "top 88%" },
    );
    primeAndReveal(
      ".tast-step",
      root,
      { autoAlpha: 0, y: 44 },
      { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14 },
      { trigger: ".tast-grid", start: "top 88%" },
    );
  });

  return (
    <Section id="degustacao" ref={sectionRef}>
      <PatternBackdrop damask={0.2} grapes={0.16} />
      <Container>
        <SectionHeader
          revealClass="tast-head"
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleLead}
              <span className="optical-word optical-word-comunhao italic text-gradient-gold">
                {t.titleGold}
              </span>
              {t.titleRest}
            </>
          }
          descriptionClassName="text-champagne/75"
          description={t.description}
        />

        <div className="tast-mosaic mt-10 grid gap-5 lg:mt-12 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
          <figure className="tast-hero image-hover-luxury relative col-span-12 overflow-hidden rounded-sm border border-gold/25 bg-gradient-royal lg:col-span-7 lg:row-span-2">
            <div className="pointer-events-none absolute -inset-1 bg-gradient-gold opacity-30 blur-3xl" />
            <div className="relative leading-none">
              <Image
                src={pour}
                alt={t.pourAlt}
                loading="lazy"
                width={1280}
                height={1600}
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={78}
                className="block aspect-[4/5] w-full object-cover lg:aspect-auto lg:h-[640px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/95 via-onyx/30 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{t.sacredAct}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-champagne md:text-4xl">
                  {t.decanterTitle}
                </h3>
                <p className="mt-3 max-w-md text-sm font-light text-champagne/80">
                  {t.decanterText}
                </p>
              </figcaption>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
            </div>
          </figure>

          <figure className="tast-side image-hover-luxury relative col-span-12 overflow-hidden rounded-sm border border-gold/25 bg-gradient-royal sm:col-span-6 lg:col-span-5">
            <Image
              src={swirl}
              alt={t.swirlAlt}
              loading="lazy"
              width={1280}
              height={1280}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
              quality={78}
              className="block h-72 w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-[308px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{t.movement}</p>
              <h4 className="mt-2 font-serif text-2xl text-champagne">{t.tearsTitle}</h4>
            </figcaption>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </figure>

          <figure className="tast-side image-hover-luxury relative col-span-12 overflow-hidden rounded-sm border border-gold/25 bg-gradient-royal sm:col-span-6 lg:col-span-5">
            <Image
              src={nose}
              alt={t.noseAlt}
              loading="lazy"
              width={1280}
              height={1280}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
              quality={78}
              className="block h-72 w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-[308px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{t.communion}</p>
              <h4 className="mt-2 font-serif text-2xl text-champagne">{t.memoriesTitle}</h4>
            </figcaption>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </figure>
        </div>

        <div className="tast-head mt-8 text-center md:mt-10">
          <div className="mx-auto gold-divider w-40" />
          <p className="mx-auto mt-8 max-w-3xl font-serif text-2xl italic leading-relaxed text-champagne md:mt-9 md:text-3xl">
            {t.quoteLead}
            <span className="text-gradient-gold not-italic">{t.quoteGold}</span>
            {t.quoteRest}
          </p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.4em] text-gold/80 md:mt-6">
            {t.manifesto}
          </p>
        </div>

        <div className="tast-grid mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.roman}
                className="tast-step scroll-premium-card group relative overflow-hidden rounded-sm border border-gold/20 bg-onyx/50 p-7 backdrop-blur-sm transition-[transform,border-color,background-color] duration-500 will-change-transform hover:-translate-y-1 hover:border-gold/55"
              >
                <div className="absolute inset-0 spotlight-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-5xl text-gold/35">{step.roman}</span>
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="my-5 gold-divider w-12" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                    {step.subtitle}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-champagne">{step.title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-champagne/75">
                    {step.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
