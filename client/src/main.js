import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VueResizeText from 'vue-resize-text';

Vue.config.productionTip = false
const socket = io.connect('http://localhost:3000');
Vue.use(VueSocketIOExt, socket);
Vue.use(VueResizeText)
Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
