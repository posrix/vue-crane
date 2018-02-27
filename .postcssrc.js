module.exports = {
  plugins: [
    require('postcss-import'),
    require('precss'),
    require('autoprefixer')({
      browsers: ['last 2 versions', 'safari >= 7', 'IE >= 9', '> 1%']
    }),
    require('rucksack-css')
  ]
}
