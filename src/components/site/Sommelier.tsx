"use client";

import Image from "next/image";
import { Award, Quote } from "lucide-react";
import sommelierImg from "@/assets/sommelier.jpg";
import { primeAndReveal } from "@/lib/scrollReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Container, PatternBackdrop, Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useCopy } from "@/i18n/LocaleProvider";

export function Sommelier() {
  const t = useCopy().sommelier;
  const ref = useGsapReveal((root) => {
    primeAndReveal(
      ".som-img",
      root,
      { autoAlpha: 0, x: -48 },
      { autoAlpha: 1, x: 0, duration: 1.1 },
      { trigger: root, start: "top 84%" },
    );
    primeAndReveal(
      ".som-text",
      root,
      { autoAlpha: 0, x: 48 },
      { autoAlpha: 1, x: 0, duration: 1.1, stagger: 0.12 },
      { trigger: root, start: "top 84%" },
    );
  });

  return (
    <Section id="sommelier" ref={ref}>
      <PatternBackdrop grapes={0.25} />
      <div className="ambient-spotlight absolute right-0 top-1/4 h-[600px] w-[600px] spotlight-gold" />

      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div className="som-img relative">
          <div className="image-hover-luxury relative h-[640px] overflow-hidden rounded-sm border border-gold/20 shadow-velvet">
            <Image
              src={sommelierImg}
              alt={t.imageAlt}
              fill
              className="object-cover object-center grayscale-[15%] contrast-110"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={78}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden items-center gap-3 rounded-sm border border-gold/30 bg-background/90 px-5 py-3 shadow-gold-soft backdrop-blur-md md:flex">
            <Award className="h-5 w-5 text-gold" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Court of Master Sommeliers
              </p>
              <p className="text-xs text-champagne/80">{t.diploma}</p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeader
            align="left"
            revealClass="som-text"
            eyebrow={t.eyebrow}
            title={
              <>
                {t.titleLead}
                <br />
                <span className="som-heading-gold-shine italic text-gradient-gold">{t.titleGold}</span>
              </>
            }
          />

          <div className="som-text mt-10 flex items-start gap-4">
            <Quote className="mt-1 h-8 w-8 shrink-0 text-gold/60" />
            <p className="text-lg font-light italic leading-relaxed text-champagne/85">
              {t.quote}
            </p>
          </div>

          <p className="som-text mt-8 text-base font-light leading-relaxed text-champagne/70">
            {t.bio}
          </p>

          <div className="som-text mt-10 grid grid-cols-3 gap-3 border-t border-gold/15 pt-8 sm:gap-5 md:gap-6">
            {t.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center md:items-start md:text-left"
              >
                <p className="som-stat-gold font-serif text-3xl text-gold">{stat.value}</p>
                <p className="mt-1 max-w-[11rem] text-[10px] uppercase leading-snug tracking-widest text-champagne/60 md:max-w-none">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
