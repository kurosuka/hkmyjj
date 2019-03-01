// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vuex from 'vuex' 
//import axios from 'axios'

//Vue.prototype.$http = axios
//Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.use(Vuex)

const  vuex_store = new Vuex.Store({
    state:{
        username: '',
        userpass: ''
    },
    mutations:{
        
    }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:vuex_store,
})
