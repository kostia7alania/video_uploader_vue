import axios from 'axios';  

export default {
  params: async () => window.location.search.replace("?", "").split("&").reduce((p, e) => {let a = e.split("=");p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);return p;}, {}),
  toast({state}, {text,type}) {this._vm.$toast[type]( text, state.getTime() )},

  async getVideoList({ state, commit,  dispatch }, {source}) {
  
    let params = await dispatch("params");
    if(!params.def_uid && !params.insp_uid) { dispatch('toast', {text: 'Url is wrong', type: 'warning'}); return false; }
    return await axios.get(`${state.url_api}?action=viewvideojson&add_vid=0&def_uid=${ params.def_uid }&insp_uid=${params.insp_uid}`, {cancelToken: source.token})
      .then(res => {
        commit('changeProp', { prop: 'alreadyUploaded',  state: res.data } );
        return res.data;
      })
      .catch(err => { 
        let res;
        if (axios.isCancel(err)) { res =  err.message; console.log("CANCEL [req] =>", res); }
        else {res = {message:'Network Error'}; console.log('OTHER [thrown req] =>', res);}
        this._vm.$toast.warning( err.message, state.getTime() )
      })
  },
  filesSelected ({state, commit }, event) {
    //this.transferStatus = ``;this.uploadPercentage = 0;
    let fileList = event.target.files || event.dataTransfer.files
    if (!fileList.length) { return; }
    window.object_hash = require('object-hash')
    Array.prototype.forEach.call(fileList, file => {
      let hash = object_hash({m:file.lastModified,n:file.name,s:file.size,t:file.type});
      let t;
      state.selectedVideos.filter( (e, index) => {
        console.log(e);
        if(e.fileData.hash === hash) {//if equal, will temporary highlight appropriate row in the table with already uploaded videos 
          let val_tmp = {obj: 'selectedVideos', index, prop: 'class',  val: 'alert alert-danger' };
          commit('changeUserData', val_tmp);
          setTimeout( () => state.selectedVideos.forEach( (el, newIndex) => {                              
                              if(el.fileData.hash === hash) commit('changeUserData', { obj: 'selectedVideos', index: newIndex, prop: 'class',  val:'' } )
                          }),3000) //write class in ACTUAL index //prev class
          this._vm.$toast.warning( `The file <b>"${e.fileData.file.name}"</b> is already selected`, state.getTime() )
          t = true;
        }
      })
      if(!t) {
        let sizeCheck = state.maxSize > file.size; //true = okay 
        let typeCheck = file.type && file.type.split("/")[0] == "video";//true = okay
        commit("appendToArray", { 
          prop: "selectedVideos",
          val: {
            userData: {
              comment: null,
              selected: false,
              class: '',
            },
            fileData: {
              hash: hash,
              file: file,
              sizeOK: sizeCheck,
              typeOK: typeCheck
            }
        } } );

      }
    });
    /*for (let i = 0; i < a.length; i++) {
      //let aa = a[i].name.split("."); let fileType = "." + aa[aa.length - 1];
      let fls = {
        name: a[i].name,
        size: a[i].size,
        type: a[i].type,
        url: window.URL.createObjectURL( a[i] ),
        lastModifiedDate: a[i].lastModifiedDate.toLocaleString(),
        comment: "",
        fileSelf: a[i]
      };
    }
    */
  },


        
  async prepareToUpload ( {state, commit }, event ) {
    let params = await dispatch("params");
      store.selectedVideos.forEach( async e => {
        let uploaded = await dispatch( "upload",{} );
      })

  },

  async upload ( {state, commit, dispatch }, data ) {
    console.log('upload', arguments)
    if( !data || !data.fileData || !data.userData ) return this._vm.$toast.warning( 'Error while preparing to send the file..', state.getTime() )
      const fd = data.fileData
      let res;
      if(!fd.sizeOK) res = 'size exceeded'
      if(!fd.typeOK) res = res?'and format not supported' : 'format not supported'
      if(res) { this.$toast.warning(res, this.$store.state.getTime()); return; }
    const params = data.params ? data.params : await dispatch("params"); 
    if( !params.def_uid && !params.insp_uid ) { dispatch('toast', {text: 'Url is wrong', type: 'warning'}); return false; }
    const formData = new FormData();
    formData.append("comment", data.userData.comment?data.userData.comment:'');
    formData.append("file", data.fileData.file);
    formData.append("hash", data.fileData.hash);
    const config = { headers: { Accept: "application/json", "Content-Type": "application/octet-stream" },/*onUploadProgress: e =>(this.uploadPercentage = Math.round((e.loaded * 100) / e.total))*/};
    const url = `${state.url_api}?action=savevid&break=1&def_uid=${ params.def_uid }&insp_uid=${params.insp_uid}`;
    return await axios
    .post(url, formData, {headers: {Accept: "application/json",'Content-Type': 'multipart/form-data'}} )
    .then ( res => { 
      console.log("SUCCESS=>", res.data);
      commit('deleteEntry', { index: data.index } )
      return res.data 
  })
    .catch( err => { console.log("err=>", err); return err })
  },

};