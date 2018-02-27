const { join } = require('path')
const rootRouter = require('express').Router()
const sendFile = require('../utils/sendFile')
const setupEnv = require('../controller/setupEnv')

rootRouter.all('*', setupEnv.run)
rootRouter.get('/', (req, res) => {
  sendFile(res, setupEnv.fs, `${setupEnv.outputPath}/secA/secA-modA.html`)
})

module.exports = rootRouter
