import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueLodash from 'vue-lodash'
import VueSocketIO from 'vue-socket.io'
import Chat from 'vue-beautiful-chat'
import Notifications from 'vue-notification'
Vue.use(require('vue-moment'));
Vue.use(Notifications)
Vue.config.productionTip = false
Vue.use(Chat);


Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
}))

new Vue({
  
  render: h => h(App),
}).$mount('#app')
