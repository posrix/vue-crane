const { existsSync, mkdirSync, renameSync } = require('fs')
const { resolve, join } = require('path')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.conf.prod')
const rimraf = require('rimraf')
const ora = require('ora')
const spinner = ora('Start Building...').start()
const distPath = resolve(process.cwd(), 'dist')
const distTempPath = resolve(process.cwd(), 'dist_temp')
const assetsPath = join(distTempPath, 'static')

if (existsSync(distTempPath)) {
  rimraf.sync(distTempPath)
}

mkdirSync(distTempPath)
mkdirSync(assetsPath)

webpack(webpackConfig, (err, stats) => {
  if (err) {
    rimraf.sync(distTempPath)
    spinner.fail('Building Failed')
    throw err
  } else {
    rimraf.sync(distPath)
    renameSync(distTempPath, distPath)
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n'
    )
    spinner.succeed('Building Successful')
  }
})
