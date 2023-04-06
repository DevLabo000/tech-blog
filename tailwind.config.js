module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F78DA7',
        'secondary-pink': '#ecc94b',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
