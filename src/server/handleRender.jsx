import url from 'url'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import routes from '../shared/routes'
import configureStore from '../shared/store'
import { logError } from '../shared/services/raven'
import renderStatic from './renderStatic'
import { App } from './components/app'
import getNeeds from './getNeeds'

const handleRender = (req, res) => {
  const store = configureStore({})
  const needs = getNeeds(routes, url.parse(req.url).pathname, store)

  Promise.all(needs)
    .then(() => {
      const context = {}
      const sheet = new ServerStyleSheet()
      const html = renderToString(
        sheet.collectStyles(<App location={req.url} context={context} store={store} />)
      )
      const criticalCss = sheet.getStyleTags()
      const helmet = Helmet.renderStatic()
      const title = helmet.title.toString()
      const meta = helmet.meta.toString()
      const preloadedState = store.getState()

      if (context.url) {
        res.status(301)
        res.setHeader('Location', context.url)
        res.end()
      } else {
        if (context.status) {
          res.status(context.status)
        }
        res.setHeader('Cache-Control', 'public, max-age=0')
        res.send(renderStatic({ html, title, meta, criticalCss, preloadedState }))
      }
    })
    .catch(error => {
      logError(error)
      res.status(500)
      res.setHeader('Cache-Control', 'public, max-age=0')
      res.send(renderStatic())
    })
}

export default handleRender
