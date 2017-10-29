module.exports = {
  "extends": "stylelint-config-standard",
  "plugins": [
    "stylelint-no-unsupported-browser-features"
  ],
  "rules": {
    "at-rule-empty-line-before": "always",
    "font-family-name-quotes": "always-where-recommended",
    "at-rule-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,
    "color-named": "never",
    "declaration-no-important": true,
    "font-weight-notation": "numeric",
    "plugin/no-unsupported-browser-features": [true, {
      "ignore": ["calc", "rem"],
      "severity": "warning"
    }]
  }
}
