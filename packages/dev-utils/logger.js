const chalk = require('chalk')
const ip = require('ip')
const { log, error } = console
const isProd = process.env.NODE_ENV === 'production'

const divider = chalk.gray('\n-----------------------------------')

const logger = {
  error: err => {
    error(chalk.red(err))
  },

  appStarted: (port, host) => {
    log(chalk.green.bold('Server Started'))

    log(
      `
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}`
    )

    !isProd &&
      log(
        `
${chalk.blue('Waiting For Webpack Bundle...')}`
      )
  }
}

module.exports = logger
