import axios from 'axios';


export default {
  params: async () => window.location.search.replace("?", "").split("&").reduce((p, e) => {
    var a = e.split("=");
    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
    return p;
  }, {}),
  async getVideoList({
    state,
    commit,
    dispatch
  }) {
    let params = await dispatch("params");
    return await axios.get(`${state.url_api}?action=viewvideojson&add_vid=0&def_uid=${ params.def_uid }&insp_uid=${params.insp_uid}`)
      .then(res => {
        let val = { prop: 'alreadyUploaded',  state: res.data };
        commit('changeProp', val);
        return res.data;
      })
      .catch(err => {
        console.log("err=>", err);
        return false
      })
  },

  filesSelected ({state, commit }, event) {
    //this.transferStatus = ``;this.uploadPercentage = 0;
    let fileList = event.target.files || event.dataTransfer.files
    if (!fileList.length) { return; }
    Array.prototype.forEach.call(fileList, file => {
      let hash = require('object-hash')({m:file.lastModified,n:file.name,s:file.size,t:file.type});
      let t;
      state.selectedVideos.filter( (e, index) => {
        console.log(e);
        if(e.hash === hash) {//if equal, will temporary highlight appropriate row in the table with already uploaded videos 
          let val = {obj: 'selectedVideos', index, prop: 'class',  state: e.class };  //save prev class
          let val_tmp = {obj: 'selectedVideos', index, prop: 'class',  state: 'alert alert-danger' };
          commit('changeObj', val_tmp);
          setTimeout( () => state.selectedVideos.filter( (el, index) => el.hash === hash?commit('changeObj', val):''), 3000) //write class in ACTUAL index
          Vue.$toast.warning( `The file <b>"${e.file.name}"</b> is already selected`, Vue.getTime() )
          t = true;
        }
      })
      if(!t)
        commit("appendToArray", { prop: "selectedVideos", val: {hash:hash, comment:null, file:file, class: ''} } );
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

  async upload ( {state, commit }, data ) {
    let formData = new FormData();
    formData.append("file", f.file);
    formData.append("comment", f.comment);
    formData.append("hash", f.comment);
    const config = { headers: { Accept: "application/json", "Content-Type": "application/octet-stream" },/*onUploadProgress: e =>(this.uploadPercentage = Math.round((e.loaded * 100) / e.total))*/};
    return 
    await axios
    .post(`${state.url_api}?action=savevid&break=1&`, formData, config)
    .then ( res => {
      console.log("SUCCESS=>", res.data);
      return res.data
    })
    .catch( err => {
      console.log("err=>", err)
      return err
    })
  },

};