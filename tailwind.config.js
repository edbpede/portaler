/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        secondary: "#6B7C93",
        accent: {
          light: "#E3F2FD",
          DEFAULT: "#90CAF9",
          dark: "#64B5F6",
        },
        neutral: {
          lightest: "#F8FAFC",
          light: "#F1F5F9",
          DEFAULT: "#E2E8F0",
          dark: "#94A3B8",
        },
        rose: {
          light: "#FFE4E4",
          DEFAULT: "#FFA7A7",
          dark: "#FF7B7B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  safelist: [
    "text-amber-500",
    "text-cyan-500",
    "text-emerald-500",
    "text-gray-500",
    "text-indigo-500",
    "text-orange-500",
    "text-pink-500",
    "text-red-500",
    "text-rose-500",
    "text-sky-500",
    "text-teal-500",
    "text-violet-500",
    "text-yellow-600",
  ],
};
