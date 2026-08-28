"use client";

import Image from "next/image";
import { Mail, MapPin, AtSign } from "lucide-react";
import { navLinks } from "@/content/nav";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-transparent pb-8 pt-14 md:pt-16">
      <div className="absolute inset-0 pattern-damask opacity-25" />
      <div className="absolute inset-0 pattern-grapes opacity-25" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 md:grid-cols-4 md:gap-10 lg:gap-12">
          <div className="md:col-span-2">
            <Image
              src="/brand/cave-royale-official-logo.png"
              alt={site.name}
              width={280}
              height={96}
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-champagne/65">
              Curadoria privada de vinhos finos para paladares que reconhecem o tempo, a terra e o
              silêncio em cada gole.
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Navegação</p>
            <ul className="mt-4 space-y-2 text-sm text-champagne/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="magnetic-underline transition-colors hover:text-gold"
                  >
                    {"footerLabel" in link ? link.footerLabel : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Contato</p>
            <ul className="mt-4 space-y-3 text-sm text-champagne/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-gold/70" />
                <span>{site.location}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-gold/70" />
                <span>{site.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <AtSign className="mt-0.5 h-4 w-4 text-gold/70" />
                <span>{site.instagram}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-12 gold-divider" />

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-champagne/50">
            © 2026 {site.name} · Todos os direitos reservados · Aprecie com moderação
          </p>
          <a
            href={site.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-underline group inline-flex items-center gap-2 text-xs font-light tracking-[0.25em] text-champagne/70 transition-colors hover:text-gold"
          >
            <span className="inline-block h-px w-10 origin-center scale-x-[0.6] bg-gold/40 transition-[transform,background-color] duration-300 will-change-transform group-hover:scale-x-100 group-hover:bg-gold" />
            Next.js Architecture ©{" "}
            <span className="font-serif italic text-gold">Agente Joestar</span>
            <span className="inline-block h-px w-10 origin-center scale-x-[0.6] bg-gold/40 transition-[transform,background-color] duration-300 will-change-transform group-hover:scale-x-100 group-hover:bg-gold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
