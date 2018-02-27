module.exports = (res, fs, file, next) => {
  fs.readFile(file, (err, file) => {
    if (err) {
      res.status(404)
    } else {
      res.send(file.toString())
    }
  })
}
