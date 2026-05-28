/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        lavender: {
          light: "#f5f3ff",     // Very light lavender page background
          navbar: "#ffffff",    // White navbar
          primary: "#7c3aed",   // Deep lavender / violet primary accent
          secondary: "#a78bfa", // Medium lavender
          hover: "#ede9fe",     // Soft lavender tint
          border: "#ddd6fe",    // Light lavender border
          heading: "#4c1d95",   // Dark purple heading
          body: "#374151",      // Dark gray body text
          muted: "#9ca3af",     // Muted/placeholder text
        }
      },
    },
  },
  plugins: [],
}
