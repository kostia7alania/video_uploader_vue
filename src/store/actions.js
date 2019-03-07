import axios from 'axios';  
const object_hash = require('object-hash')

export default {

  params: async () => window.location.search.replace("?", "").split("&").reduce((p, e) => {let a = e.split("=");p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);return p;}, {}),
  
  toast({state}, {text,type}) {this._vm.$toast[type]( text, state.getTime() )},
  
  pulseRow( { state, commit }, { hash, index } ) {
    let val_tmp = {obj: 'selectedVideos', index, prop: 'class',  val: 'pulse' };
          commit('changeUserData', val_tmp);
          setTimeout( 
            () => state.selectedVideos
                    .forEach( (el, newIndex) => {
                      if(el.fileData.hash === hash) commit('changeUserData', { obj: 'selectedVideos', index: newIndex, prop: 'class',  val:'' } )                      
          }),3000) //write class in ACTUAL index //prev class
  },

  async getVideoList({ state, commit,  dispatch }) {
    let params = await dispatch("params");
    if(!params.def_uid && !params.insp_uid) { dispatch('toast', {text: 'Url is wrong', type: 'warning'}); return false; }
 
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const options = {
      headers: {Accept: "application/json"},
      onUploadProgress: async e => e.lengthComputable ?
          commit('changeProp', {prop: 'percentCompleted', val: Math.round( (e.loaded * 100) / e.total )})
        : '',
        cancelToken: source.token
    };
    commit('changeProp', { prop: 'source',  state: source } );

    return await axios.get(`${state.url_api}?action=viewvideojson&add_vid=0&def_uid=${ params.def_uid }&insp_uid=${params.insp_uid}`, {cancelToken: source.token})
      .then(res => {
        let out = res.data;
        if( !(out instanceof Array)) throw 'Server response is incorrect!'
        commit('changeProp', { prop: 'alreadyUploaded',  state: res.data } );
        commit('changeProp', { prop: 'isLoadedList',  state: true } );
        return res.data;
      })
      .catch(err => {
        let res;
        if (axios.isCancel(err)) {
          res =  err.message;
          console.warn("CANCELed =>", res);
        } else {
          res = "Network Error";
          console.warn("OTHER =>", res);
        }
        this._vm.$toast.warning(res, state.getTime());
        return res;
      });
  },

  filesSelected({ state, commit, dispatch }, event) {
    //this.transferStatus = ``;this.uploadPercentage = 0;
    let fileList = event.target.files || event.dataTransfer.files
    if (!fileList.length) { return; }
    Array.prototype.forEach.call(fileList, file => {
      let hash = object_hash({
        m: file.lastModified,
        n: file.name,
        s: file.size,
        t: file.type
      });
      let t;
      state.selectedVideos.filter( (e, index) => {
        console.log(e);
        if (e.fileData.hash === hash) {
          //if equal, will temporary highlight appropriate row in the table with already uploaded videos 
          dispatch('pulseRow', {hash, index})
          this._vm.$toast.warning( `The file <b>"${e.fileData.file.name}"</b> is already selected`, state.getTime() )
          t = true;
        }
      })
      if (!t) {
        let sizeCheck = state.maxSize > file.size; //true = okay 
        let typeCheck = file.type && file.type.split("/")[0] == "video";//true = okay
        commit("appendToArray", {
          prop: "selectedVideos",
          val: {
            userData: {
              comment: null,selected: false,class: "",percentCompleted: null,source: null},
              fileData: {hash: hash,file: file,sizeOK: sizeCheck,typeOK: typeCheck}
          }
        });
      }
    });
  },

  async upload({ state, commit, dispatch }, { data }) {
    window.t = this;
    let hash = data.fileData.hash;
    console.log("upload", arguments);
    if (!data || !data.fileData || !data.userData)
      return this._vm.$toast.warning(
        "Error while preparing to send the file..",
        state.getTime()
      );
    const fd = data.fileData
    let name = data.fileData.file.name?data.fileData.file.name:'';
    let res;
    if (!fd.sizeOK) res = `Max size (<${state.maxSize/1000/1000/1000} GB) exceeded`
    if (!fd.typeOK) res += `${res?' and f':' F'}ormat not supported`
    if (res) { this._vm.$toast.warning(`<b>${res}</b>: ${name}`, state.getTime()); return; }
    const params = data.params ? data.params : await dispatch("params"); 
    if (!params.def_uid && !params.insp_uid) {
      dispatch("toast", {
        text: "Url is wrong",
        type: "warning"
      });
      return false;
    }
    const formData = new FormData();
    formData.append(
      "comment",
      data.userData.comment?data.userData.comment:''
    );
    formData.append("file", data.fileData.file);
    formData.append("hash", data.fileData.hash);
    const url = `${state.url_api}?action=savevid&break=1&def_uid=${ params.def_uid }&insp_uid=${params.insp_uid}`;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const options = {
      headers: {Accept: "application/json",'Content-Type': 'multipart/form-data'},
      //onUploadProgress: e => e.lengthComputable ? state.selectedVideos.forEach ( (obj,index) => obj.fileData.hash === hash ? commit('changeUserData', {prop: 'percentCompleted', index, val: Math.round( (e.loaded * 100) / e.total )}):'' ):'',
      onUploadProgress: async e => e.lengthComputable ? 
          commit('changeUserData', {prop: 'percentCompleted', index: await dispatch( 'getIndex', { hash } ), val: Math.round( (e.loaded * 100) / e.total )})
        : '',
        cancelToken: source.token
    };
    
    commit('changeUserData', { index: await dispatch( 'getIndex', { hash } ), prop: 'source', val:source } )
       
    return await axios
    .post(url, formData, options)
      .then ( async res => {
        console.log("SUCCESS=>", res.data);
        commit( 'deleteEntry', { index: await dispatch('getIndex', { hash } ) } );
        return res.data
      })
    .catch( async err => {
      console.log("err=>", err);
      commit('changeUserData', {prop: "percentCompleted", index: await dispatch('getIndex', { hash }), val: null} )
      return err 
  })
  },
  async getIndex ( {state }, { hash } ) {
    for (let index in state.selectedVideos) if(state.selectedVideos[index].fileData.hash === hash) return index;
  },

  removeSelectedAction ( { state, commit } ) {
    let newSelVideos = state.selectedVideos.filter(e=>!e.userData.selected);//осталвляем тех, кто НЕ выбран,остальные ->в баню; в бесконечность;;
    commit('changeProp', { prop: 'selectedVideos',  state: newSelVideos } );
  },

  sendSelectedAction ( { state, dispatch } ) {
    const selected = state.selectedVideos.filter(e=>e.userData.selected);//кто выбран - отправляем в "домик";
    selected.forEach( async e => {
        let uploaded = await dispatch( "upload", {data:e} );
        console.log('selected UPLOADED =>',uploaded)
    })
    
  },
         
  async prepareToUploadAll ( { state, dispatch } ) {
    state.selectedVideos.forEach( async e => {
      //if(e.fileData.sizeOK && e.fileData.typeOK)  { }
        let uploaded = await dispatch( "upload", {data:e} );
        console.log('uploaded=>',uploaded)
     
    })
  },

};