import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Wind, GlassWater, Sparkles } from "lucide-react";
import pour from "@/assets/tasting-pour.jpg";
import swirl from "@/assets/tasting-swirl.jpg";
import nose from "@/assets/tasting-nose.jpg";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Eye,
    roman: "I",
    title: "O Olhar",
    subtitle: "Visus",
    text: "À luz dourada da vela, observamos a profundidade do rubi e a viscosidade que escorre como veludo nas paredes do cristal. A cor revela a idade. A lágrima revela o caráter.",
  },
  {
    icon: Wind,
    roman: "II",
    title: "O Aroma",
    subtitle: "Olfactus",
    text: "Aproximamos a taça em silêncio reverente. Frutas negras, especiarias do Oriente, couro envelhecido, terra molhada. Cada inspiração revela uma camada esquecida do tempo.",
  },
  {
    icon: GlassWater,
    roman: "III",
    title: "O Paladar",
    subtitle: "Gustus",
    text: "O primeiro gole atravessa séculos. Taninos sedosos abraçam a língua, a acidez vibra como uma sinfonia, e o final persiste por minutos infinitos. Aqui mora a verdade.",
  },
  {
    icon: Sparkles,
    roman: "IV",
    title: "A Memória",
    subtitle: "Memoria",
    text: "O grande vinho não termina ao engolir. Ele permanece. Ele se torna recordação, conversa, herança. Um instante eterno gravado no paladar e na alma.",
  },
];

export function Tasting() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".tast-head", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      });

      gsap.from(".tast-hero", {
        scrollTrigger: { trigger: ".tast-mosaic", start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".tast-side", {
        scrollTrigger: { trigger: ".tast-mosaic", start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.2,
      });

      gsap.from(".tast-step", {
        scrollTrigger: { trigger: ".tast-grid", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="degustacao"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-scarlet py-32 md:py-44"
    >
      <div className="absolute inset-0 pattern-damask opacity-20" />
      <div className="absolute inset-0 pattern-grapes opacity-25" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <p className="tast-head text-xs uppercase tracking-[0.5em] text-gold">
            Ritual de Degustação
          </p>
          <div className="tast-head mx-auto mt-6 gold-divider w-32" />
          <h2 className="tast-head mt-8 font-serif text-4xl leading-tight text-champagne md:text-6xl">
            Quatro Atos para uma{" "}
            <span className="italic text-gradient-gold">Comunhão Sensorial</span>.
          </h2>
          <p className="tast-head mx-auto mt-6 max-w-2xl text-base font-light text-champagne/75">
            A degustação de um grande vinho não é consumo. É cerimônia. Ato de
            silêncio, presença e gratidão diante de uma cápsula líquida do
            tempo.
          </p>
        </div>

        {/* Mosaic */}
        <div className="tast-mosaic mt-20 grid gap-6 lg:grid-cols-12 lg:grid-rows-2">
          {/* Hero image — pour */}
          <figure className="tast-hero relative col-span-12 row-span-2 overflow-hidden rounded-sm border border-gold/25 bg-gradient-royal lg:col-span-7">
            <div className="pointer-events-none absolute -inset-1 bg-gradient-gold opacity-30 blur-3xl" />
            <div className="relative">
              <img
                src={pour}
                alt="Decanter de cristal vertendo vinho em taça"
                loading="lazy"
                width={1280}
                height={1600}
                className="aspect-[4/5] w-full object-cover lg:aspect-auto lg:h-[720px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/95 via-onyx/30 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
                  O Ato Sagrado
                </p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-champagne md:text-4xl">
                  O Despertar do Decanter
                </h3>
                <p className="mt-3 max-w-md text-sm font-light text-champagne/80">
                  Após décadas de sono, o vinho respira pela primeira vez. Cada
                  segundo é uma camada que se revela.
                </p>
              </figcaption>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
            </div>
          </figure>

          {/* Side — swirl */}
          <figure className="tast-side relative col-span-12 overflow-hidden rounded-sm border border-gold/25 bg-gradient-royal sm:col-span-6 lg:col-span-5 lg:row-span-1">
            <img
              src={swirl}
              alt="Macro do vinho sendo agitado em taça de cristal"
              loading="lazy"
              width={1280}
              height={1280}
              className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-[348px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
                Movimento
              </p>
              <h4 className="mt-2 font-serif text-2xl text-champagne">
                Lágrimas de Cristal
              </h4>
            </figcaption>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </figure>

          {/* Side — nose */}
          <figure className="tast-side relative col-span-12 overflow-hidden rounded-sm border border-gold/25 bg-gradient-royal sm:col-span-6 lg:col-span-5 lg:row-span-1">
            <img
              src={nose}
              alt="Sommelier inspirando o aroma do vinho à luz de vela"
              loading="lazy"
              width={1280}
              height={1280}
              className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-[348px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
                Comunhão
              </p>
              <h4 className="mt-2 font-serif text-2xl text-champagne">
                Memórias do Terroir
              </h4>
            </figcaption>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </figure>
        </div>

        {/* Four steps */}
        <div className="tast-grid mt-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.roman}
                className="tast-step group relative overflow-hidden rounded-sm border border-gold/20 bg-onyx/50 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/55"
              >
                <div className="absolute inset-0 spotlight-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-5xl text-gold/35">
                      {s.roman}
                    </span>
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="my-5 gold-divider w-12" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                    {s.subtitle}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-champagne">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-champagne/75">
                    {s.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing manifesto */}
        <div className="tast-head mt-24 text-center">
          <div className="mx-auto gold-divider w-40" />
          <p className="mt-10 mx-auto max-w-3xl font-serif text-2xl italic leading-relaxed text-champagne md:text-3xl">
            “Beber um grande vinho é{" "}
            <span className="text-gradient-gold not-italic">
              conversar com o tempo
            </span>{" "}
            — uma audiência privada com séculos de paciência, sol e silêncio.”
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-gold/80">
            Manifesto Cave Royale
          </p>
        </div>
      </div>
    </section>
  );
}
