export type Locale = "pt" | "en";

export const locales = ["pt", "en"] as const;

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
};

export const ogLocale: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
};
