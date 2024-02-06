import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        header: "4rem",
        content: "calc(100vh - 4rem)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "forest", "nord", "sunset"],
  },
};

export default config;
