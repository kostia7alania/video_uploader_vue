import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import actions from "./actions";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";

export default (window.store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
}));
