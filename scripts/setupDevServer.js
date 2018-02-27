const { join } = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const dllConfig = require('../config/dll.conf')

const addDevMiddlewares = (app, webpackConfig) => {
  const compiler = webpack(webpackConfig)
  const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  })

  // Webpack dll file host
  app.get(/\.dll\.js$/, (req, res) => {
    res.sendFile(join(dllConfig.path, req.path.replace(/^\//, '')))
  })

  app.set('outputPath', compiler.outputPath)
  app.set('fs', devMiddleware.fileSystem)
  app.use(devMiddleware)

  const hotMiddleware = webpackHotMiddleware(compiler)
  // Force page reload once html-webpack-plugin template changes
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
      hotMiddleware.publish({
        action: 'reload'
      })
      cb()
    })
  })
  app.use(hotMiddleware)
}

module.exports = (app, webpackConfig) => {
  addDevMiddlewares(app, webpackConfig)
  return app
}
