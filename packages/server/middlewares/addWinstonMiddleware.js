const winston = require('winston')
const expressWinston = require('express-winston')
const createLogDir = require('../utils/createLogDir')

const isProd = process.env.NODE_ENV === 'production'
const logDir = createLogDir()
const tsFormat = () => new Date().toLocaleTimeString()

const logger = expressWinston.logger({
  transports: [
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-result.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: isProd ? 'info' : 'verbose'
    })
  ]
})

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      timestamp: tsFormat,
      colorize: true,
      level: 'info',
      json: 'true'
    }),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-error.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: isProd ? 'info' : 'verbose'
    })
  ]
})

module.exports = {
  logger,
  errorLogger
}
