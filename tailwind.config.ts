import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        letterSheen: {
          "0%": { transform: "translateX(-140%)" },
          "100%": { transform: "translateX(140%)" },
        },
      },
      animation: {
        "letter-sheen": "letterSheen 3.6s ease-in-out infinite",
      },
    },
  },
};

export default config;
