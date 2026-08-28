import { Catalog } from "@/components/site/Catalog";
import { Chalet } from "@/components/site/Chalet";
import { Confraria } from "@/components/site/Confraria";
import { Faq } from "@/components/site/Faq";
import { Gallery } from "@/components/site/Gallery";
import { Heritage } from "@/components/site/Heritage";
import { Philosophy } from "@/components/site/Philosophy";
import { SectionDivider } from "@/components/site/SectionDivider";
import { Sommelier } from "@/components/site/Sommelier";
import { Tasting } from "@/components/site/Tasting";

export function HomeBelowFold() {
  return (
    <>
      <Philosophy />
      <SectionDivider />
      <Heritage />
      <SectionDivider />
      <Catalog />
      <SectionDivider />
      <Gallery />
      <SectionDivider />
      <Sommelier />
      <SectionDivider />
      <Tasting />
      <SectionDivider />
      <Chalet />
      <SectionDivider />
      <Faq />
      <SectionDivider />
      <Confraria />
    </>
  );
}
