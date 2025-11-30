/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        point: "#5a7b62",
        main2: "#cde3d3",
        main3: "#9fc2a7",
        black1: "#111827",
        gray3: "#9ca3af",
        gray4: "#6b7280",
        background: "#f5f7fa",
      },
    },
  },
  plugins: [],
};