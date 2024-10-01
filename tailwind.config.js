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
    { pattern: /from-(gray|slate|blue)-900/ },
    { pattern: /from-(indigo|orange|gray)-700/ },
    { pattern: /from-(blue|sky|green)-600/ },
    { pattern: /from-(blue|red|green|orange|yellow|violet|lime|indigo)-500/ },
    { pattern: /from-yellow-400/ },

    { pattern: /to-orange-800/ },
    { pattern: /to-(indigo)-700/ },
    { pattern: /to-(indigo|green)-600/ },
    { pattern: /to-(yellow|cyan|rose|blue|emerald|amber|lime|yellow|indigo|blue|green)-500/ },
    { pattern: /to-black/ },

    { pattern: /shadow-orange-700/ },
    { pattern: /shadow-indigo-600/ },
    { pattern: /shadow-(green|blue|rose|orange|yellow|cyan|indigo|black|lime|violet)-500/ },
    { pattern: /shadow-yellow-400/ },
    { pattern: /shadow-(sm|md|lg|xl|2xl)/ },
    { pattern: /shadow-black/ },
  ],

  plugins: [],
};
