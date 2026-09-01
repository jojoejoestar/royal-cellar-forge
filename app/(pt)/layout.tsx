import type { ReactNode } from "react";
import { RootBody } from "@/components/site/RootBody";
import { createMetadata, htmlLang } from "@/i18n/metadata";
import "../globals.css";

export const metadata = createMetadata("pt");

export default function PtLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={htmlLang.pt}>
      <RootBody>{children}</RootBody>
    </html>
  );
}
