import type { CSSProperties } from "react";

/** Deterministic 0..1 from index (SSR-safe, no diagonal “stripes”). */
export function hash01(index: number, salt: number): number {
  const x = Math.sin(index * 12.9898 + salt * 78.233 + salt * salt * 0.001) * 43758.5453123;
  return x - Math.floor(x);
}

/**
 * Organic firefly motion: unique position + waypoint offsets per particle.
 * @param amplitude Scale drift distance (e.g. 0.35 on hero, 1 on global forge).
 */
export function fireflyMotionStyle(index: number, amplitude = 1): CSSProperties {
  const h = (salt: number) => hash01(index, salt);
  const px = (t: number, mag: number) =>
    `${Math.round((t - 0.5) * 2 * mag * amplitude)}px`;
  const dur = (7.2 + h(9) * 17.5).toFixed(2);
  const delay = (-h(10) * 14).toFixed(2);

  return {
    left: `${(h(1) * 98.6 + 0.7).toFixed(2)}%`,
    top: `${(h(2) * 98.4 + 0.8).toFixed(2)}%`,
    "--ff-dx1": px(h(3), 34),
    "--ff-dy1": px(h(4), 28),
    "--ff-dx2": px(h(5), 40),
    "--ff-dy2": px(h(6), 34),
    "--ff-dx3": px(h(7), 26),
    "--ff-dy3": px(h(8), 30),
    animation: `firefly-wander ${dur}s cubic-bezier(0.42, 0.05, 0.28, 0.99) infinite`,
    animationDelay: `${delay}s`,
  } as CSSProperties;
}

export function fireflyBright(index: number): boolean {
  return hash01(index, 11) > 0.76;
}
