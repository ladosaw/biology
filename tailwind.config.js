/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#88C273",
        secondary: "#536493",
        backgroundWhite: "#FFF1DC",
        textPrimary: "#353434",
        bglightBlue: "#E0E6F7",
      },
    },
  },
  plugins: [],
};
