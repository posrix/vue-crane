const { resolve } = require('path')
const { readFileSync, existsSync } = require('fs')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const cheerio = require('cheerio')
const argv = require('minimist')(process.argv.slice(2))
const _Symbol_ = require('../scripts/symbol')
const dllConfig = require('./dll.conf')
const logger = require('../packages/dev-utils/logger')
const htmlGenerator = require('../scripts/htmlGenerator')

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin(),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: false
  })
]

process.env.ANALYZE &&
  plugins.push(new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin())

module.exports = require('./webpack.conf.base')({
  entry: new _Symbol_(argv.x).getEntries({ hmr: true }),
  output: {
    filename: '[name].js',
    chunkFilename: '[id].[name].js'
  },
  module: {
    rules: [
      {
        resource: {
          test(filePath) {
            return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath)
          }
        },
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        resource: {
          test: /\.module\.css$/
        },
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        resource: {
          test: /\.vue$/
        },
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              css: [
                'vue-style-loader',
                {
                  loader: 'css-loader'
                }
              ]
            }
          }
        }
      }
    ]
  },
  plugins: plugins.concat(dependencyHandlers()).concat(
    htmlGenerator({
      templateContent: templateContent()
    })
  ),
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  }
})

function dependencyHandlers() {
  const manifestPath = resolve(dllConfig.path, 'dependencies.json')

  if (!existsSync(manifestPath)) {
    logger.error('The DLL manifest is missing. Please run `npm run build:dll`')
    process.exit(0)
  }

  return new webpack.DllReferencePlugin({
    context: resolve(__dirname, '../'),
    manifest: require(manifestPath)
  })
}

function templateContent() {
  const html = readFileSync(
    resolve(__dirname, '../public/template.html')
  ).toString()
  const doc = cheerio(html)
  const body = doc.find('body')
  const name = 'dependencies'

  body.append(
    `<script data-dll='true' type='text/javascript' src='/${
      name
    }.dll.js'></script>`
  )

  return doc.toString()
}
