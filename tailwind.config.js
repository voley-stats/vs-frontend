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
        "primary": "#FF7F00", // Naranja
        "primary-light": "#FFB300", // Naranja claro
        "secondary": "#FFD700", // Amarillo (solo si necesario)
        "background-light": "#FFFFFF", // Blanco
        "background-dark": "#000000", // Negro
        "background-secondary": "#808080", // Gris
        "text-primary": "#000000", // Negro
        "text-secondary": "#808080", // Gris
        "accent": "#FF7F00", // Naranja
        "gray-light": "#F5F5F5", // Gris muy claro
        "gray-medium": "#808080", // Gris medio
        "gray-dark": "#333333", // Gris oscuro
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "cy-grotesk": ["Inter", "sans-serif"]
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
