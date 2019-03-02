import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
 import actions from './actions'

export default window.store = new Vuex.Store({
  state: {
    url_api: 'http://localhost:3000/backend/', // 'https://apcis.tmou.org/APCIS-Test/index.php',
    formats: "mp4,avi,flv,3gp,mpg,mov,qt,wmv",
    transferStatus: '', 
    alreadyUploaded: [],
    ConvertedVideoDir: "../videos/converted/",
    RealVideoDir: "../videos/real/",
    PreviewDir: "../videos/gif/",
    selectedVideos: [],
    maxSize: +'2 000 000 000'.split(' ').join(''), //2gb
  },
  mutations: {
    changeProp(store, { prop, state }) {
      store[prop] = state;
      console.log('changeProp=>', prop, state)
    },
    appendToArray (state, {prop,  val}) {
      state[prop].push(val);
    },
    changeObj (store, {obj, prop, index, state}) {
      //Vue.$set(store[obj], prop, state);
      store[obj][index][prop] = state;
      console.log('changeObj->', obj,'prop->', prop,'state->',  state)
    },
    deleteEntry (state, {prop, index} ) {
      console.log('deleteEntry',state.selectedVideos,index,arguments)
      state.selectedVideos.splice(index, 1);//Vue.$delete(state.selectedVideos, index);
    },
    
  },
  actions
});