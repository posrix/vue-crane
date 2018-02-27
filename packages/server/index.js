const { resolve, join } = require('path')
const fs = require('fs')
const express = require('express')
const compression = require('compression')
const opn = require('opn')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const addProxyMiddleware = require('./middlewares/addProxyMiddleware')
const addWinstonMiddleware = require('./middlewares/addWinstonMiddleware')
const proxyTable = require('./config/proxy-table')
const logger = require('dev-utils/logger')
const router = require('./router')
const bodyParser = require('body-parser')

const app = express()
const isProd = process.env.NODE_ENV === 'production'

const serverConfig = isProd
  ? require(resolve(__dirname, './config/prod-server-config'))
  : require(resolve(__dirname, './config/dev-server-config'))

if (isProd) {
  const outputPath = resolve(__dirname, '../../dist')
  const publicPath = '/static'
  const staticPath = join(outputPath, './static')
  // Define runtime variable through differnent environment
  app.set('outputPath', outputPath)
  app.set('fs', fs)
  // Static file host
  app.use(publicPath, express.static(staticPath))
  // Cache the favicon in memory
  app.use(favicon(join(outputPath, 'favicon.ico')))
  // Compresses server responses http://mxs.is/googmy
  app.use(compression())
} else {
  const setupDevServer = require(resolve(
    __dirname,
    '../../scripts/setupDevServer'
  ))

  setupDevServer(
    app,
    require(resolve(__dirname, '../../config/webpack.conf.dev'))
  )
}

app.use(cookieParser())

addProxyMiddleware(app, proxyTable)

app.use(addWinstonMiddleware.logger)

app.use(bodyParser.json())

router(app)

app.use(addWinstonMiddleware.errorLogger)

const { port, host } = serverConfig

app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message)
  }

  logger.appStarted(port, host)

  if (!isProd) {
    const argv = require('minimist')(process.argv.slice(2))
    const _Symbol_ = require(resolve(__dirname, '../../scripts/symbol.js'))
    const urlPath = new _Symbol_(argv.x).getUrlPath()
    opn(`http://${host}:${port}${urlPath}`)
  }
})
