/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F0D23',
          light: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#AB8BFF',
          light: '#7B5CF5',
        },
        accent: {
          DEFAULT: '#AB8BFF',
          light: '#7B5CF5',
        },
        dark: {
          100: '#1A1A2E',
          200: '#2A2A3A',
          light: {
            100: '#F5F5F5',
            200: '#E5E5E5',
          },
        },
        light: {
          100: '#A8B5DB',
          200: '#8A97BF',
          300: '#6C79A3',
          light: {
            100: '#6C79A3',
            200: '#4A5783',
            300: '#283563',
          },
        },
      }
    },
  },
  plugins: [],
}