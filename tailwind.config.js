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
        "primary": "#FF7F00",
        "primary-light": "#FFB300",
        "background-light": "#f6f7f8",
        "background-dark": "#3A3A3A",
        "background-secondary": "#4A4A4A",
        "text-primary": "#FFFFFF",
        "text-secondary": "#E5E5E5",
        "accent": "#FF7F00",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
