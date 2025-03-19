/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1e40af", // 示例主色
          secondary: "#9333ea",
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"], // 可选：现代字体
        },
      },
    },
    plugins: [],
  };