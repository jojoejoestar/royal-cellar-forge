"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Acervo", href: "#acervo" },
  { label: "Galeria", href: "#galeria" },
  { label: "Heritage", href: "#heritage" },
  { label: "O Sommelier", href: "#sommelier" },
  { label: "Degustação", href: "#degustacao" },
  { label: "O Chalé", href: "#chale" },
  { label: "Confraria", href: "#confraria" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    let timer = 0;
    const raf = requestAnimationFrame(() => {
      timer = window.setTimeout(() => setCanAnimate(true), 100);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={canAnimate ? { y: -40, opacity: 0 } : false}
      animate={canAnimate ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className={`will-change-transform fixed inset-x-0 top-0 z-50 transition-[padding,background-color,backdrop-filter] duration-500 ${
        scrolled ? "glass-scarlet py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="group flex items-center">
          <Image
            src="/brand/cave-royale-official-logo.png"
            alt="Cave Royale"
            width={220}
            height={74}
            sizes="140px"
            priority
            className="h-10 w-auto will-change-transform transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="magnetic-underline relative text-sm font-light tracking-widest text-champagne/80 uppercase transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#confraria"
          className="hidden md:inline-flex btn-gold-glow rounded-sm px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em]"
        >
          Acesso VIP
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-gold" aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          className="will-change-transform mx-6 mt-3 flex flex-col gap-5 rounded-sm border border-gold/20 p-6 glass-scarlet md:hidden"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="magnetic-underline text-sm uppercase tracking-widest text-champagne/80 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#confraria"
            onClick={() => setOpen(false)}
            className="btn-gold-glow rounded-sm px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.22em]"
          >
            Acesso VIP
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
