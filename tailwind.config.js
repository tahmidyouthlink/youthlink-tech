/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.25rem',
              fontWeight: '700',
              lineHeight: '2.5rem',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '700',
              lineHeight: '2.25rem',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '2rem',
            },
            h4: {
              fontSize: '1.25rem',
              fontWeight: '600',
              lineHeight: '1.75rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: ["light", "cupcake"],
  },
};