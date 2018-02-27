module.exports = {
  extends: [
    'plugin:vue/essential'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.conf.prod.js'
      }
    }
  }
}
