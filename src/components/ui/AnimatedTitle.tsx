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

function wrapTextNodes(root: HTMLElement) {
  const skipSelector =
    "script, style, noscript, textarea, .animated-title-token, .animated-title-sheen";

  const walk = (el: HTMLElement) => {
    const children = Array.from(el.childNodes);
    children.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const textNode = child as Text;
        const raw = textNode.textContent ?? "";
        if (!raw.trim()) return;

        const frag = document.createDocumentFragment();
        const parts = raw.split(/(\s+)/);

        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }

          const token = document.createElement("span");
          token.className =
            "animated-title-token relative inline-block align-baseline px-[0.02em]";

          const sheen = document.createElement("span");
          sheen.className =
            "animated-title-sheen pointer-events-none absolute inset-0 mix-blend-screen opacity-0";
          sheen.setAttribute("aria-hidden", "true");

          const inner = document.createElement("span");
          inner.className = "relative z-10";
          inner.textContent = part;

          token.appendChild(inner);
          token.appendChild(sheen);
          frag.appendChild(token);
        });

        textNode.parentNode?.replaceChild(frag, textNode);
        return;
      }

      if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as HTMLElement;
        if (element.matches(skipSelector)) return;
        walk(element);
      }
    });
  };

  walk(root);

  const tokens = root.querySelectorAll<HTMLElement>(".animated-title-token");
  tokens.forEach((token, idx) => {
    token.style.setProperty("--sheen-delay", `${idx % 10}`);
  });
}

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

      if (node.dataset.animatedTitleInit !== "true") {
        wrapTextNodes(node);
        node.dataset.animatedTitleInit = "true";
      }

      const tokens = node.querySelectorAll<HTMLElement>(".animated-title-token");
      const sheens = node.querySelectorAll<HTMLElement>(".animated-title-sheen");

      gsap.set(tokens, { y: 18, opacity: 0 });
      gsap.set(sheens, { opacity: 0 });

      gsap.to(tokens, {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: "power4.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: node,
          start: "top 86%",
          once: true,
        },
      });

      gsap.to(sheens, {
        opacity: 0.55,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.04,
        delay: 0.05,
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
      className={`relative text-champagne drop-shadow-[0_0_15px_rgba(212,175,55,0.22)] ${className}`}
    >
      {children}
    </Tag>
  );
}
