import type { StaticImageData } from "next/image";
import bordeaux from "@/assets/wine-bordeaux.jpg";
import brunello from "@/assets/wine-brunello.jpg";
import burgundy from "@/assets/wine-burgundy.jpg";
import champagne from "@/assets/wine-champagne.jpg";
import loire from "@/assets/wine-loire.jpg";
import rioja from "@/assets/wine-rioja.jpg";
import douro from "@/assets/wine-douro.jpg";
import napa from "@/assets/wine-napa.jpg";

export type WineRegion = "França" | "Itália" | "Espanha" | "Portugal" | "Estados Unidos";

export type Wine = {
  id: string;
  name: string;
  region: WineRegion;
  appellation: string;
  vintage: string;
  image: StaticImageData;
  notes: string;
  pairing: string;
  marketPrice: string;
  rarity: string;
  bottles: string;
  story: string;
  score: string;
  focusY?: number;
  featured?: boolean;
};

export const wines: Wine[] = [
  {
    id: "bordeaux-premium-2018",
    name: "Bordeaux Premium Reserve",
    region: "França",
    appellation: "Bordeaux · Blend tinto",
    vintage: "2018",
    image: bordeaux,
    notes:
      "Cassis maduro, cedro e grafite com textura sedosa. Perfil clássico bordalês de corpo médio-alto e final elegante.",
    pairing: "Cordeiro confitado · Queijos azuis envelhecidos",
    marketPrice: "US$ 55 - 140 (R$ 290 - 740)",
    rarity: "Rótulo de Curadoria",
    bottles: "Lote privado selecionado",
    story:
      "Garrafa de perfil clássico bordalês, escolhida pela elegância visual e pelo estilo gastronômico versátil para adegas de assinatura.",
    score: "94/100",
    focusY: 64,
    featured: true,
  },
  {
    id: "brunello-riserva-2017",
    name: "Italian Brunello Riserva",
    region: "Itália",
    appellation: "Toscana · Brunello di Montalcino",
    vintage: "2017",
    image: brunello,
    notes:
      "Cereja seca, ervas mediterrâneas, couro e especiarias doces. Estruturado, com acidez firme e vocação gastronômica.",
    pairing: "Bistecca alla Fiorentina · Risotto de funghi",
    marketPrice: "US$ 70 - 220 (R$ 370 - 1.160)",
    rarity: "Rótulo de Curadoria",
    bottles: "Lote com disponibilidade reduzida",
    story:
      "Representa a escola toscana de longa guarda: estrutura, concentração e elegância rústica refinada.",
    score: "95/100",
    focusY: 66,
    featured: true,
  },
  {
    id: "pinot-vintage-2016",
    name: "Pinot Noir Vintage",
    region: "França",
    appellation: "Borgonha · Pinot Noir",
    vintage: "2016",
    image: burgundy,
    notes:
      "Framboesa, cereja fresca, sous-bois e toque terroso. Pinot de corpo médio, tanino fino e final delicado.",
    pairing: "Pato selvagem · Cogumelos selvagens",
    marketPrice: "US$ 45 - 120 (R$ 240 - 635)",
    rarity: "Safra de Adega",
    bottles: "Pequeno lote maturado",
    story: "Estilo clássico de Pinot Noir com caráter de adega e assinatura aromática elegante.",
    score: "93/100",
    focusY: 67,
    featured: true,
  },
  {
    id: "champagne-dom-perignon-2013",
    name: "Champagne Dom Perignon Cuvée",
    region: "França",
    appellation: "Champagne · Brut",
    vintage: "2013",
    image: champagne,
    notes:
      "Brioche, frutas cítricas confitadas e amêndoas tostadas. Perlage fino, acidez vibrante e final mineral.",
    pairing: "Ostras Belon · Caviar Oscietra",
    marketPrice: "US$ 220 - 340 (R$ 1.160 - 1.790)",
    rarity: "Prestige Cuvée",
    bottles: "Alocação sazonal",
    story:
      "Rótulo de inspiração prestige, selecionado para experiências de celebração e harmonizações de alta precisão.",
    score: "96/100",
    focusY: 71,
    featured: true,
  },
  {
    id: "loire-cuvee-2019",
    name: "Loire Valley Cuvée",
    region: "França",
    appellation: "Vale do Loire · Espumante",
    vintage: "2019",
    image: loire,
    notes: "Frutas brancas, flores secas e toques de pão tostado em corpo fresco e longo.",
    pairing: "Queijo de cabra · Frutos do mar",
    marketPrice: "US$ 35 - 95 (R$ 185 - 500)",
    rarity: "Edição Curadoria",
    bottles: "Lote limitado",
    story:
      "Expressão do Loire em estilo espumante, com foco em frescor mineral e versatilidade gastronômica.",
    score: "92/100",
    focusY: 70,
  },
  {
    id: "rioja-reserva-2014",
    name: "Rioja Reserva Antigua",
    region: "Espanha",
    appellation: "Rioja · Reserva",
    vintage: "2014",
    image: rioja,
    notes: "Ameixa madura, baunilha e couro, com taninos redondos e final especiado.",
    pairing: "Cordeiro assado · Jamón ibérico",
    marketPrice: "US$ 40 - 110 (R$ 210 - 580)",
    rarity: "Biblioteca Ibérica",
    bottles: "Lote de adega histórica",
    story:
      "Perfil clássico de Rioja de guarda, com madeira integrada e assinatura terrosa elegante.",
    score: "93/100",
    focusY: 66,
  },
  {
    id: "douro-valley-2016",
    name: "Douro Valley Reserva",
    region: "Portugal",
    appellation: "Douro · Reserva",
    vintage: "2016",
    image: douro,
    notes: "Fruta negra concentrada, cacau e especiarias quentes, com final profundo.",
    pairing: "Queijos curados · Carnes de caça",
    marketPrice: "US$ 45 - 130 (R$ 240 - 690)",
    rarity: "Seleção Atlântica",
    bottles: "Micro lote de curadoria",
    story: "Rótulo de estilo duriense, com concentração e estrutura para serviço meditativo.",
    score: "94/100",
    focusY: 68,
  },
  {
    id: "napa-cabernet-2019",
    name: "Napa Valley Cabernet Sauvignon",
    region: "Estados Unidos",
    appellation: "Napa Valley · Cabernet Sauvignon",
    vintage: "2019",
    image: napa,
    notes: "Amora, cassis, cacau e cedro em estrutura ampla com final persistente.",
    pairing: "Prime rib dry-aged · Short rib braseada",
    marketPrice: "US$ 80 - 240 (R$ 420 - 1.265)",
    rarity: "Napa Signature",
    bottles: "Alocação concorrida",
    story:
      "Cabernet de perfil californiano clássico: fruta intensa, concentração e acabamento polido.",
    score: "95/100",
    focusY: 64,
  },
];

export const featuredWines = wines.filter((wine) => wine.featured);

export const wineRegions = [
  "Todos",
  "França",
  "Itália",
  "Espanha",
  "Portugal",
  "Estados Unidos",
] as const satisfies readonly ("Todos" | WineRegion)[];
