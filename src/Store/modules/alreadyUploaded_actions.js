import axios from "axios";

const $t = window.$t;

import { params } from "../functions/index.js";

export default {
  async getVideoList({ state, commit }) {
    const p = params();
    if (!p) return;
    const { def_uid, insp_uid } = p;

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
        `${
          state.BASE_URL
        }action=get-uploaded-video-list&def_uid=${def_uid}&insp_uid=${insp_uid}`,
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
