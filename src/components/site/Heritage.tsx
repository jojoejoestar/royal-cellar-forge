import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Crown, Scroll, Grape } from "lucide-react";
import chalice from "@/assets/heritage-chalice.jpg";
import grapes from "@/assets/heritage-grapes.jpg";
import cellar from "@/assets/heritage-cellar.jpg";

gsap.registerPlugin(ScrollTrigger);

const eras = [
  {
    icon: Grape,
    year: "6000 a.C.",
    title: "A Origem Sagrada",
    text: "Nas encostas do Cáucaso, os primeiros vinhedos brotam. O homem descobre que o suco da uva, quando cultivado pelo tempo, transcende a sede — torna-se ritual.",
  },
  {
    icon: Scroll,
    year: "Antiguidade",
    title: "Néctar dos Deuses",
    text: "Egípcios o ofertam a Osíris. Gregos o consagram a Dionísio. Romanos o levam por todo o império em ânforas seladas. O vinho deixa de ser bebida — torna-se cultura.",
  },
  {
    icon: Crown,
    year: "Idade Média",
    title: "A Bebida da Coroa",
    text: "Monges beneditinos refinam a vinificação. Reis e cardeais brindam tratados, alianças e conquistas. Cada taça selada com cera carrega a assinatura de uma dinastia.",
  },
];

export function Heritage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".heritage-line", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15,
      });
      gsap.from(".heritage-img", {
        scrollTrigger: { trigger: ".heritage-mosaic", start: "top 80%" },
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.2,
      });
      gsap.from(".heritage-era", {
        scrollTrigger: { trigger: ".heritage-timeline", start: "top 85%" },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.18,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="heritage"
      ref={ref}
      className="relative overflow-hidden bg-background py-20 md:py-28"
    >
      {/* Background ornaments */}
      <div className="absolute inset-0 pattern-grapes opacity-30" />
      <div className="absolute inset-0 pattern-damask opacity-20" />
      <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 spotlight-gold" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="heritage-line text-xs uppercase tracking-[0.5em] text-gold">
            Patrimônio · Heritage
          </p>
          <div className="heritage-line mx-auto mt-6 gold-divider w-32" />

          <h2 className="heritage-line mt-8 font-serif text-4xl leading-tight text-champagne md:text-6xl lg:text-7xl">
            A Bebida que Selou
            <br />
            <span className="italic text-gradient-gold">
              Impérios e Eternidades.
            </span>
          </h2>

          <p className="heritage-line mx-auto mt-10 max-w-3xl text-base font-light leading-relaxed text-champagne/75 md:text-lg">
            Antes da escrita, antes das catedrais, antes das coroas — havia o
            vinho. Companheiro de faraós, sacerdotes e imperadores, o néctar da
            videira atravessou oito mil anos como o brinde silencioso de toda
            civilização que se ousou chamar nobre. Beber vinho é assinar um
            pacto com a história.
          </p>
        </div>

        {/* Mosaic of three images — the relic, the fruit, the sanctuary */}
        <div className="heritage-mosaic mt-24 grid gap-5 md:grid-cols-12 md:gap-6">
          {/* Chalice — large left */}
          <figure className="heritage-img group relative md:col-span-7 md:row-span-2">
            <div className="pointer-events-none absolute -inset-6 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.78 0.13 85 / 0.22) 0%, transparent 65%)",
              }}
            />
            <div className="relative overflow-hidden rounded-sm border border-gold/25 shadow-velvet">
              <img
                src={chalice}
                alt="Cálice real cravejado de rubis sobre mesa medieval com pergaminho selado"
                loading="lazy"
                width={1280}
                height={896}
                className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                  · A Relíquia ·
                </p>
                <p className="mt-2 font-serif text-xl text-champagne md:text-2xl">
                  O cálice das dinastias
                </p>
              </figcaption>
            </div>
          </figure>

          {/* Grapes — top right */}
          <figure className="heritage-img group relative md:col-span-5">
            <div className="relative overflow-hidden rounded-sm border border-gold/25 shadow-velvet">
              <img
                src={grapes}
                alt="Cacho de uvas tintas com folhas douradas em pintura barroca"
                loading="lazy"
                width={1024}
                height={1280}
                className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ aspectRatio: "5 / 4" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                  · O Fruto ·
                </p>
                <p className="mt-1.5 font-serif text-lg text-champagne md:text-xl">
                  Vitis Vinifera
                </p>
              </figcaption>
            </div>
          </figure>

          {/* Cellar — bottom right */}
          <figure className="heritage-img group relative md:col-span-5">
            <div className="relative overflow-hidden rounded-sm border border-gold/25 shadow-velvet">
              <img
                src={cellar}
                alt="Catedral subterrânea com fileiras de barris e candelabros dourados"
                loading="lazy"
                width={1280}
                height={896}
                className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ aspectRatio: "5 / 4" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold/80">
                  · O Santuário ·
                </p>
                <p className="mt-1.5 font-serif text-lg text-champagne md:text-xl">
                  Catedrais subterrâneas
                </p>
              </figcaption>
            </div>
          </figure>
        </div>

        {/* Timeline — three eras */}
        <div className="heritage-timeline mt-28">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-gold">
              · Oito Mil Anos ·
            </p>
            <h3 className="mt-5 font-serif text-3xl text-champagne md:text-4xl">
              Uma cronologia da nobreza líquida
            </h3>
          </div>

          <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {/* Connecting filigree line (desktop) */}
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
                {/* Node */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-background shadow-gold-soft transition-all duration-500 group-hover:border-gold group-hover:shadow-gold">
                  <era.icon
                    className="h-6 w-6 text-gold transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.4}
                  />
                </div>

                {/* Year badge */}
                <p className="mt-5 text-[11px] uppercase tracking-[0.4em] text-gold/80">
                  {era.year}
                </p>

                {/* Title */}
                <h4 className="mt-3 font-serif text-2xl italic text-gradient-gold">
                  {era.title}
                </h4>

                {/* Body */}
                <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-champagne/70">
                  {era.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Closing manifesto */}
        <div className="mx-auto mt-28 max-w-3xl text-center">
          <div className="mx-auto gold-divider w-24" />
          <blockquote className="mt-10 font-serif text-2xl italic leading-relaxed text-champagne md:text-3xl lg:text-4xl">
            “O vinho é a única obra de arte que se pode beber. Toda taça erguida
            é, em silêncio, uma{" "}
            <span className="text-gradient-gold not-italic">coroação.</span>”
          </blockquote>
          <p className="mt-8 text-[11px] uppercase tracking-[0.45em] text-gold/70">
            — Manifesto Cave Royale
          </p>
        </div>
      </div>
    </section>
  );
}
