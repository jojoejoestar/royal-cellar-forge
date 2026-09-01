import type { ReactNode } from "react";
import { RootBody } from "@/components/site/RootBody";
import { createMetadata, htmlLang } from "@/i18n/metadata";
import "../globals.css";

export const metadata = createMetadata("en");

export default function EnLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={htmlLang.en}>
      <RootBody>{children}</RootBody>
    </html>
  );
}
