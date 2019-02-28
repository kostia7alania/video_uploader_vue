import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import axios from 'axios'


export default new Vuex.Store({
  state: {
    url_api: 'http://localhost:3000/backend/', // 'https://apcis.tmou.org/APCIS-Test/index.php',
    formats: "mp4,avi,flv,3gp,mpg,mov,qt,wmv",
    transferStatus: '', 
    alreadyUploaded: [],
    ConvertedVideoDir: "../videos/converted/",
    RealVideoDir: "../videos/real/",
    PreviewDir: "../videos/gif/",
    selectedVideos: [], 
  },
  mutations: {
    changeProp(store, { prop, state }) {
      console.log(arguments)
      store[prop] = state;
    },
    appendToArray (store, {prop,  state, id}) {
      Vue.$set(store[prop], +new Date(), state);
    },
    changeObj (store, {obj, prop,  state}) {
      Vue.$set(store[obj], prop, state);
    }
  },
  actions: {
    params: async () => window.location.search .replace("?", "").split("&") .reduce((p, e) => { var a = e.split("=");p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);return p; }, {}),
    async getVideoList ({ state, commit, dispatch }) {
      let params = await dispatch("params");
      return await axios.get(`${state.url_api}?action=viewvideojson&add_vid=0&def_uid=${ params.def_uid }&insp_uid=${params.insp_uid}` )
      .then(res => {commit('changeProp', { prop: 'alreadyUploaded', state: res.data }); return res.data;} )
      .catch(err => {console.log("err=>", err); return false} )
    }, 
  }
});