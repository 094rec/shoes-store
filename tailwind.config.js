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
    { pattern: /from-(gray)-900/ },
    { pattern: /from-(blue)-600/ },
    { pattern: /from-(blue|red)-500/ },

    { pattern: /to-(yellow|cyan|rose|blue)-500/ },
    // {
    //   pattern:
    //     /from-(sky|green|red|orange|gray|blue|yellow|indigo|slate|lime|cyan|violet|emerald|rose|amber|black|[#936550])-900/,
    // },
    // {
    //   pattern:
    //     /to-(indigo|emerald|rose|amber|yellow|cyan|orange|black|blue|lime|violet|red|green|[#936550])-500/,
    // },
    // { pattern: /to-(orange|yellow|blue|black|indigo|orange)-900/ },

    { pattern: /shadow-(sm|md|lg|xl|2xl)/ },
    { pattern: /shadow-(green|blue|rose|orange|yellow|cyan|indigo|black|lime|violet)-500/ },
    { pattern: /shadow-orange-800/ },
  ],

  plugins: [],
};
