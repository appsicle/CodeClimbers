import App from './App.vue'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
}).$mount('#app')
