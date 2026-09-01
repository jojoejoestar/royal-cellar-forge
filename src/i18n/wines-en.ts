import type { Wine } from "@/content/wines";

export const winesEn: Record<
  string,
  Pick<Wine, "appellation" | "notes" | "pairing" | "marketPrice" | "rarity" | "bottles" | "story">
> = {
  "bordeaux-premium-2018": {
    appellation: "Bordeaux · Red blend",
    notes:
      "Ripe cassis, cedar, and graphite with a silky texture. Classic Left Bank profile — medium-plus body, an elegant finish.",
    pairing: "Confit lamb · Aged blue cheeses",
    marketPrice: "$55–$140",
    rarity: "Curated Label",
    bottles: "Privately selected lot",
    story:
      "A classic Bordeaux profile, chosen for its visual poise and versatile gastronomic style — built for signature cellars.",
  },
  "brunello-riserva-2017": {
    appellation: "Tuscany · Brunello di Montalcino",
    notes:
      "Dried cherry, Mediterranean herbs, leather, and sweet spice. Structured, with firm acidity and a true food-wine vocation.",
    pairing: "Bistecca alla Fiorentina · Porcini risotto",
    marketPrice: "$70–$220",
    rarity: "Curated Label",
    bottles: "Limited-availability lot",
    story:
      "The Tuscan school of long ageing: structure, concentration, and a refined rustic elegance.",
  },
  "pinot-vintage-2016": {
    appellation: "Burgundy · Pinot Noir",
    notes:
      "Raspberry, fresh cherry, sous-bois, and a whisper of earth. Medium-bodied Pinot, fine tannin, a delicate finish.",
    pairing: "Wild duck · Forest mushrooms",
    marketPrice: "$45–$120",
    rarity: "Cellar Vintage",
    bottles: "Small matured lot",
    story: "Classic Pinot Noir with true cellar character and an elegant aromatic signature.",
  },
  "champagne-dom-perignon-2013": {
    appellation: "Champagne · Brut",
    notes:
      "Brioche, candied citrus, and toasted almonds. Fine mousse, vibrant acidity, a mineral finish.",
    pairing: "Belon oysters · Oscietra caviar",
    marketPrice: "$220–$340",
    rarity: "Prestige Cuvée",
    bottles: "Seasonal allocation",
    story:
      "A prestige-inspired cuvée, chosen for celebration and for pairings that demand absolute precision.",
  },
  "loire-cuvee-2019": {
    appellation: "Loire Valley · Sparkling",
    notes: "White fruit, dried blossoms, and toasted bread in a fresh, lingering frame.",
    pairing: "Goat cheese · Shellfish",
    marketPrice: "$35–$95",
    rarity: "Curated Edition",
    bottles: "Limited lot",
    story:
      "The Loire in sparkling form — mineral freshness and gastronomic range, first.",
  },
  "rioja-reserva-2014": {
    appellation: "Rioja · Reserva",
    notes: "Ripe plum, vanilla, and leather, with rounded tannins and a spiced finish.",
    pairing: "Roast lamb · Jamón ibérico",
    marketPrice: "$40–$110",
    rarity: "Iberian Library",
    bottles: "Historic cellar lot",
    story: "Classic ageing Rioja: integrated oak and an elegant, earthy signature.",
  },
  "douro-valley-2016": {
    appellation: "Douro · Reserva",
    notes: "Concentrated black fruit, cacao, and warm spice, with a deep finish.",
    pairing: "Aged cheeses · Game",
    marketPrice: "$45–$130",
    rarity: "Atlantic Selection",
    bottles: "Curated micro-lot",
    story: "A Douro-style bottle — concentration and structure for a contemplative pour.",
  },
  "napa-cabernet-2019": {
    appellation: "Napa Valley · Cabernet Sauvignon",
    notes: "Blackberry, cassis, cacao, and cedar in a broad frame with a persistent finish.",
    pairing: "Dry-aged prime rib · Braised short rib",
    marketPrice: "$80–$240",
    rarity: "Napa Signature",
    bottles: "Highly allocated",
    story:
      "Classic California Cabernet: intense fruit, concentration, and a polished close.",
  },
};
