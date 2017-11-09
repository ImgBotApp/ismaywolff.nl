module.exports = {
  env: {
    browser: true
  },
  root: true,
  plugins: ["prettier"],
  extends: ["airbnb-base/legacy", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "vars-on-top": 0,
    "func-names": 0,
    "no-use-before-define": 0
  }
};
