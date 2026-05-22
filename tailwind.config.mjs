/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background:         '#FAFAF8',
        foreground:         '#1A1A1A',
        border:             '#D4D0C8',
        'muted-foreground': '#8A8580',
        ember:              '#D94F2B',
      },
      fontFamily: {
        display: ['CameraPlainVariable', 'Georgia', 'serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        tech:    ['CameraPlainVariable', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
