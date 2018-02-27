const { resolve, join } = require('path')
const webpack = require('webpack')
const pkg = require(resolve(__dirname, '../package.json'))
const dllConfig = require('./dll.conf')
const outputPath = dllConfig.path

module.exports = require('./webpack.conf.base')({
  context: resolve(__dirname, '../'),
  entry: dllConfig.entry(pkg),
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json')
    })
  ],
  performance: {
    hints: false
  }
})
