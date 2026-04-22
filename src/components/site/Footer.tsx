import { Wine, Mail, MapPin, AtSign } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-scarlet pt-20 pb-10">
      <div className="absolute inset-0 pattern-damask opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Wine className="h-5 w-5 text-gold" />
              <span className="font-serif text-xl tracking-[0.25em] text-gold">
                CAVE&nbsp;ROYALE
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-champagne/65">
              Curadoria privada de vinhos finos para paladares que reconhecem o
              tempo, a terra e o silêncio em cada gole.
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
              Navegação
            </p>
            <ul className="mt-4 space-y-2 text-sm text-champagne/70">
              <li><a href="#acervo" className="hover:text-gold">Acervo</a></li>
              <li><a href="#terroir" className="hover:text-gold">Terroir</a></li>
              <li><a href="#sommelier" className="hover:text-gold">O Sommelier</a></li>
              <li><a href="#confraria" className="hover:text-gold">Confraria</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
              Contato
            </p>
            <ul className="mt-4 space-y-3 text-sm text-champagne/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-gold/70" />
                <span>Jardins · São Paulo · Brasil</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-gold/70" />
                <span>concierge@caveroyale.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Instagram className="mt-0.5 h-4 w-4 text-gold/70" />
                <span>@caveroyale</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-12 gold-divider" />

        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-champagne/50">
            © 2026 Cave Royale · Todos os direitos reservados · Aprecie com moderação
          </p>
          <a
            href="https://agentejoestar.online"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs font-light tracking-[0.25em] text-champagne/70 transition-colors hover:text-gold"
          >
            <span className="h-px w-6 bg-gold/40 transition-all group-hover:w-10 group-hover:bg-gold" />
            Design Original{" "}
            <span className="font-serif italic text-gold">Agente Joestar</span>
            <span className="h-px w-6 bg-gold/40 transition-all group-hover:w-10 group-hover:bg-gold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
