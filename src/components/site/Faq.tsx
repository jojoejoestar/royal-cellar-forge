"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "@/lib/gsapBoot";
import { Plus, Minus } from "lucide-react";
import { primeAndReveal, revealEase, stRevealOnce } from "@/lib/scrollReveal";
import { easeLuxury } from "@/lib/ease";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Container, PatternBackdrop, Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useCopy } from "@/i18n/LocaleProvider";

export function Faq() {
  const t = useCopy().faq;
  const faqs = t.items;
  const [open, setOpen] = useState<number | null>(0);

  const ref = useGsapReveal((root) => {
    primeAndReveal(
      ".faq-heading",
      root,
      { autoAlpha: 0, x: -36 },
      { autoAlpha: 1, x: 0, duration: 1, stagger: 0.1 },
      { trigger: root, start: "top 86%" },
    );

    gsap.utils.toArray<HTMLElement>(".faq-item", root).forEach((item, index) => {
      gsap.set(item, { autoAlpha: 0, x: index % 2 === 0 ? -32 : 32, force3D: true });
      gsap.to(item, {
        autoAlpha: 1,
        x: 0,
        force3D: true,
        duration: 0.85,
        ease: revealEase,
        scrollTrigger: {
          ...stRevealOnce,
          trigger: item,
          start: "top 92%",
        },
      });
    });
  });

  return (
    <Section ref={ref}>
      <PatternBackdrop damask={0.35} grapes={0.2} />
      <Container className="max-w-4xl">
        <SectionHeader
          revealClass="faq-heading"
          eyebrow={t.eyebrow}
          title={
            <>
              {t.titleLead}
              <span className="italic text-gradient-gold">{t.titleGold}</span>
              <br />
              {t.titleRest}
            </>
          }
        />

        <div className="faq-list mt-10 space-y-4 lg:mt-12">
          {faqs.map((item, i) => (
            <div
              key={item.q}
              className="faq-item overflow-hidden rounded-sm border border-gold/20 bg-background/40 backdrop-blur-sm transition-colors hover:border-gold/40"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
              >
                <span className="font-serif text-lg text-champagne md:text-xl">{item.q}</span>
                <span className="shrink-0 rounded-full border border-gold/40 p-1.5 text-gold transition-transform will-change-transform">
                  {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key={`faq-body-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.36, ease: easeLuxury }}
                    className="will-change-transform"
                  >
                    <div className="px-7 pb-7 text-[15px] font-light leading-relaxed text-champagne/75">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
