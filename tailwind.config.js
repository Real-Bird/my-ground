/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn .5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
