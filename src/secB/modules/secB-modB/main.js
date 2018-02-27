import 'core-js'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'common/utils/hmr-events'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'

Vue.use(ElementUI)

new Vue({
  el: '#root',
  components: {
    App
  },
  render: h => h(App)
})
