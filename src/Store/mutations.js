const mutations = {
  async changeProp(store, { prop, state }) {
    this._vm.$set(store, prop, state);
  },

  appendToSelectedVideos(state, { obj }) {
    const arr = state.selectedVideos;
    if (obj.hash in arr) alert("BAYAN");
    else this._vm.$set(arr, obj.hash, obj);
  },

  deleteFromSelectedVideos(state, { hash }) {
    //deleteEntry
    //return state.selectedVideos.splice(index, 1);
    return this._vm.$delete(state.selectedVideos, hash);
  },

  changeSelectedVideos(store, { hash, prop, val }) {
    //changeUserData
    if (hash in store.selectedVideos)
      this._vm.$set(store.selectedVideos[hash], prop, val);
    else console.warn("already deleted hash", arguments);
  },

  toogleSelectRow(store, { hash }) {
    this._vm.$set(
      store.selectedVideos[hash],
      "selected",
      !store.selectedVideos[hash].selected
    );
    //store.selectedVideos[index].userData.selected = !store.selectedVideos[index] .userData.selected; //JUST inverting;
    //console.log( "toogleSelectRow->", index, "state->", store.selectedVideos[index].userData.selected );
  },

  changeObj(store, { obj, prop, index, state }) {
    //Vue.$set(store[obj], prop, state);
    store[obj][index][prop] = state;
    console.log("changeObj->", obj, "prop->", prop, "state->", state);
  },

  changeUserData(store, { hash, prop, val }) {
    this._vm.$set(store.selectedVideos[hash], prop, val);
  },

  changeFileData(store, { hash, prop, val }) {
    this._vm.$set(store.selectedVideos[hash], prop, val);
  },

  INIT_VALUE(store, { key, value }) {
    this._vm.$set(store, key, value);
  },
  SET_IS_CONFIG_GETTED(store, value) {
    store.IS_CONFIG_GETTED = value;
  }

  /***** :::DEPRECATED::: 24.3.19 ::::::
  sortMutation(state, { key, type }) {
    console.log("sortir", arguments);
    const parseFunc =
      key === "selected" || key === "comment"
        ? obj => obj[key]
        : obj => obj.file[key];

    const asc = (a, b) => {
      [a, b] = nullToEmpty(a, b);
      return a == null || b == null ? 0 : a > b ? 1 : a < b ? -1 : 0;
    };
    const desc = (a, b) => {
      [a, b] = nullToEmpty(a, b);
      return a > b ? 1 : a < b ? -1 : 0;
    };
    const nullToEmpty = (a, b) => [a == null ? "" : a, b == null ? "" : b];
    type
      ? state.selectedVideos.sort((a, b) => asc(parseFunc(a), parseFunc(b)))
      : state.selectedVideos.sort((a, b) => desc(parseFunc(b), parseFunc(a)));
  }
  */

  /*
  stopTransfer ( store, { prop, state } ) {
    this._vm.$set(store.selectedVideos, prop, state );
  }
-**/
};

export default mutations;
