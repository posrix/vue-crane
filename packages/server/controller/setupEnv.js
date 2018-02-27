const es6ClassBindAll = require('es6-class-bind-all')

class SetupEnv {
  constructor() {
    es6ClassBindAll(this)
  }

  run(req, res, next) {
    const app = req.app
    this.outputPath = app.get('outputPath')
    this.fs = app.get('fs')
    next()
  }
}

module.exports = new SetupEnv()
