/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FCFAF7',
          100: '#FBF8F3', // Warm Alabaster Cream
          200: '#F3EDE2', // Soft Oatmeal Ivory
          300: '#E8DFC8',
          400: '#D5C7B0',
        },
        espresso: {
          950: '#120E0C',
          900: '#1C1512', // Deep Espresso
          800: '#2C2522', // Roasted Charcoal
          700: '#433833',
        },
        taupe: {
          500: '#7A6E65', // Warm Taupe
          400: '#94887E',
          300: '#B2A79E',
        },
        bocca: {
          green: '#1A382B', // Authentic Cafe Bocca Forest Green
          gold: '#C59A45',
          bean: '#633820',  // Rich Coffee Bean Roasted
          clay: '#B2623D',
        }
      },
      fontFamily: {
        display: ['Philosopher', 'serif'],
        flourish: ['Sacramento', 'cursive'],
        script: ['Cookie', 'cursive'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.18em',
        luxury: '0.28em',
        tightest: '-0.035em',
      }
    },
  },
  plugins: [],
};
