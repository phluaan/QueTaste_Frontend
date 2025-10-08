/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bộ màu cũ
        primary: "#07689F",
        secondary: "#A2D5F2",
        neutral: "#FAFAFA",
        accent: "#FF7E67",

        // Bộ màu QueTaste
        que: {
          primary: "#8B5E3C", // Nâu đất
          secondary: "#3B7A57", // Xanh lá
          accent: "#D4A017", // Vàng nghệ
          background: "#FFF8F0", // Kem nhạt
          surface: "#FFFFFF", // Trắng
          text: {
            main: "#2D2A26", // Chữ chính
            muted: "#6B6B6B", // Chữ phụ
          },
          danger: "#C0392B", // Cảnh báo
        },
      },
    },
  },
  plugins: [],
};
