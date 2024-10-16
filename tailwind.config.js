export default {
  darkMode: "class", // Enable dark mode using a class
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF8C00", // Custom colors from your logo
        secondary: "#00FFCC", // Customize the colors as per logo
        accent: "#6200EA",
        background: "#1A1A1A", // Example dark background color
        lightBackground: "#F5F5F5", // Add a light background for light mode if needed
      },
    },
  },
  plugins: [],
};
