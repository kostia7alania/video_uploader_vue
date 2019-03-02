import Vue from "vue";
import App from "./App.vue";
import store from "./store/";

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import "./registerServiceWorker";
import '@babel/polyfill'
import './assets/globalStyles.scss'

import VueIziToast from 'vue-izitoast';
Vue.use(VueIziToast, { position: "bottomRight" });
import 'izitoast/dist/css/iziToast.min.css';
 
Vue.config.productionTip = false;
Vue.config.devtools = true;

let globalMixin = {   
  methods: {
      getTime() {
          let d = new Date;
          let sec = d.getSeconds();
          sec = sec<10?'0'+sec:sec;
          let min = d.getMinutes();
          min = min<10?'0'+min:min;
          return `${d.getHours()}:${min}:${sec}`;
      }
  }, 
};

Vue.mixin(globalMixin);

window.Vue = new Vue({
  store,
  render: h => h(App)
}).$mount("#app");