import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./pages/**/*.{ts,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans KR', ...defaultTheme.fontFamily.sans],
        serif: ['Noto Serif KR', ...defaultTheme.fontFamily.serif],
      },
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              quotes: 'none',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} as Config;
