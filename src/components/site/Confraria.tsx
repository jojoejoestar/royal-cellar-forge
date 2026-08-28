"use client";

import { useState, type InputHTMLAttributes } from "react";
import { gsap } from "@/lib/gsapBoot";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Check } from "lucide-react";
import { primeAndReveal, revealEase, stRevealOnce } from "@/lib/scrollReveal";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { PatternBackdrop, Section } from "@/components/site/Section";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

const perks = [
  "Alocação prioritária de safras limitadas",
  "Wine Hunter para rótulos sob encomenda",
  "Degustações privadas com vignerons internacionais",
  "Consultoria Cellar Architecture inclusa",
];

const grapeOptions = [
  "Cabernet Sauvignon",
  "Pinot Noir",
  "Sangiovese",
  "Chardonnay",
  "Champagne / Espumantes",
  "Tudo · Sou eclético",
];

export function Confraria() {
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
            <Lock className="h-3 w-3" /> Acesso por Convite
          </p>
          <AnimatedTitle
            as="h2"
            className="conf-el mt-8 font-serif text-4xl leading-[1.05] md:text-6xl lg:text-7xl"
          >
            A Excelência
            <br />
            <span className="italic text-gradient-gold">Não Aceita Espera.</span>
          </AnimatedTitle>
          <p className="conf-el mt-8 text-base font-light leading-relaxed text-champagne/75 md:text-lg">
            A Confraria Cave Royale recebe apenas{" "}
            <span className="text-gold">37 novos membros por ano</span>. O cadastro é avaliado
            individualmente pelo nosso Mestre Sommelier e o retorno acontece em até 72 horas.
          </p>

          <ul className="conf-el mt-10 space-y-4">
            {perks.map((perk) => (
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

          <h3 className="font-serif text-2xl text-champagne">Solicitação de Ingresso</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold/80">
            Confraria Cave Royale · 2026
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
              <h4 className="mt-5 font-serif text-2xl text-champagne">Solicitação Recebida.</h4>
              <p className="mt-3 text-sm font-light text-champagne/70">
                Em até 72 horas, nosso Mestre Sommelier entrará em contato pelo WhatsApp informado.
              </p>
            </motion.div>
          ) : (
            <div className="mt-8 space-y-5">
              <Field label="Nome Completo" placeholder="Como deseja ser chamado" />
              <Field label="WhatsApp" type="tel" placeholder="+55 (11) 90000-0000" />
              <Field label="E-mail" type="email" placeholder="seu@email.com" />
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                  Preferência de Uva
                </label>
                <select
                  required
                  className="mt-2 w-full rounded-sm border border-gold/20 bg-background/60 px-4 py-3 text-sm text-champagne outline-none transition focus:border-gold/60 focus:bg-background/80"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-background">
                    Selecione...
                  </option>
                  {grapeOptions.map((option) => (
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
                Solicitar Acesso VIP
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-[10px] uppercase tracking-[0.25em] text-champagne/50">
                Avaliação em até 72h · Sigilo absoluto
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
