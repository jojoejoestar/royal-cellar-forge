import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

const serif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cave Royale · Adega de Vinhos Finos · Curadoria Privada",
  description:
    "Curadoria exclusiva de rótulos raros e safras históricas. Para paladares que exigem a excelência absoluta e o verdadeiro sabor do terroir.",
  icons: {
    icon: "/brand/cave-royale-official-logo.png",
    shortcut: "/brand/cave-royale-official-logo.png",
    apple: "/brand/cave-royale-official-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${serif.variable} ${sans.variable} relative`}>
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,#0A0A0A_0%,#040404_52%,#000000_100%)]"
        />
        {children}
      </body>
    </html>
  );
}
