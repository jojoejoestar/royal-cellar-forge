"use client";

import { useState, type InputHTMLAttributes } from "react";
import { gsap } from "@/lib/gsapBoot";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Check } from "lucide-react";
import { primeAndReveal, revealEase, stRevealOnce } from "@/lib/scrollReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { PatternBackdrop, Section } from "@/components/site/Section";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { useCopy } from "@/i18n/LocaleProvider";

export function Confraria() {
  const t = useCopy().confraria;
  const [submitted, setSubmitted] = useState(false);

  const ref = useGsapReveal((root) => {
    primeAndReveal(
      ".conf-copy",
      root,
      { autoAlpha: 0, x: -48 },
      { autoAlpha: 1, x: 0, duration: 1.05 },
      { trigger: root, start: "top 84%" },
    );
    primeAndReveal(
      ".conf-form",
      root,
      { autoAlpha: 0, x: 48 },
      { autoAlpha: 1, x: 0, duration: 1.05, delay: 0.08 },
      { trigger: root, start: "top 84%" },
    );
    const els = gsap.utils.toArray<HTMLElement>(".conf-el", root);
    if (!els.length) return;
    gsap.set(els, { autoAlpha: 0, y: 16 });
    gsap.to(els, {
      autoAlpha: 1,
      y: 0,
      duration: 0.95,
      stagger: 0.12,
      ease: revealEase,
      scrollTrigger: {
        ...stRevealOnce,
        trigger: root,
        start: "top 80%",
      },
    });
  });

  return (
    <Section id="confraria" ref={ref}>
      <div className="ambient-spotlight absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 spotlight-gold" />
      <PatternBackdrop damask={0.2} grapes={0.25} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
        <div className="conf-copy">
          <p className="conf-el inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
            <Lock className="h-3 w-3" /> {t.badge}
          </p>
          <AnimatedTitle
            as="h2"
            className="conf-el mt-8 font-serif text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
          >
            {t.titleLead}
            <br />
            <span className="italic text-gradient-gold">{t.titleGold}</span>
          </AnimatedTitle>
          <p className="conf-el mt-8 text-base font-light leading-relaxed text-champagne/75 md:text-lg">
            {t.descriptionLead}
            <span className="text-gold">{t.descriptionGold}</span>
            {t.descriptionRest}
          </p>

          <ul className="conf-el mt-10 space-y-4">
            {t.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm font-light text-champagne/80">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="conf-form conf-el glass-dark relative rounded-sm p-8 shadow-velvet md:p-10"
        >
          <div className="absolute -inset-px -z-10 rounded-sm bg-gradient-to-br from-gold/30 via-transparent to-gold/10 opacity-50 blur" />

          <h3 className="font-serif text-2xl text-champagne">{t.formTitle}</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold/80">
            {t.formEyebrow}
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 rounded-sm border border-gold/30 bg-gold/5 p-8 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
                <Check className="h-6 w-6 text-gold" />
              </div>
              <h4 className="mt-5 font-serif text-2xl text-champagne">{t.successTitle}</h4>
              <p className="mt-3 text-sm font-light text-champagne/70">
                {t.successText}
              </p>
            </motion.div>
          ) : (
            <div className="mt-8 space-y-5">
              <Field label={t.nameLabel} placeholder={t.namePlaceholder} />
              <Field label={t.phoneLabel} type="tel" placeholder={t.phonePlaceholder} />
              <Field label={t.emailLabel} type="email" placeholder={t.emailPlaceholder} />
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                  {t.grapeLabel}
                </label>
                <select
                  required
                  className="mt-2 w-full rounded-sm border border-gold/20 bg-background/60 px-4 py-3 text-sm text-champagne outline-none transition focus:border-gold/60 focus:bg-background/80"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-background">
                    {t.grapePlaceholder}
                  </option>
                  {t.grapeOptions.map((option) => (
                    <option key={option} className="bg-background">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn-gold-glow group mt-4 inline-flex w-full items-center justify-center gap-3 rounded-sm px-7 py-4 text-sm font-semibold uppercase tracking-[0.25em]"
              >
                {t.submit}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-[10px] uppercase tracking-[0.25em] text-champagne/50">
                {t.finePrint}
              </p>
            </div>
          )}
        </motion.form>
      </div>
    </Section>
  );
}

function Field({ label, ...rest }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-gold/80">{label}</label>
      <input
        required
        {...rest}
        className="mt-2 w-full rounded-sm border border-gold/20 bg-background/60 px-4 py-3 text-sm text-champagne outline-none transition placeholder:text-champagne/30 focus:border-gold/60 focus:bg-background/80"
      />
    </div>
  );
}
