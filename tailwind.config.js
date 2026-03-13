/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6750A4",
        primaryLight: "#EADDFF", // Naya: Light shade for backgrounds
        primaryDark: "#21005D",  // Naya: Darker shade for text/contrast
        onPrimary: "#FFFFFF",
        surface: "#FFFBFE",
        onSurface: "#1C1B1F",
        // Naya: Glass effect ke liye neutral color
        glass: "rgba(255, 255, 255, 0.25)", 
      },
      fontFamily: {
        // Naya: Modern clean look ke liye sans-serif ensure karna
         sans: ['Plus Jakarta Sans', 'sans-serif'] 
      },
      // Bento Grid ke liye row spans extend kiye hain
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        'layout': '200px minmax(900px, 1fr) 100px',
      },
      keyframes: {
        appear: {
          '0%': { opacity: 0, transform: 'translateY(20px)' }, // Thora sa movement add kiya
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        dust: {
          '0%': { opacity: 1, transform: 'translateY(0px) scale(1)' },
          '100%': { opacity: 0, transform: 'translateY(-20px) scale(0.9)' },
        },
        // Naya: Slow floating animation for background blobs
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        appear: 'appear 0.6s cubic-bezier(0.16, 1, 0.3, 1)', // Smooth modern easing
        dust: 'dust 0.5s ease-out',
        float: 'float 6s ease-in-out infinite',
      },
      borderRadius: {
        material: "24px",
        'xl-material': "32px", // Bento grid cards ke liye bada radius
      },
      boxShadow: {
        material: "0px 3px 6px rgba(0, 0, 0, 0.15)",
        'glass': "0 8px 32px 0 rgba(31, 38, 135, 0.15)", // Glassmorphism shadow
      },
    },
  },
  plugins: [],
};