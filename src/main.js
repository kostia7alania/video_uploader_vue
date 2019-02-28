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

window.Vue = new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
