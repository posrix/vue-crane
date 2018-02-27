const fs = require('fs')

module.exports = (logDir = 'log') => {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
  }
  return logDir
}
