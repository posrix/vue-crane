const secARouter = require('./secA')
const secBRouter = require('./secB')
const externalRouter = require('./external')
const rootRouter = require('./root')

module.exports = app => {
  app.use('/secA', secARouter)
  app.use('/secB', secBRouter)
  app.use('/external', externalRouter)
  app.use('/', rootRouter)
}
