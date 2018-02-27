/* eslint-disable */
const { join } = require('path')
const fs = require('fs')
const exists = fs.existsSync
const writeFile = fs.writeFileSync
const pkg = require(join(process.cwd(), 'package.json'))
const dllConfig = require('../config/dll.conf')
const outputPath = dllConfig.path
const dllManifestPath = join(outputPath, 'package.json')

require('shelljs/global')

mkdir('-p', outputPath)

echo('Building the Webpack DLL...')

/**
 * Create a package.json to prevent npm install warning
 */
if (!exists(dllManifestPath)) {
  writeFile(
    dllManifestPath,
    JSON.stringify(
      {
        name: 'dlls',
        private: true,
        author: pkg.author,
        version: pkg.version
      },
      null,
      2
    ),
    'utf8'
  )
}

exec('webpack --display-chunks --color --config ./config/webpack.conf.dll.js')
