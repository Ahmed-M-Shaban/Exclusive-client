/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        Poppins: [
          "poppins",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },

      colors: {
        primary: "#FFFFFF",
        primary1: "#363738",
        secondary: "#F5F5F5",
        secondary1: "#FEFAF1",
        secondary2: "#DB4444",
        BG: "#FFFFFF",
        text: "#FAFAFA",
        text1: "#7D8184",
        text2: "#000000",
        button: "#000000",
        // button1: "#00FF66",
        button1: "#006729",
        button2: "#DB4444",
        "hover-button": "#E07575",
        "hover-button2": "#A0BCE0",
        "opacity-black": "#0000004d",
      },

      boxShadow: {
        20: "0px 2px 10px 2px rgba(0,0,0,0.2)",
        5: "0px 1px 13px 0px rgba(0,0,0,0.05)",
      },

      backgroundImage: {
        "light-radial":
          "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 100%)" /*white*/,
        // "light-radial": "radial-gradient(circle, rgba(0,212,255,0.35) 0%, rgba(9,9,121,0.35) 50%, rgba(2,0,36,0.35) 100%)" /* blue */,
      },
    },
  },
  plugins: [],
};
