/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#f26c0d",
        "primary-hover": "#e08215", // Derived from Screen 1 accent-hover
        "background-light": "#f8f7f5",
        "background-dark": "#221710",
        "card-white": "#ffffff",
        "text-main": "#1c130d", // Dark brown/black from Screen 2
        "text-sub": "#6b7280", // Gray-500 equivalent or from Screen 2
        "eco-green": "#4caf50",
        "electric-blue": "#3b82f6",
        "success": "#10b981",
        "danger": "#ef4444",
        "warning": "#f59e0b",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "sans": ["Inter", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "3xl": "1.5rem", // 24px
      },
      boxShadow: {
        "soft": "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        "inner-soft": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)",
      }
    },
  },
  plugins: [],
}
