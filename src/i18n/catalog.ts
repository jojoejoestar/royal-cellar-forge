import { wines, type Wine } from "@/content/wines";
import { winesEn } from "@/i18n/wines-en";
import type { Locale } from "@/i18n/types";

export function getWines(locale: Locale): Wine[] {
  if (locale === "pt") return wines;
  return wines.map((wine) => {
    const translated = winesEn[wine.id];
    return translated ? { ...wine, ...translated } : wine;
  });
}

export function getFeaturedWines(locale: Locale): Wine[] {
  return getWines(locale).filter((wine) => wine.featured);
}
