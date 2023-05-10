/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  semi: false,
  bracketSameLine: false,
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("prettier-plugin-astro"),
  ],
  tailwindConfig: "./tailwind.config.cjs",
}
