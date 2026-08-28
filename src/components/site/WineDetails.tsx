import type { Wine } from "@/content/wines";
import { Wine as WineIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function WineDetails({ wine, compact = false }: { wine: Wine; compact?: boolean }) {
  return (
    <>
      <p
        className={cn(
          "uppercase text-gold",
          compact ? "text-[10px] tracking-[0.38em]" : "text-xs tracking-[0.4em]",
        )}
      >
        Safra {wine.vintage}
      </p>
      <h3
        className={cn(
          "font-serif leading-tight text-champagne",
          compact ? "mt-2 text-2xl tracking-wide sm:text-3xl" : "mt-4 text-4xl md:text-5xl",
        )}
      >
        {wine.name}
      </h3>
      <p
        className={cn(
          "uppercase tracking-widest text-champagne/60",
          compact ? "mt-1.5 text-xs" : "mt-2 text-sm",
        )}
      >
        {wine.appellation}
      </p>
      <div className={cn("gold-divider", compact ? "my-5 w-20" : "my-8 w-24")} />
      <h4
        className={cn(
          "uppercase text-gold",
          compact ? "text-[10px] tracking-[0.28em]" : "text-xs tracking-[0.3em]",
        )}
      >
        Notas de Degustação
      </h4>
      <p
        className={cn(
          "font-light leading-relaxed text-champagne/80",
          compact ? "mt-2 text-sm text-champagne/82" : "mt-3 text-base",
        )}
      >
        {wine.notes}
      </p>
      <h4
        className={cn(
          "uppercase text-gold",
          compact ? "mt-5 text-[10px] tracking-[0.28em]" : "mt-8 text-xs tracking-[0.3em]",
        )}
      >
        Harmonização
      </h4>
      <p
        className={cn(
          "font-light italic text-champagne/70",
          compact ? "mt-2 text-xs leading-relaxed text-champagne/72" : "mt-3 text-sm",
        )}
      >
        {wine.pairing}
      </p>
      <h4
        className={cn(
          "uppercase text-gold",
          compact ? "mt-5 text-[10px] tracking-[0.28em]" : "mt-8 text-xs tracking-[0.3em]",
        )}
      >
        Preço de Mercado (750ml)
      </h4>
      <p className={cn("font-light text-champagne/78", compact ? "mt-2 text-xs" : "mt-3 text-sm")}>
        {wine.marketPrice}
      </p>
      <a
        href="#galeria"
        className={cn(
          "btn-outline-gold inline-flex items-center justify-center gap-2 rounded-sm font-medium uppercase",
          compact
            ? "mt-6 w-full py-3.5 text-[11px] tracking-[0.28em] sm:w-auto sm:px-7"
            : "mt-10 gap-3 px-7 py-4 text-xs tracking-[0.3em]",
        )}
      >
        <WineIcon className="h-4 w-4 shrink-0" /> Consultar Valor
      </a>
    </>
  );
}
