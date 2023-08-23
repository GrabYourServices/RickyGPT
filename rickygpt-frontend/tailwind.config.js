/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "plurple": "var(--plurple-color)",
        "yeelow": "var(--yeelow-color)"
      },
      fontFamily: {
        primary: ['ArchitectsDaughter', 'sans-serif'],
        secondary: ['Pacifico', 'sans-serif']
      }
    },
  },
  plugins: [],
}
