/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,tsx,scss}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    colors: {
      primary: "#91ab5d",
      primary600: "#6f873f",
      secondary: "#efebe1",
      white: "#ffffff",
      red: "#A33C32",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#939393",
      "gray-darker": "#424242",
      gray: "#f2f2f2",
      "gray-light": "#d3dce6",
      "gray-lighter": "#f9f9f9",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      qwitcher: ["Qwitcher Grypen", "cursive"],
    },
    fontWeight: {
      bold: 500,
      extrabold: 600,
    },
    extend: {
      spacing: {
        1: "8px",
        2: "12px",
        3: "16px",
        4: "24px",
        5: "32px",
        6: "48px",
      },
    },
  },
  plugins: [],
};
