/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#F6EFE7",
          pink: "#F6C8CF",
          blue: "#8EC6E8",
          brown: "#6B4A3C",
        },
      },
    },
  },
  plugins: [],
};