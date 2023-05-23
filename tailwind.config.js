/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./containers/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        fadein: "fadeIn .5s ease-in-out forwards",
        fadeside: "fadeSide .5s ease-in-out forwards",
        "fadeside-reverse": "fadeSideReverse .5s ease-in-out forwards",
        scaleup: "scaleUp .3s ease-in-out forwards",
        scaledown: "scaleDown .1s ease-in-out forwards",
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
        fadeSide: {
          "0%": {
            opacity: 0,
            transform: "translateX(100px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        fadeSideReverse: {
          "0%": {
            opacity: 1,
            transform: "translateX(0)",
          },
          "100%": {
            opacity: 0,
            transform: "translateX(100px)",
          },
        },
        scaleUp: {
          "0%": {
            transform: "scale(0)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        scaleDown: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0)",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin")],
};
