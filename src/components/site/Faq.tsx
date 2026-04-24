"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        scrollTrigger: { trigger: ".faq-list", start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-transparent py-20 md:py-28"
    >
      <div className="absolute inset-0 pattern-damask opacity-35" />
      <div className="absolute inset-0 pattern-grapes opacity-20" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-gold">
            Dúvidas Aristocráticas
          </p>
          <div className="mx-auto mt-6 gold-divider w-32" />
          <AnimatedTitle
            as="h2"
            className="mt-8 font-serif text-4xl leading-tight md:text-6xl"
          >
            Respostas <span className="italic text-gradient-gold">à Altura</span>
            <br />
            do Seu Padrão.
          </AnimatedTitle>
        </div>

        <div className="faq-list mt-16 space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="faq-item overflow-hidden rounded-sm border border-gold/20 bg-background/40 backdrop-blur-sm transition-colors hover:border-gold/40"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
              >
                <span className="font-serif text-lg text-champagne md:text-xl">
                  {f.q}
                </span>
                <span className="shrink-0 rounded-full border border-gold/40 p-1.5 text-gold transition-transform">
                  {open === i ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <div className="px-7 pb-7 text-[15px] font-light leading-relaxed text-champagne/75">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

