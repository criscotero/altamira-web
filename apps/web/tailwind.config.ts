import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Next.js (with or without src/)
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

    // Common extra locations (safe to include)
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#003050",
          navy2: "#002840",
          orange: "#D06010",
          orange2: "#B8500E",
          offwhite: "#F4F6F8",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.18)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },

  // Optional but helpful if you build classNames dynamically
  safelist: [
    "bg-brand-navy",
    "bg-brand-navy2",
    "text-brand-orange",
    "text-brand-orange2",
    "text-brand-offwhite",
    "hover:text-brand-orange",
    "hover:text-brand-orange2",
    "border-white/10",
    "ring-brand-orange",
  ],

  plugins: [],
};

export default config;
