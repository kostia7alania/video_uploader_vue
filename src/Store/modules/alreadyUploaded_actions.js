import axios from "axios";

const $t = window.$t;

export default {
  async getVideoList({ state, commit, dispatch }) {
    let params = await dispatch("params");
    if (!params.def_uid && !params.insp_uid) {
      dispatch("toast", { text: "Url is wrong", type: "warning" });
      return false;
    }

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    commit("changeProp", { prop: "percentCompleted", val: 0 });
    const options = {
      headers: { Accept: "application/json" },
      onUploadProgress: e => {
        console.log("onUploadProgress=>", e);
        e.lengthComputable
          ? commit("changeProp", {
              prop: "percentCompleted",
              val: Math.round((e.loaded * 100) / e.total)
            })
          : "";
      }, //в .GET прогресс не палится пока что
      cancelToken: source.token
    };
    commit("changeProp", { prop: "source", state: source });

    return await axios
      .get(
        `${state.url_api}?action=get-uploaded-video-list&def_uid=${
          params.def_uid
        }&insp_uid=${params.insp_uid}`,
        options
      )
      .then(res => {
        let out = res.data;
        if (!(out instanceof Array)) throw "Server response is incorrect!";
        commit("changeProp", { prop: "alreadyUploaded", state: res.data });
        commit("changeProp", { prop: "isLoadedList", state: true });
        commit("changeProp", {
          prop: "lastUpdatedAlsoLoaded",
          state: new Date()
        });
        return res.data;
      })
      .catch(err => {
        let res;
        if (axios.isCancel(err)) {
          res = err.message;
          console.warn("CANCELed =>", res);
        } else {
          res = "Network Error";
          console.warn("OTHER =>", res);
        }
        res = $t(res); ///TRANSLATE D! ! ! !
        this._vm.$toast.warning(res, state.getTime());
        return res;
      })
      .finally(e => {
        console.warn("finally e=>", e);
        commit("changeProp", { prop: "percentCompleted", val: null });
        return e;
      });
  }
};
