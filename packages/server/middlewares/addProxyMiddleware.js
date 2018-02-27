const httpProxyMiddleware = require('http-proxy-middleware')
const winston = require('winston')
const createLogDir = require('../utils/createLogDir')

module.exports = (app, proxyTable) => {
  proxyTable.forEach((domain, context) => {
    app.use(
      context,
      httpProxyMiddleware({
        target: domain,
        pathRewrite: {
          '^/cloud_api': '/api',
          '^/perception_api': '/'
        },
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        logProvider: () => {
          const logDir = createLogDir()

          const tsFormat = () => new Date().toLocaleTimeString()

          const logger = new winston.Logger({
            transports: [
              new (require('winston-daily-rotate-file'))({
                filename: `${logDir}/-proxy.log`,
                timestamp: tsFormat,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                level: 'debug'
              })
            ]
          })

          return {
            log: logger.log,
            debug: logger.debug,
            info: logger.info,
            warn: logger.warn,
            error: logger.error
          }
        }
      })
    )
  })
}
