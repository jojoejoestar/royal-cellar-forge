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

      if (node.dataset.animatedTitleSplit !== "true") {
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        const textNodes: Text[] = [];
        let current = walker.nextNode();

        while (current) {
          const textNode = current as Text;
          if (
            textNode.parentElement &&
            textNode.parentElement.closest(".animated-title-word") === null &&
            textNode.textContent &&
            textNode.textContent.trim().length > 0
          ) {
            textNodes.push(textNode);
          }
          current = walker.nextNode();
        }

        textNodes.forEach((textNode) => {
          const fragment = document.createDocumentFragment();
          const chunks = (textNode.textContent ?? "").split(/(\s+)/);

          chunks.forEach((chunk) => {
            if (!chunk) return;
            if (/^\s+$/.test(chunk)) {
              fragment.appendChild(document.createTextNode(chunk));
              return;
            }

            const span = document.createElement("span");
            span.className = "animated-title-word inline-block";
            span.textContent = chunk;
            fragment.appendChild(span);
          });

          textNode.parentNode?.replaceChild(fragment, textNode);
        });

        node.dataset.animatedTitleSplit = "true";
      }

      const words = node.querySelectorAll<HTMLElement>(".animated-title-word");

      gsap.set(words, {
        y: 100,
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
      });

      gsap.to(words, {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: node,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#FFF8D6] to-[#D4AF37] bg-[length:200%_auto] animate-shimmer drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] ${className}`}
    >
      {children}
    </Tag>
  );
}
