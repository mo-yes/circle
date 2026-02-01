/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ملفات React
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}" // HeroUI
  ],
  darkMode: 'class', // تفعيل الدارك مود
  theme: {
    extend: {},
  },
  plugins: [],
};
