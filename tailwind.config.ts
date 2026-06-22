import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: "#fbfaf6",
          100: "#f4f1e9",
          200: "#e7e1d5"
        },
        navy: {
          50: "#eef3f7",
          100: "#dce7ef",
          200: "#b9ccda",
          500: "#527391",
          700: "#214565",
          800: "#163553",
          900: "#102842",
          950: "#081a2d"
        }
      },
      boxShadow: {
        soft: "0 18px 42px rgba(8, 26, 45, 0.08)"
      },
      fontFamily: {
        sans: ["Instrument Sans Variable", "Instrument Sans", "Aptos", "Segoe UI", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Newsreader Variable", "Newsreader", "Georgia", "serif"],
        display: ["Instrument Sans Variable", "Instrument Sans", "Aptos", "Helvetica Neue", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
