/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
    extend: {},
  },
  plugins: [daisyui],
}

