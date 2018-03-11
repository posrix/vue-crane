const { resolve } = require('path')
const { pages, collections } = require(resolve(__dirname, '../config/build.conf'))

class _Symbol_ {
  constructor(symbol) {
    // Pages to be built by webpack
    this.pages = []
    // Auto open url path in browser
    this.urlPath = ''

    let foundInPages = false
    pages.forEach(page => {
      if (page.symbol === symbol) {
        this.pages.push(page)
        this.setUrlPath(page)
        foundInPages = true
        return false
      }
    })

    if (!foundInPages) {
      collections.forEach(collection => {
        if (collection.symbol === symbol) {
          this.urlPath = collection.urlPath
          collection.pages.forEach(page => {
            this.pages.push(page)
          })
        }
      })
    }
  }

  setUrlPath(page) {
    // Replace url path to '/' if page name is 'index'
    this.urlPath =
      page.name === 'index' ? `/${page.path}` : `${page.path ? '/' + page.path : ''}/${page.name}`
  }

  getPages() {
    return this.pages
  }

  getUrlPath() {
    return this.urlPath
  }

  getEntries({ hmr = false } = {}) {
    const container = []
    if (hmr) {
      container.push('webpack-hot-middleware/client?reload=true')
      container.push('eventsource-polyfill')
    }
    const entires = {}
    this.pages.forEach(page => {
      entires[page.name] = container.concat([page.entry])
    })
    return entires
  }
}

module.exports = _Symbol_
