"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/content/nav";
import { easeLuxury } from "@/lib/ease";
import { MOBILE_MQ } from "@/lib/media";
import { useEntranceReady, useScrolled } from "@/hooks/useBrowser";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(30);
  const canAnimate = useEntranceReady(
    typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches ? 0 : 100,
  );

  return (
    <motion.header
      initial={canAnimate ? { y: -40, opacity: 0 } : false}
      animate={canAnimate ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.8, ease: easeLuxury }}
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="magnetic-underline relative text-sm font-light uppercase tracking-widest text-champagne/80 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#confraria"
          className="btn-gold-glow hidden rounded-sm px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] md:inline-flex"
        >
          Acesso VIP
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-gold md:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: easeLuxury }}
          className="will-change-transform glass-scarlet mx-6 mt-3 flex flex-col gap-5 rounded-sm border border-gold/20 p-6 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="magnetic-underline text-sm uppercase tracking-widest text-champagne/80 hover:text-gold"
            >
              {link.label}
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
