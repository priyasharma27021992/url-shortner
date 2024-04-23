import type { Config } from 'tailwindcss';
import { black, blue, gray, purple, slate, white } from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      gray: gray,
      black: black,
      white: white,
      primary: purple,
      blue: blue,
      slate: slate,
    },
  },
  plugins: [],
};
export default config;
