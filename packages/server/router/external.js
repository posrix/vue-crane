const { resolve } = require('path')
const externalRouter = require('express').Router()

externalRouter.get('/external/example', (req, res) => {
  res.sendFile(resolve(__dirname, '../../../external/example.txt'))
})

module.exports = externalRouter
