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
          navy: "#0B2A3C",        // Primary brand blue (trust, intelligence)
          navy2: "#071E2D",       // Deep hero/nav background (authority, depth)
        
          orange: "#C95A14",      // Primary CTA (action, confidence)
          orangeHover: "#D35F17", // Hover / active (feedback)
          orangeSoft: "#F3A26D",  // Subtle accents only
        
          offwhite: "#F5F7FA",    // Main background (cognitive ease)
          gray: "#8FA3B0",        // Secondary text
          grayDark: "#5E7280",    // Muted UI text
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
