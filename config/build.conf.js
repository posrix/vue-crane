const { resolve } = require('path')

const pages = (exports.pages = [
  {
    path: 'secA',
    name: 'secA-modA',
    title: 'sectionA - ModuleA',
    symbol: 'sca1',
    entry: resolve(__dirname, '../src/secA/secA-modA/main.js')
  },
  {
    path: 'secA',
    name: 'secA-modB',
    title: 'sectionA - ModuleB',
    symbol: 'sca2',
    entry: resolve(__dirname, '../src/secA/secA-modB/main.js')
  },
  {
    path: 'secB',
    name: 'secB-modA',
    title: 'sectionB - ModuleA',
    symbol: 'scb1',
    entry: resolve(__dirname, '../src/secB/secB-modA/main.js')
  },
  {
    path: 'secB',
    name: 'secB-modB',
    title: 'sectionB - ModuleB',
    symbol: 'scb2',
    entry: resolve(__dirname, '../src/secB/secB-modB/main.js')
  }
])

const collections = (exports.collections = [
  {
    symbol: 'sca',
    description: 'secA',
    urlPath: '/secA/secA-modA',
    pages: pages.filter(page => page.path === 'secA')
  },
  {
    symbol: 'scb',
    description: 'secB',
    urlPath: '/secB/secB-modA',
    pages: pages.filter(page => page.path === 'secB')
  },
  {
    symbol: 'pro',
    description: 'project',
    urlPath: '/',
    pages
  }
])

exports.symbols = [
  ...pages.map(page => `[${page.symbol}] (${page.path ? page.path + '/' : ''}${page.name}.html)`),
  ...collections.map(collection => `[${collection.symbol}] <${collection.description}>`)
]

exports.pagination = 10
