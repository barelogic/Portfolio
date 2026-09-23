/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f4f1eb',
        cream: '#e9e4d7',
        ink: '#161513',
        smoke: '#6e6a61',
        accent: '#ff4d00',
        'accent-deep': '#c93a00',
      },
      fontFamily: {
        display: ['Archivo', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono2: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
