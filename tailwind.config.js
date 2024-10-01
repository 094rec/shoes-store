/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      xx: '425px',
      xs: '550px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  safelist: [
    { pattern: /from-(red|green|blue|emerald|yellow|purple|pink|orange|indigo|gray)-500/ },
    { pattern: /to-(red|green|blue|emerald|yellow|purple|pink|orange|indigo|gray)-500/ },

    { pattern: /shadow-(sm|md|lg|xl|2xl)/ },
    { pattern: /shadow-(red|green|blue|emerald|yellow|purple|pink|orange|indigo|gray)-500/ },
  ],
  plugins: [],
};
