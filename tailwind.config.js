export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6750A4",
        onPrimary: "#FFFFFF",
        surface: "#FFFBFE",
        onSurface: "#1C1B1F",
      },
       keyframes: {
    appear: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    dust: {
      '0%': { opacity: 1, transform: 'translateY(0px) scale(1)' },
      '100%': { opacity: 0, transform: 'translateY(-20px) scale(0.9)' },
    },
  },
  animation: {
    appear: 'appear 0.5s ease-in',
    dust: 'dust 0.5s ease-out',
  },
      scrollPadding: {
        'top-20': '80px',
      },
      borderRadius: {
        material: "24px",
      },
      boxShadow: {
        material: "0px 3px 6px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
