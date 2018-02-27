const inquirer = require('inquirer')
const fuzzy = require('fuzzy')
const path = require('path')
const chalk = require('chalk')
const { fork } = require('child_process')
const { log } = console
const { symbols, pagination } = require(path.resolve(
  __dirname,
  '../../config/build.conf'
))

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

function searchSymbols(answers, input) {
  input = input || ''
  return new Promise(resolve => {
    const fuzzyResult = fuzzy.filter(input, symbols)
    resolve(fuzzyResult.map(el => el.original))
  })
}

inquirer
  .prompt([
    {
      type: 'autocomplete',
      name: 'symbol',
      message: 'Select a symbol to start',
      pageSize: pagination,
      source: searchSymbols
    }
  ])
  .then(input => {
    log(`
${chalk.blue.bold('Waiting For Server Start...')}
         `)

    fork('./index.js', [
      '-x',
      input.symbol.split(/\s\(|\s</)[0].replace(/\[|\]/g, '')
    ])
  })
