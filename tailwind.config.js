/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("postcss-nested"),
    require("autoprefixer"),
    require("tailwind-scrollbar-hide"),
  ],
};
