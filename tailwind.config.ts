import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    './index.html',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', ...defaultTheme.fontFamily.sans],
        serif: ['Noto Serif KR', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [typography],
} as Config;
