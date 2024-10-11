const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E88E5',
        'secondary': '#00203f',
        'vanilla-cream': '#F4EBD0',
        'action': '#E53935',
        'action-hover': '#D32F2F',
        'hover': '#1976D2',
        'gray-light': '#E5E7EB', /* Replacing gray-200 */
        'gray-normal': '#4B5563', /* Replacing gray-normal */
        'gray-dark': '#1F2937', /* Replacing gray-dark */
      },
    },
},
  darkMode: "class",
  plugins: [
    nextui(),
    require("tailwindcss-animate")
  ]
};