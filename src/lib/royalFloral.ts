export const ROYAL_FLORAL_SVG = `
  <svg class="royal-floral-svg" viewBox="0 0 320 320" aria-hidden="true">
    <g class="royal-floral-stroke">
      <path class="royal-floral-line" d="M20 260 C 70 240, 120 200, 130 150 C 140 95, 170 60, 220 40" />
      <path class="royal-floral-line" d="M105 210 C 140 175, 158 135, 155 100" />
      <path class="royal-floral-line" d="M78 234 C 110 222, 140 202, 164 176" />
      <path class="royal-floral-line" d="M120 152 C 98 134, 84 112, 82 84" />
    </g>
    <g class="royal-floral-petals">
      <ellipse cx="164" cy="176" rx="18" ry="10" />
      <ellipse cx="176" cy="164" rx="12" ry="7" />
      <ellipse cx="146" cy="188" rx="9" ry="5.5" />
      <ellipse cx="132" cy="150" rx="11" ry="6.5" />
      <ellipse cx="112" cy="122" rx="9" ry="5.5" />
      <ellipse cx="88" cy="92" rx="8" ry="5" />
    </g>
    <g class="royal-floral-bloom">
      <circle cx="220" cy="40" r="12" />
      <circle cx="232" cy="32" r="6" />
      <circle cx="208" cy="48" r="5" />
    </g>
  </svg>
`;

export function mountRoyalFloral(
  section: HTMLElement,
  side: "left" | "right",
  index: number,
  gsap: typeof import("gsap").default,
  reducedMotion: boolean,
) {
  const ornament = document.createElement("div");
  ornament.className = `royal-floral royal-floral-${side}`;
  ornament.innerHTML = ROYAL_FLORAL_SVG;
  ornament.style.setProperty("--floral-delay", `${index * 0.06}s`);
  section.appendChild(ornament);

  const lines = ornament.querySelectorAll<SVGPathElement>(".royal-floral-line");
  const petals = ornament.querySelectorAll<SVGEllipseElement>(".royal-floral-petals ellipse");
  const bloom = ornament.querySelectorAll<SVGCircleElement>(".royal-floral-bloom circle");

  lines.forEach((line) => {
    const len = line.getTotalLength();
    line.style.strokeDasharray = `${len}`;
    line.style.strokeDashoffset = `${len}`;
  });

  const reveal = gsap.timeline({
    scrollTrigger: { trigger: section, start: "top 78%" },
    defaults: { ease: "power3.out" },
  });

  reveal
    .fromTo(
      ornament,
      { opacity: 0, scale: 0.9, rotate: side === "left" ? -8 : 8 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1.1 },
    )
    .to(lines, { strokeDashoffset: 0, duration: 1.2, stagger: 0.12 }, "-=0.75")
    .fromTo(
      petals,
      { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" },
      { opacity: 1, scale: 1, duration: 0.9, stagger: 0.08 },
      "-=0.6",
    )
    .fromTo(
      bloom,
      { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" },
      { opacity: 1, scale: 1, duration: 0.7, stagger: 0.06 },
      "-=0.45",
    );

  gsap.to(ornament, {
    y: side === "left" ? -8 : -10,
    x: side === "left" ? 4 : -4,
    duration: 4.6 + index * 0.03,
    ease: "sine.inOut",
    repeat: reducedMotion ? 0 : -1,
    yoyo: true,
  });

  return ornament;
}
