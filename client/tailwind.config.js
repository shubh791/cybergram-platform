/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      keyframes: {

        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },

        glowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 30px rgba(0,255,150,0.4)",
          },
          "50%": {
            boxShadow: "0 0 70px rgba(0,255,150,0.8)",
          },
        },

      },

      animation: {

        "float-slow": "floatSlow 6s ease-in-out infinite",

        "glow-pulse": "glowPulse 2.5s ease-in-out infinite",

      },
    },
  },
  plugins: [],
};
