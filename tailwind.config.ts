import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3498db", // Blue
        success: "#2ecc71", // Green
        danger: "#e74c3c", // Red
        warning: "#f1c40f", // Yellow
        lightGray: "#f7f7f7", // Light Gray
        darkGray: "#333333", // Dark Gray
        white: "#ffffff", // White
      },
    },
  },
  plugins: [],
};
export default config;
