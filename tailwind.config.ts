import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cosmic: {
          950: "#04030a",
          900: "#090714",
          850: "#0e0c1f",
          800: "#15122c",
          700: "#221d45",
          600: "#38316e",
          500: "#584e9f",
        },
        mystic: {
          purple: "#9333ea",
          violet: "#7c3aed",
          indigo: "#6366f1",
          gold: "#f59e0b",
          amber: "#d97706",
          rose: "#f43f5e",
          cyan: "#06b6d4",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "spin-slow": "spin 20s linear infinite",
        "meteor": "meteor 5s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4", filter: "blur(20px)" },
          "100%": { opacity: "0.8", filter: "blur(32px)" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cosmic-mesh": "radial-gradient(circle at 50% -20%, rgba(120, 60, 220, 0.25), transparent 70%), radial-gradient(circle at 10% 80%, rgba(99, 102, 241, 0.15), transparent 50%), radial-gradient(circle at 90% 70%, rgba(245, 158, 11, 0.1), transparent 50%)",
      },
    },
  },
  plugins: [],
};
export default config;

