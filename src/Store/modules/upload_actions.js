import axios from "axios";

export default {
  async upload({ state, commit, dispatch }, { data }) {
    window.t = this;
    let hash = data.fileData.hash;
    if (!data || !data.fileData || !data.userData)
      return this._vm.$toast.warning(
        "Error while preparing to send the file..",
        state.getTime()
      );
    const fd = data.fileData;
    const ud = data.userData;
    const f = fd.file;
    let name = fd.file.name ? fd.file.name : "";
    let res;
    if (!fd.sizeOK)
      res = `Max size (<${state.maxSize / 1000 / 1000 / 1000} GB) exceeded`;
    if (!fd.typeOK) res += `${res ? " and f" : " F"}ormat not supported`;
    if (res) {
      this._vm.$toast.warning(`<b>${res}</b>: ${name}`, state.getTime());
      return;
    }
    const params = data.params ? data.params : await dispatch("params");
    if (!params.def_uid && !params.insp_uid) {
      dispatch("toast", { text: "Url is wrong", type: "warning" });
      return false;
    }

    const formData = new FormData();
    formData.append("comment", ud.comment ? ud.comment : "");
    formData.append("file", fd.file);
    formData.append("hash", fd.hash);

    let lastModified = f.lastModified || +f.lastModifiedDate;
    let size = f.size;
    let type = f.type;
    let duration = fd.duration;
    try {
      formData.append(
        "info",
        JSON.stringify({ lastModified, size, type, duration })
      );
    } catch (e) {
      console.warn("file info err=>", e);
      throw e;
    }

    const url = `${state.url_api}?action=savevid&def_uid=${
      params.def_uid
    }&insp_uid=${params.insp_uid}`;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      //onUploadProgress: e => e.lengthComputable ? state.selectedVideos.forEach ( (obj,index) => obj.fileData.hash === hash ? commit('changeUserData', {prop: 'percentCompleted', index, val: Math.round( (e.loaded * 100) / e.total )}):'' ):'',
      onUploadProgress: async e =>
        e.lengthComputable
          ? commit("changeUserData", {
              prop: "percentCompleted",
              index: await dispatch("getIndex", { hash }),
              val: Math.round((e.loaded * 100) / e.total)
            })
          : "",
      cancelToken: source.token
    };

    let i = await dispatch("getIndex", { hash });

    if (i && state.selectedVideos[i].userData.percentCompleted) {
      //if file already transfering:
      throw "File already transferring...";
    }

    commit("changeUserData", {
      index: await dispatch("getIndex", { hash }),
      prop: "source",
      val: source
    });
    commit("changeUserData", {
      index: await dispatch("getIndex", { hash }),
      prop: "percentCompleted",
      val: 0
    });

    return await axios
      .post(url, formData, options)
      .then(async res => {
        console.log("SUCCESS=>", res.data);
        const index = await dispatch("getIndex", { hash });
        commit("changeUserData", {
          index,
          prop: "percentCompleted",
          val: null
        });
        if (res.data.status == 1) {
          commit("deleteEntry", { index });
          this._vm.$toast.success(
            `<b>Sucessifely uploaded</b> - ${res.data.OrigFileName}`,
            state.getTime()
          );
        } else {
          this._vm.$toast.warning(name + " isn't uploaded!", state.getTime());
          const msg =
            res.data && res.data.msg
              ? res.data.msg
              : "Erorr while upload the file";
          commit("changeUserData", { index, prop: "error", val: msg });
        }
        return res.data;
      })
      .catch(async err => {
        let disp_err, type, toast_msg;
        if (axios.isCancel(err)) {
          disp_err = toast_msg = err.message;
          type = "warning";
        } else {
          disp_err = "Network Error";
          toast_msg = `${name} is not uploaded!`;
          type = "error";
        }
        const index = await dispatch("getIndex", { hash });
        commit("changeUserData", {
          index,
          prop: "percentCompleted",
          val: null
        });
        commit("changeUserData", { index, prop: "error", val: disp_err });
        this._vm.$toast[type](toast_msg, state.getTime());
        return res;
      });
  }
};
