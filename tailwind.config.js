/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.tsx"],
  theme: {
    colors: {
      black: "#262627",
      "black-border": "#3A3943",
      gray: "#DDE0FF1F",
      "gray-light": "#E4EDFB",
      white: "#F8F7FA",
      blue: "#1299E5",
      yellow: "#EFCE203D",
      green: "#0DEE4C3D",
      purple: "#824EF14D",
      "purple-dark": "#0E0E22",
      pink: "#FF44A94D",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
