let proxyTable
switch (process.env.API_ENV) {
  case 'pre':
    proxyTable = new Map([['/api', 'http://pre.example.com']])
    break
  case 'release':
    proxyTable = new Map([['/api', 'http://release.example.com']])
    break
  default:
    proxyTable = new Map([['/api', 'http://test.example.com']])
    break
}

module.exports = proxyTable
