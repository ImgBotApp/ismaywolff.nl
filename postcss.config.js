/* eslint-disable global-require */

module.exports = {
  plugins: [
    require("postcss-import")({}),
    require("postcss-custom-properties")({}),
    require("postcss-calc")({}),
    require("autoprefixer")({}),
    require("cssnano")({})
  ]
};
