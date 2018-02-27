const { exec } = require('child_process')

exec('npm -v', (err, stdout, stderr) => {
  if (err) throw err
  if (parseFloat(stdout) < 3) {
    throw new Error('You need npm version @>=3')
    process.exit(1)
  }
})
