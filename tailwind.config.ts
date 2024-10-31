import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto, sans-serif',
        inter: 'Inter, sans-serif',
        jockey: 'Jockey One, sans-serif',
      },
      aspectRatio: {
        banner: '1650/750',
      },
      height: {
        'revert-layer': 'revert-layer',
      },
      screens: {
        mobile: '480px',
        tablet: '768px',
        laptop: '1280px',
        desktop: '1512px',
      },
      animation: {
        'slide-in-right': 'slide-in-right 1s ease-in-out forwards',
        'slide-out-right': 'slide-out-right 1s ease-in-out forwards',
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
    },
    plugins: [],
  },
};
export default config;
