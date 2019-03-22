import Vue from "vue";
import App from "./App.vue";

import store from "./Store/";

import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "./registerServiceWorker";
import "@babel/polyfill";
import "./assets/globalStyles.scss";

import router from "@/Router";

import VueIziToast from "vue-izitoast";
Vue.use(VueIziToast, { position: "bottomRight" });
import "izitoast/dist/css/iziToast.min.css";

Vue.config.productionTip = false;
Vue.config.devtools = true;

/*
import { withHooks, useState, useEffect } from "vue-hooks";
 
const Setter = withHooks( h => {
  const [sex, изменитьSEX] = useState(0);// state
  useEffect(() => { 
    console.log('SEX effect happening... ');
    document.title = "count is " + sex;
  }); // effect
  return h("div",[h( "button",{ on: { click: () => изменитьSEX(sex + 1) },class: 'btn bg-warning'  },sex)]);
});



const Listtener = withHooks( h => {
  const width = (() => { // custom hook

    const [высота, изменитьВысоту ] =  useState( window.innerWidth );    //срабатывает при инициализации 
    const handleResize = () => {
      window.hand = store;
      store.commit('changeProp', {prop:'height',state:window.innerHeight})
      console.warn('Resize!!')
      изменитьВысоту( window.innerHeight );
    } //срабатывает при изменении
    useEffect(() => {
      console.log('widthEFFECT happening...')
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });

    return высота;
  })()
  return h("div", `window width is: ${width}`);
});

*/
import { hooks } from "vue-hooks";

import i18n from './i18n'
Vue.use(hooks);

window.initVue = props =>
  new Vue({
    router,
    store,
    i18n,
    render: h => h("div", [h(App, { props }) /* h(Setter), h(Listtener)*/])
  }).$mount("#app");
