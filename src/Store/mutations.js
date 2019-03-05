const mutations = {
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
    console.log('deleteEntry',state.selectedVideos,'index=',index,arguments)
    state.selectedVideos.splice(index, 1);//Vue.$delete(state.selectedVideos, index);
  },
  
}

export default mutations;