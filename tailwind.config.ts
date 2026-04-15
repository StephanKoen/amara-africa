import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dd: {
          gold: "#D4AA68",
          "gold-deep": "#B89050",
          "gold-amber": "#C8A84A",
          "gold-light": "#9A6018",
          white: "#FFFFFF",
          "warm-white": "#F5F0E6",
          linen: "#F0EBE0",
          parchment: "#E8DFC8",
          black: "#0D0D0B",
          surface: "#111210",
          deep: "#161714",
          olive: "#3D4E28",
          ink: "#1A1610",
          cream: "#C8C0AA",
          stone: "#8A7A58",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        label: "0.3em",
        labelWide: "0.34em",
        labelNarrow: "0.28em",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
