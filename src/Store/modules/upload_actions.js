import axios from "axios";

//const $t = window.$t;

export default {
  async upload({ state, commit, dispatch }, { hash }) {
    const { def_uid, insp_uid } = await dispatch("params");
    if ( !def_uid || !insp_uid ) { dispatch("toast", { text: $t("Url params is wrong"), type: "error" } ); return false; }
    window.t = this;
    if (!hash || !(hash in state.selectedVideos))
      return dispatch("toast", {text: $t("Error while preparing to send the file"),type: "error"});
    const obj = state.selectedVideos[hash]
    const f = obj.file
    let res = ''
    if (!obj.sizeOK) res =  ( res ? ".\n" : '' ) + $t("Max size exceeded", { maxSize: state.maxSize / 1000 }) + " ";
    if (!obj.typeOK) res += ( res ? ".\n" : '' ) + $t("Format not supported");
    if ('durationOK' in obj   &&    !obj.durationOK) res += (res ? ".\n" : '') + $t("Duration is exceeded", { maxDuration: state.maxDuration });


    if (res) { dispatch("toast", { text: `<b>${res}</b>: ${ f.name }`, type: "error" }); return; }

    const formData = new FormData();
    formData.append("comment", obj.comment ? obj.comment : "");
    formData.append("file", f);
    formData.append("hash", hash);

    const lastModified = f.lastModified || +f.lastModifiedDate,
                  size = f.size,
                  type = f.type,
              duration = f.duration;
    try { formData.append( "info", JSON.stringify({ lastModified, size, type, duration }) );
    } catch (e) { console.warn("file info err=>", e); throw e; }

    const url = `${ state.url_api }?action=${state.upload_action}&def_uid=${def_uid}&insp_uid=${insp_uid}`;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const options = { headers: { Accept: "application/json", "Content-Type": "multipart/form-data"},
      //onUploadProgress: e => e.lengthComputable ? state.selectedVideos.forEach ( (obj,index) => obj.fileData.hash === hash ? commit('changeSelectedVideos', {prop: 'percentCompleted', index, val: Math.round( (e.loaded * 100) / e.total )}):'' ):'',
      onUploadProgress: async e => hash in state.selectedVideos && e.lengthComputable ? commit("changeSelectedVideos", { prop: "percentCompleted", hash, val: Math.round((e.loaded * 100) / e.total) }) : "",
      cancelToken: source.token
    };

    if (state.selectedVideos[hash].percentCompleted) throw $t("File already transferring");

    commit("changeSelectedVideos", { hash, prop: "source", val: source });
    commit("changeSelectedVideos", { hash, prop: "percentCompleted", val: 0 });
    return await axios
      .post(url, formData, options)
      .then(async res => {
        if (res.data && typeof res.data == "object" && "status" in res.data) {
          if (res.data.status == 1) {
            commit("deleteFromSelectedVideos", { hash });
            dispatch("toast", { text: $t("Sucessifely uploaded", { OrigFileName: res.data.OrigFileName }), type: "success" });
            return res.data;
          } else {
            const displayingMsg = res.data.msg ? res.data.msg : $t("Default displaying error in the table");
            commit("changeSelectedVideos", { hash, prop:"error", val: displayingMsg });
          }
          dispatch("toast", {text:$t("Is not uploaded", { name }), type:"error" });
        }
      })
      .catch(async err => {
        let disp_err, type, toast_msg;
        if (axios.isCancel(err)) { disp_err = toast_msg = err.message; type = "warning"; }
        else {
          disp_err = $t("Network Error");
          toast_msg = $t("Is not uploaded", { name });
          type = "error";
        }
        commit("changeProp", { prop: "uploadAllInProgress", state: false });
        commit("changeSelectedVideos", { hash, prop: "percentCompleted", val: null });
        commit("changeSelectedVideos", { hash, prop: "error", val: disp_err });
        dispatch("toast", { text: toast_msg, type });
      })
      .finally( () => hash in state.selectedVideos ? commit("changeSelectedVideos", { hash, prop: "percentCompleted", val: null }) : '' )
  }
};
