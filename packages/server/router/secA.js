const { join } = require('path')
const secARouter = require('express').Router()
const sendFile = require('../utils/sendFile')
const setupEnv = require('../controller/setupEnv')

const fileResolve = fileName => join(`${setupEnv.outputPath}/secA`, `${fileName}.html`)

secARouter.all('*', setupEnv.run)
secARouter.get('/:name', (req, res) => {
  sendFile(res, setupEnv.fs, fileResolve(req.params.name))
})

module.exports = secARouter
