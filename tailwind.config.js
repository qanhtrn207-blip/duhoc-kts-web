/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        brand: {
          navy: "#102A43",
          "navy-light": "#1E3D59",
          "navy-dark": "#0B1D2E",
          blue: "#2563EB",
          "blue-hover": "#1D4ED8",
          "blue-light": "#EFF6FF",
          gold: "#F4B942",
          "gold-hover": "#E5A932",
          "gold-light": "#FEF9EE",
          gray: "#F7F9FC",
          "gray-border": "#E2E8F0",
          text: "#334155",
          "text-muted": "#64748B",
        },
      },
      fontFamily: {
        sans: [
          "'Plus Jakarta Sans'",
          "'Be Vietnam Pro'",
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleUp: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0.4)" },
          "50%": { boxShadow: "0 0 0 10px rgba(37, 99, 235, 0)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out infinite 2s",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "scale-up": "scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-glow": "pulseGlow 2.5s infinite",
      },
    },
  },
  plugins: [],
};
