import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSocketIO from 'vue-socket.io'
Vue.config.productionTip = false

Vue.use(Buefy)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: { path: "/" }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
