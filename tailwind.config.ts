import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // 这一行非常关键！
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;