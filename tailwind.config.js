/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    // 他のカスタムディレクトリがあればここに追加
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
