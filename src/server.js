import express from 'express'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import Helmet from 'react-helmet'
import routes from './routes'
import Layout from './components/Layout'
import createStore, { initializeSession } from './store'

const app = express()
const port = 8080

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/*', (req, res) => {
  const context = { }
  const store = createStore()

  store.dispatch(initializeSession())

  const dataRequirements =
        routes
          .filter(route => matchPath(req.url, route)) // filter matching paths
          .map(route => route.component) // map to components
          .filter(comp => comp.serverFetch) // check if components have data requirement
          .map(comp => store.dispatch(comp.serverFetch())) // dispatch data requirement

  Promise.all(dataRequirements).then(() => {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={req.url}>
          <Layout />
        </StaticRouter>
      </ReduxProvider>
    )
    const reactDom = renderToString(jsx)
    const reduxState = store.getState()
    const helmetData = Helmet.renderStatic()

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlTemplate(reactDom, reduxState, helmetData))
  })
})

app.listen(port, () => `Server listening @ http://localhost:${port}`)

function htmlTemplate (reactDom, reduxState, helmetData) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <title>React SSR</title>
        </head>

        <body>
            <div id="app">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${JSON.stringify(reduxState)}
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `
}
