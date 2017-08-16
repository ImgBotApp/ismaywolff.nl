import { minify } from 'html-minifier'
import inlineStore from './templates/inlineStore'
import scripts from './templates/scripts'
import head from './templates/head'
import catchErrors from './templates/catchErrors'

const renderStatic = (
  { html = '', title = '', meta = '', criticalCss = '', preloadedState = {} } = {}
) => {
  const result = `
    <!doctype html>
    <html lang="en">
      <head>
        ${head}
        ${title}
        ${meta}
        ${catchErrors}
        ${criticalCss}
      </head>
      <body>
        <div id="app">${html}</div>
        <script src='https://cdn.polyfill.io/v2/polyfill.min.js'></script>
        ${inlineStore(preloadedState)}
        ${scripts}
      </body>
    </html>
  `

  return minify(result, {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyCSS: true
  })
}

export default renderStatic
