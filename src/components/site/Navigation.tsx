"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Acervo", href: "#acervo" },
  { label: "Galeria", href: "#galeria" },
  { label: "Heritage", href: "#heritage" },
  { label: "Degustação", href: "#degustacao" },
  { label: "O Sommelier", href: "#sommelier" },
  { label: "O Chalé", href: "#chale" },
  { label: "Confraria", href: "#confraria" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
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
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
            priority
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

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gold"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-scarlet mt-3 mx-6 rounded-sm border border-gold/20 p-6 flex flex-col gap-5"
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

