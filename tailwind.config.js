/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px", // Extra small devices (older phones)
        sm: "480px", // Small devices (modern phones)
        md: "640px", // Medium devices (small tablets, large phones)
        lg: "768px", // Large devices (tablets, small laptops)
        xl: "1024px", // Extra large devices (laptops and desktops)
        "2xl": "1280px", // Extra extra large devices (large desktops)
      },
    },
  },
  plugins: [],
};
