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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
a;
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
          45: "#E52000",
          50: "#FF0203",
          55: "#FF0319",
          60: "#FF3223",
          80: "#FF5990",
          90: "#FFCCCC",
          95: "#FFE5E5",
          99: "#FFF7FA",
        },

        // Black Shades
        black: {
          6: "#0F0F0F",
          8: "#141414",
          10: "#1A1A1A",
          12: "#1F1F1F",
          15: "#252525",
          20: "#333333",
          25: "#404040",
          30: "#4C4C4C",
        },

        // Grey Shades
        grey: {
          60: "#595959",
          65: "#666666",
          70: "#737373",
          75: "#808080",
          90: "#E6E6E7",
          95: "#F1F1F3",
          97: "#F7F7F8",
          99: "#FCFCFD",
        },
      },
    },
  },
  plugins: [],
};
