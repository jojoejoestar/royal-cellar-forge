import type { Metadata } from "next";
import { getCopy } from "@/i18n/copy";
import { htmlLang, ogLocale, type Locale } from "@/i18n/types";

const brandIcon = "/brand/cave-royale-official-logo.png";

export function createMetadata(locale: Locale): Metadata {
  const { meta } = getCopy(locale);
  const isEn = locale === "en";
  const path = isEn ? "/en" : "/";
  const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    icons: {
      icon: brandIcon,
      shortcut: brandIcon,
      apple: brandIcon,
    },
    alternates: {
      canonical: path,
      languages: {
        "pt-BR": "/",
        "en-US": "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: isEn ? ["pt_BR"] : ["en_US"],
      url: path,
      siteName: "Cave Royale",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [
        {
          url: brandIcon,
          alt: meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [brandIcon],
    },
  };
}

export { htmlLang };
