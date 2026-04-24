"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AnimatedTitleProps = {
  as?: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
};

export function AnimatedTitle({
  as = "h2",
  className = "",
  children,
}: AnimatedTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      gsap.set(node, { "--title-underline-scale": 0 });

      gsap.fromTo(
        node,
        { autoAlpha: 0.92, y: 10, filter: "blur(0px)" },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 86%",
            once: true,
          },
        },
      );

      gsap.to(node, {
        "--title-underline-scale": 1,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 86%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [children] },
  );

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`animated-title relative text-champagne ${className}`}
    >
      {children}
    </Tag>
  );
}
