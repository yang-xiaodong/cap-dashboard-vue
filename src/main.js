import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component("vue-json-pretty", VueJsonPretty)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
