export default {
  darkMode: "class", // Enable dark mode using a class
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF5722", // A vibrant orange-red for better contrast
        secondary: "#00B8D9", // A calmer cyan to balance with primary
        accent: "#9C27B0", // A bright purple for highlights
        background: "#121212", // Deep black background for dark mode
        lightBackground: "#FAFAFA", // Lighter background for light mode
        textPrimary: "#ECEFF1", // Light text for dark mode
        textSecondary: "#1C1C1C", // Dark text for light mode
        buttonBg: "#424242", // Subtle dark button background
        buttonBgHover: "#616161", // Hover color for better feedback
      },
    },
  },
  plugins: [],
};
