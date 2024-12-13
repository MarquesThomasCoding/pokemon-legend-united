import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border|from|to)-(red|green|blue|yellow|orange|purple|pink|gray|black|white)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        impact: 'Impact',
        pokemonHollow: 'Pokemon Hollow',
        pokemonSolid: 'Pokemon Solid',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        pokeball: 'animate-pokeball 1s infinite ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
