/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#2c3e50',
        'soft-blue': '#3498db',
        'charcoal-gray': '#34495e',
        'white': '#ffffff',
      },
    },
  },
  plugins: [],
};
