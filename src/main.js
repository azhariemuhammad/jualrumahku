// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../node_modules/material-design-lite/material.min.css'
import '../node_modules/material-design-lite/material.min.js'
import VModal from 'vue-js-modal'
import store from './vuex/store'
import ReadMore from 'vue-read-more'
import * as VueGoogleMaps from 'vue2-google-maps'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'

Vue.prototype.$http = axios.create({
  baseURL: 'https://us-central1-project-sirius-1510852092492.cloudfunctions.net/app/api/'
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvWE_sIwKbWkiuJQOf8gSk9qzpO96fhfY',
    libraries: 'places'
  }
})

Vue.use(BootstrapVue)

Vue.use(ReadMore)
Vue.use(VModal)
Vue.config.productionTip = false
/* eslint-disable */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
