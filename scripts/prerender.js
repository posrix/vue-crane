const { resolve } = require('path')
const prerenderSEO = require('prerender-seo')

prerenderSEO(
  resolve(__dirname, '../dist'),
  '#root',
  ['/secA/modA.html', '/secB/modA.html'],
  {
    destDir: resolve(__dirname, '../dist')
  }
)
