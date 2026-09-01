"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getCopy, type Copy } from "@/i18n/copy";
import { getFeaturedWines, getWines } from "@/i18n/catalog";
import type { Locale } from "@/i18n/types";
import type { Wine } from "@/content/wines";

type LocaleContextValue = {
  locale: Locale;
  copy: Copy;
  wines: Wine[];
  featuredWines: Wine[];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      copy: getCopy(locale),
      wines: getWines(locale),
      featuredWines: getFeaturedWines(locale),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return ctx;
}

export function useCopy(): Copy {
  return useLocaleContext().copy;
}

export function useWines(): Wine[] {
  return useLocaleContext().wines;
}

export function useFeaturedWines(): Wine[] {
  return useLocaleContext().featuredWines;
}
