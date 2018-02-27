const { join } = require('path')
const secBRouter = require('express').Router()
const sendFile = require('../utils/sendFile')
const setupEnv = require('../controller/setupEnv')

const fileResolve = fileName => join(`${setupEnv.outputPath}/secB`, `${fileName}.html`)

secBRouter.all('*', setupEnv.run)
secBRouter.get('/:name', (req, res) => {
  sendFile(res, setupEnv.fs, fileResolve(req.params.name))
})

module.exports = secBRouter
