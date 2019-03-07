const mutations = {
  changeProp(store, { prop, state }) {
    this._vm.$set( store, prop, state );
    store[prop] = state;
    console.log('changeProp=>', prop, state,store[prop])
  },
  
  appendToArray (state, {prop,  val}) {
    state[prop].push(val);
  },

  changeObj (store, {obj, prop, index, state}) {
    //Vue.$set(store[obj], prop, state);
    store[obj][index][prop] = state;
    console.log('changeObj->', obj,'prop->', prop,'state->',  state)
  },

  
  toogleSelectRow (store, {index}) {
    //Vue.$set(store[obj], prop, state);
    store.selectedVideos[index].userData.selected = !store.selectedVideos[index].userData.selected;//JUST inverting;
    console.log('toogleSelectRow->', index,'state->',  store.selectedVideos[index].userData.selected)
  },


  changeUserData (store, {index, prop, val}) {
    let dataType = 'userData';
    store.selectedVideos[index][dataType][prop] = val;
  },

  deleteEntry (state, {index} ) {
    console.log('deleteEntry',state.selectedVideos,'index=>',index,arguments)
    state.selectedVideos.splice(index, 1);//this._vm.$delete(state.selectedVideos, index);
  },

  removeAll(state) {
    this._vm.$set(state, 'selectedVideos', []);
    state.selectedVideos = [];
    this._vm.$toast.success('We completely cleared the list!', state.getTime())
  },

  sortMutation(state, {key, type}) {
    console.log('sortir', arguments);
    let parseFunc = (key === 'selected' || key === 'comment') ?
                    (obj) => obj.userData[key]
                   :(obj) => obj.fileData.file[key]
                  
      let  asc = (a,b) => a>b?1:a<b?-1:0;
      let desc = (a,b) => a>b?1:a<b?-1:0;
      type?state.selectedVideos.sort((a,b)=>asc(parseFunc(a),parseFunc(b))):
           state.selectedVideos.sort((a,b)=>desc(parseFunc(b),parseFunc(a)))
  }


/*
  stopTransfer ( store, { prop, state } ) {
    this._vm.$set(store.selectedVideos, prop, state );
  }
-**/
}

export default mutations;