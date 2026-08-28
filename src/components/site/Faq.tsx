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

const faqs = [
  {
    q: "Como é garantida a procedência de cada rótulo?",
    a: "Cada garrafa da Cave Royale percorre uma cadeia rastreada do produtor à sua taça. Importamos diretamente das vinícolas ou de leilões certificados (Sotheby's, Christie's), com documentação de origem, certificados de autenticidade do château e selos de exportação. Nada entra em nossa adega sem a assinatura pessoal do nosso Mestre Sommelier.",
  },
  {
    q: "Existe controle de temperatura no transporte?",
    a: "Sim, sem exceções. Operamos com containers refrigerados a 14°C e umidade controlada em 70%, monitorados por sensores IoT 24/7. A entrega final é realizada em veículos climatizados próprios, com janela de horário acordada e protocolo de assinatura. Sua safra histórica chega como saiu da adega de origem.",
  },
  {
    q: "Vocês buscam rótulos raros sob encomenda?",
    a: "Esta é uma das vocações da nossa Confraria. Membros VIP têm acesso ao serviço de Wine Hunter - nossa rede internacional localiza safras descontinuadas, formatos magnum, jeroboam e edições limitadas. O prazo médio de localização é de 4 a 12 semanas, com preview fotográfico antes da aquisição.",
  },
  {
    q: "Qual o investimento médio para integrar a Confraria?",
    a: "A Confraria Cave Royale opera por convite e curadoria de perfil. Não trabalhamos com mensalidades - trabalhamos com relacionamento. O ticket médio anual de nossos membros gravita entre R$ 80 mil e R$ 600 mil, mas o valor real está no acesso prioritário a alocações limitadas que jamais chegam ao mercado público.",
  },
  {
    q: "Oferecem consultoria para montagem de adega particular?",
    a: "Absolutamente. Nosso serviço Cellar Architecture acompanha desde o projeto técnico (climatização, iluminação UV-free, sistemas anti-vibração) até a curadoria estratégica de portfólio com horizonte de 5, 10 e 25 anos - pensando guarda, valorização e legado familiar.",
  },
];

export function Faq() {
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
          eyebrow="Dúvidas Aristocráticas"
          title={
            <>
              Respostas <span className="italic text-gradient-gold">à Altura</span>
              <br />
              do Seu Padrão.
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
