import { minify } from 'html-minifier'
import inlineStore from './templates/inlineStore'
import preloadDynamic from './templates/preloadDynamic'
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
        ${preloadDynamic}
        ${criticalCss}
      </head>
      <body>
        <div id="app">${html}</div>
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
