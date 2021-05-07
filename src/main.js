import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const Foo = { template: '<div>foo</div>' }
Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

const routes = [
  { path: '/helloworld', component: Foo },
]
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
