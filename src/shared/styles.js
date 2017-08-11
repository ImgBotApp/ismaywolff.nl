export const normalizeCss = `
  html {
    line-height: 1.15;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
  }

  article,
  aside,
  footer,
  header,
  nav,
  section {
    display: block;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  figcaption,
  figure,
  main {
    display: block;
  }

  figure {
    margin: 1em 40px;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: inherit;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  dfn {
    font-style: italic;
  }

  mark {
    background-color: #ff0;
    color: #000;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  audio,
  video {
    display: inline-block;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  img {
    border-style: none;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: sans-serif;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  html [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    display: inline-block;
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type="search"]::-webkit-search-cancel-button,
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  details,
  menu {
    display: block;
  }

  summary {
    display: list-item;
  }

  canvas {
    display: inline-block;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }
`

export const globalCss = `
  /**
   * Fonts
   */

  @font-face {
    font-family: 'Crimson Text';
    src: url('/CrimsonText.woff2') format('woff2'), url('/CrimsonText.woff') format('woff');
    font-display: swap;
  }

  @font-face {
    font-family: Bitter;
    src: url('/Bitter.woff2') format('woff2'), url('/Bitter.woff') format('woff');
    font-display: swap;
  }

  /**
   * Variables
   */

  :root {
    /* fonts */
    --font-regular: 'Crimson Text', serif;
    --font-emphasis: 'Bitter', serif;

    /* sizes */
    --size-smaller: calc(1 / 3 * 1rem);
    --size-small: calc(2 / 3 * 1rem);
    --size-regular: 1rem;
    --size-large: 2rem;
    --size-larger: 5rem;

    /* interface */
    --border-size: 2px;
    --wrapper-width: 30rem;
    --grid-gutter: var(--size-small);

    /* colors */
    --color-transparent-black: rgba(0, 0, 0, 0.25);
    --color-black: rgb(0, 0, 0);
    --color-gray: rgb(230, 230, 230);
    --color-gray-dark: rgb(155, 155, 155);
    --color-white: rgb(255, 255, 255);
    --color-green-light: rgb(123, 215, 132);
    --color-green-dark: rgb(23, 140, 45);
    --color-red-light: rgb(239, 141, 141);
    --color-red-dark: rgb(195, 35, 35);
    --color-blue-light: rgb(141, 171, 239);
    --color-blue-dark: rgb(35, 67, 195);
  }

  /* Box-sizing reset */

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  /* Body settings */

  body {
    background-color: var(--color-white);
  }

  /* Responsive images */

  img {
    max-width: 100%;
  }

  /* No image link borders ever */

  a img {
    border: 0;
  }

  /* Fonts */

  html {
    font-size: 18px;
  }

  @media (min-width: 35em) {
    html {
      font-size: 20px;
    }
  }

  @media (min-width: 40em) {
    html {
      font-size: 22px;
    }
  }

  @media (min-width: 45em) {
    html {
      font-size: 24px;
    }
  }

  body {
    font-family: var(--font-regular);
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-black);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-emphasis);
    font-weight: 400;
  }
`
