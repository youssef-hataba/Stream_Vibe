/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFF",
        black: "#000",

        // Red Shades
        red: {
          45: "#E50000",
          50: "#FF0000",
          55: "#FF1919",
          60: "#FF3333",
          80: "#FF9999",
          90: "#FFCCCC",
          95: "#FFE5E5",
          99: "#FFFAFA",
        },

        // Black Shades
        black: {
          6: "#0F0F0F",
          8: "#141414",
          10: "#1A1A1A",
          12: "#1F1F1F",
          15: "#262626",
          20: "#333333",
          25: "#404040",
          30: "#4C4C4C",
        },

        // Grey Shades
        gray: {
          60: "#999999",
          65: "#A6A6A6",
          70: "#B3B3B3",
          75: "#BFBFBF",
          80: "#D1D1D3",
          90: "#E4E4E7",
          95: "#F1F1F3",
          97: "#F7F7F8",
          99: "#FCFCFD",
        },
      },
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        'scaleUp': 'scaleUp 1.5s ease ',
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(240px,1fr))",
      },
    },
  },
  plugins: [],
};
