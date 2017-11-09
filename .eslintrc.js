module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: ["airbnb-base", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/no-extraneous-dependencies": 0
  }
};
