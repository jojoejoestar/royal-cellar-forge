"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Check } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

export function Confraria() {
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(".conf-el", {
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        y: 42,
        duration: 1.05,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="confraria"
      ref={ref}
      className="relative overflow-hidden bg-transparent py-14 md:py-20"
    >
      <div className="ambient-spotlight absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 spotlight-gold" />
      <div className="absolute inset-0 pattern-damask opacity-20" />
      <div className="absolute inset-0 pattern-grapes opacity-25" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">
        <div>
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
            <span className="text-gold">37 novos membros por ano</span>. O
            cadastro é avaliado individualmente pelo nosso Mestre Sommelier e o
            retorno acontece em até 72 horas.
          </p>

          <ul className="conf-el mt-10 space-y-4">
            {[
              "Alocação prioritária de safras limitadas",
              "Wine Hunter para rótulos sob encomenda",
              "Degustações privadas com vignerons internacionais",
              "Consultoria Cellar Architecture inclusa",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm font-light text-champagne/80">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="conf-el glass-dark relative rounded-sm p-8 md:p-10 shadow-velvet"
        >
          <div className="absolute -inset-px rounded-sm bg-gradient-to-br from-gold/30 via-transparent to-gold/10 opacity-50 -z-10 blur" />

          <h3 className="font-serif text-2xl text-champagne">
            Solicitação de Ingresso
          </h3>
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
              <h4 className="mt-5 font-serif text-2xl text-champagne">
                Solicitação Recebida.
              </h4>
              <p className="mt-3 text-sm font-light text-champagne/70">
                Em até 72 horas, nosso Mestre Sommelier entrará em contato pelo
                WhatsApp informado.
              </p>
            </motion.div>
          ) : (
            <div className="mt-8 space-y-5">
              <Field label="Nome Completo" placeholder="Como deseja ser chamado" />
              <Field
                label="WhatsApp"
                type="tel"
                placeholder="+55 (11) 90000-0000"
              />
              <Field
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
              />
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
                  <option className="bg-background">Cabernet Sauvignon</option>
                  <option className="bg-background">Pinot Noir</option>
                  <option className="bg-background">Sangiovese</option>
                  <option className="bg-background">Chardonnay</option>
                  <option className="bg-background">Champagne / Espumantes</option>
                  <option className="bg-background">Tudo · Sou eclético</option>
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
    </section>
  );
}

function Field({
  label,
  ...rest
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
        {label}
      </label>
      <input
        required
        {...rest}
        className="mt-2 w-full rounded-sm border border-gold/20 bg-background/60 px-4 py-3 text-sm text-champagne placeholder:text-champagne/30 outline-none transition focus:border-gold/60 focus:bg-background/80"
      />
    </div>
  );
}

