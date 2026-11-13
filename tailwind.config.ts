import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          50: "#FAF5F7",
          100: "#F4EBF0",
          200: "#E3CDD9",
          300: "#CB9EB9",
          400: "#9A6183",
          500: "#6B3B57",
          600: "#542E45",
          700: "#452639",
          800: "#381E2E",
          900: "#2B1623",
          envelope: "#432E3A",
          dark: "#2A1B24",
        },
        vintage: {
          cream: "#FAF7F2",
          paper: "#FDFBF7",
          bg: "#F7F4EE",
          parchment: "#F3EDE3",
          border: "#E9DFD3",
          gold: "#C5A059",
          "gold-light": "#E0C287",
          "gold-dark": "#9A7A38",
          charcoal: "#302826",
          muted: "#7A6F68",
        },
      },
      fontFamily: {
        script: ["'Alex Brush'", "'Great Vibes'", "'Pinyon Script'", "cursive"],
        alex: ["'Alex Brush'", "cursive"],
        vibes: ["'Great Vibes'", "cursive"],
        pinyon: ["'Pinyon Script'", "cursive"],
        cinzel: ["'Cinzel'", "serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        playfair: ["'Playfair Display'", "serif"],
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "'Montserrat'", "sans-serif"],
        montserrat: ["'Montserrat'", "sans-serif"],
      },
      boxShadow: {
        envelope: "0 14px 35px -8px rgba(35, 20, 28, 0.35)",
        wax: "0 4px 14px rgba(130, 95, 30, 0.4)",
        polaroid: "0 6px 20px -3px rgba(45, 35, 30, 0.18)",
        embossed: "0 8px 30px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
