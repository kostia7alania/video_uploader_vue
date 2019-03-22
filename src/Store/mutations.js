const mutations = {
  
 async changeProp(store, { prop, state }) {
    this._vm.$set(store, prop, state);
    store[prop] = state;
    return console.log("changeProp=>", prop, state, store[prop]);
  },

  appendToArray(state, { prop, val }) {
    state[prop].push(val);
  },

  changeObj(store, { obj, prop, index, state }) {
    //Vue.$set(store[obj], prop, state);
    store[obj][index][prop] = state;
    console.log("changeObj->", obj, "prop->", prop, "state->", state);
  },

  toogleSelectRow(store, { index }) {
    //Vue.$set(store[obj], prop, state);
    store.selectedVideos[index].userData.selected = !store.selectedVideos[index]
      .userData.selected; //JUST inverting;
    console.log(
      "toogleSelectRow->",
      index,
      "state->",
      store.selectedVideos[index].userData.selected
    );
  },

  changeUserData(store, { index, prop, val }) {
    let dataType = "userData";
    store.selectedVideos[index][dataType][prop] = val;
  },

  changeFileData(store, { index, prop, val }) {
    let dataType = "fileData";

    //store.selectedVideos[index][dataType][prop] = val;
    this._vm.$set(store.selectedVideos[index][dataType], prop, val);
  },

  deleteEntry(state, { index }) {
    console.log(
      "deleteEntry",
      state.selectedVideos,
      "index=>",
      index,
      arguments
    );
    state.selectedVideos.splice(index, 1); //this._vm.$delete(state.selectedVideos, index);
  },

  removeAllCommit(state) {
    const len = state.selectedVideos.filter(
      e => e.userData.percentCompleted == null
    ).length;
    const filtered = state.selectedVideos.filter(
      e => e.userData.percentCompleted != null
    ); //удалили все файлы, кроме тех, что уже находятся в стадии передачи;
    this._vm.$set(state, "selectedVideos", filtered);
    const f_len = filtered.length;
    const res = f_len
      ? `We removed ${len} file${
          len > 1 ? "s" : ""
        } from the list and didn't touch ${f_len} file${
          f_len > 1 ? "s" : ""
        } that were already transferred to the server`
      : "We completely cleared the list!";
    this._vm.$toast.success(res, state.getTime());
  },

  sortMutation(state, { key, type }) {
    console.log("sortir", arguments);
    const parseFunc =
      key === "selected" || key === "comment"
        ? obj => obj.userData[key]
        : obj => obj.fileData.file[key];

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

  /*
  stopTransfer ( store, { prop, state } ) {
    this._vm.$set(store.selectedVideos, prop, state );
  }
-**/
};

export default mutations;
