import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        sm: "0 1px 2px 0 var(--foreground)",
        md: "0 4px 6px -1px var(--foreground), 0 2px 4px -2px var(--foreground)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const scrollbars = {
        ".custom-scrollbar": {
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "var(--foreground)",
            borderRadius: "8px",
          },
        },
      };

      addUtilities(scrollbars);
    },
  ],
};
export default config;
