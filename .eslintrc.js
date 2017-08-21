module.exports = {
  "extends": [
    "airbnb"
  ],
  "rules": {
    // Underscore dangling is fine
    "no-underscore-dangle": 0,

    // Ignored because prettier takes care of this
    "arrow-parens": 0,
    "comma-dangle": 0,
    "semi": 0,
    "no-mixed-operators": 0,
    "react/jsx-wrap-multilines": 0,
    "react/no-unescaped-entities": 0,

    // Enforce the consistent use of if statements
    "curly": ["error", "all"],

    // Enforce the consistent use of functions
    "func-style": ["error", "expression"],
    "prefer-arrow-callback": "error",

    // Import settings
    "import/no-extraneous-dependencies": 0,
    "import/order": ["error"],
    "import/prefer-default-export": 0,

    // Comment settings
    "capitalized-comments": ["error", "always", { "ignorePattern": "prettier-ignore" }],
    "no-warning-comments": ["error", { "terms": ["todo", "fixme"], "location": "anywhere" }],
    "spaced-comment": ["error", "always"],
    "lines-around-comment": ["error", {
      "beforeBlockComment": true,
      "afterBlockComment": true,
      "beforeLineComment": true,
      "afterLineComment": false,
      "allowBlockStart": true
    }]
  }
}
