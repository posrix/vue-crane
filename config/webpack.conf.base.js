const { resolve } = require('path')
const webpack = require('webpack')

module.exports = options => ({
  entry: options.entry,
  output: Object.assign(
    {
      path: resolve(__dirname, '../dist_temp'),
      publicPath: '/'
    },
    options.output
  ),
  module: {
    rules: [
      {
        resource: {
          test: /\.(js|vue)$/,
          include: resolve(__dirname, '../src')
        },
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }
        ]
      },
      {
        resource: {
          test: /\.js$/,
          include: [resolve(__dirname, '../src')]
        },
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        resource: {
          test: /\.json$/
        },
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        resource: {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'static/images/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        resource: {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'static/fonts/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ].concat(options.module ? options.module.rules : [])
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
      'process.env.API': JSON.stringify('/api/V4/')
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['.js', '.vue', '.json'],
    mainFields: ['browser', 'module', 'main'],
    modules: ['app', 'node_modules'],
    unsafeCache: true
  },
  target: 'web',
  devtool: options.devtool,
  performance: options.performance || {}
})
