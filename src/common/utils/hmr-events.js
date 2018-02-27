const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
  hotClient.subscribe(event => {
    if (event.action === 'reload') {
      window.location.reload()
    }
  })
}
