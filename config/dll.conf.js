const { join } = require('path')
const pullAll = require('lodash/pullAll')
const uniq = require('lodash/uniq')

const dllConfig = {
  exclude: ['normalize.css'],

  include: ['eventsource-polyfill'],

  path: join(__dirname, '../node_modules/dlls'),

  entry(pkg) {
    const dependencyNames = Object.keys(pkg.dependencies)
    const exclude = dllConfig.exclude
    const include = dllConfig.include
    const includeDependencies = uniq(dependencyNames.concat(include))

    return {
      dependencies: pullAll(includeDependencies, exclude)
    }
  }
}

module.exports = dllConfig
