const purgecss = require("@fullhuman/postcss-purgecss");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    process.env.NODE_ENV === "production" && cssnano({ preset: "default" }),
    process.env.NODE_ENV === "production" &&
      purgecss({
        content: [
          "./src/**/*.ts",
          "./src/**/*.tsx",
          "./src/**/*.js",
          "./src/**/*.jsx",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      }),
  ],
};
