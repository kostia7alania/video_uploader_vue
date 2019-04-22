var _global = this || window || {};



import Vue from "vue";
import App from "./App.vue";

import store from "./Store/";

import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

import "./registerServiceWorker";
//import "@babel/polyfill";
import "./assets/globalStyles.scss";
import router from "@/Router";
import VueIziToast from "vue-izitoast";
Vue.use(VueIziToast, { position: "bottomRight" });
import "../node_modules/izitoast/dist/css/iziToast.min.css";




import { library, dom, config } from '@fortawesome/fontawesome-svg-core'
import { faCoffee,faCloudDownloadAlt,faSyncAlt,faSplotch,faSkullCrossbones,faSmileWink, faSpinner,faFilm,
  faUpload, faAngleDoubleLeft, faTimes,
  faStopwatch, faBell, faCalendarAlt, faCheck,
  faBan,faAngleRight,faAngleLeft,faTasks,faFlagCheckered,faExclamationTriangle,faExclamation,
  faSort, faSortAlphaDown, faSortAlphaUp, faShareSquare,faTrashAlt,faStopCircle,
  faFolderOpen,faHandPaper,faArrowUp,faArrowDown,faVideoSlash
  }
from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faTelegramPlane} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add( faCoffee,faCloudDownloadAlt,faSyncAlt,faSplotch,faSkullCrossbones,faSmileWink, faSpinner,faFilm,
  faUpload, faAngleDoubleLeft, faTimes, faYoutube, faCoffee,
  faStopwatch, faBell, faCalendarAlt, faTelegramPlane, faCheck,
  faBan,faAngleRight,faAngleLeft,faTasks,faFlagCheckered,faExclamationTriangle,
  faSort, faSortAlphaDown, faSortAlphaUp, faShareSquare,faTrashAlt,faExclamation,faStopCircle,
  faFolderOpen,faHandPaper,faArrowUp,faArrowDown,faVideoSlash


    )

  config.autoReplaceSvg = 'nest'//=>https://github.com/matfish2/vue-tables-2/issues/441
dom.watch() // This will kick of the initial replacement of i to svg tags and configure a MutationObserver => https://www.npmjs.com/package/@fortawesome/vue-fontawesome


Vue.component('font-awesome-icon', FontAwesomeIcon)

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
//import { hooks } from "vue-hooks";

import i18n from "./i18n";
import "./registerServiceWorker";

//Vue.use(hooks);

window.initVue = props =>
  new Vue({ router, store, i18n,
    render(createElement) {
      return createElement(
          "div",
          { 'attrs': { class: 'render-app' }, },
          [createElement(
            App,
            { props })
            /*
            h(Setter),
            h(Listtener)*/
          ])
    }
  }).$mount("#app");
/*
The createElement function takes three arguments of its own:

1) An HTML tag name (or a component options object).
2) A data object that corresponds to the attributes to be added to the HTML template (event listeners, class attributes, etc.).
3) Child nodes of the parent node.

-----------> https://www.fullstack.io/30-days-of-vue/day-16-render-functions-and-jsx
*/