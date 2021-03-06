import axios from "axios";
const object_hash = require("object-hash");
import alreadyActions from "./modules/alreadyUploaded_actions";
import uploadActions from "./modules/upload_actions";

const $t = window.$t;

export default {
  ...alreadyActions,
  ...uploadActions,
  toast({ state }, { text, type }) {
   window.toast[type](text, state.getTime());
  },
  pulseRow({ state, commit }, { hash }) {
    commit("changeSelectedVideos", { hash, prop: "class", val: "pulse" });
    setTimeout(
      () =>
        hash in state.selectedVideos
          ? commit("changeSelectedVideos", { hash, prop: "class", val: "" })
          : "",
      3000
    ); //write class in ACTUAL index //prev class
  },
  /*
  async deleteEntryAction ({ state, commit, dispatch },  { index }) {
   let ud = state.selectedVideos[index].userData
   if('percentCompleted' in ud && !ud.percentCompleted) {
     ud.cancel();
   }
    commit('deleteEntry')
  },*/
  /******
   *    *
   *    *
   *    *
   *    *
   ******/

  async filesSelected({ state, commit, dispatch }, event) {
    const $t = window.$t;
    const fileList = event.target.files || event.dataTransfer.files;
    if (!fileList.length) return;
    const t = this._vm;
    commit("changeProp", { prop: "SelectedFiles__IsLoading", state: true });

    return new Promise(resolve => {
      t.$nextTick(() =>
        setTimeout(() => {
          //для визуализации загрузки))
          Array.prototype.forEach.call(fileList, file => {
            if (!file || !file.name.split(".").length) {
              //dispatch("toast", { text: $t("corrupt file", { filename: file.name }),type: "warning" });
              return;
            }
            let spName = file.name.split(".");
            const ext = spName[spName.length - 1];
            if (!state.formats.includes(ext.toLowerCase())) {
              //dispatch("toast", {text: $t("unsupported format", { filename: file.name }), type: "warning" });
              return false;
            }
            const hash = object_hash({
              m: file.lastModified,
              n: file.name,
              s: file.size,
              t: file.type
            });
            /*
            state.selectedVideos.forEach((e, index) => {
              if (e.fileData.hash === hash) {  //if equal, will temporary highlight appropriate row in the table with already uploaded videos
                dispatch( "pulseRow", { hash, index } );
                dispatch('toast', { text: $t('file is already selected', {filename:file.name}), type:'warning' } )
                t = true;
                return; // OPTIMIZE; just TRUST ME!;-)
              }
            });*/

            if (hash in state.selectedVideos) {
              //файл уже в списке, начинаем мигать
              dispatch("pulseRow", { hash });
              const text = $t("file is already selected", {
                filename: file.name
              });
              window.toast.warning(text, state.getTime());
              return;
            }
            //иначе - спокойненько добавляем в массив;
            let sizeCheck = state.maxSize * 1000 * 1000 > file.size; //true = okay
            let typeCheck = file.type && file.type.split("/")[0] == "video"; //true = okay
            commit("appendToSelectedVideos", {
              obj: {
                comment: null,
                selected: false,
                class: "",
                percentCompleted: null,
                source: null,
                hash: hash,
                file: file,
                sizeOK: sizeCheck,
                typeOK: typeCheck
              }
            });

            dispatch("detectDuration", { hash, file });
          });
          resolve();
        }, 300)
      );
    }).finally(() =>
      commit("changeProp", { prop: "SelectedFiles__IsLoading", state: false })
    );
  },

  /**** DETECT DURATION *****/
  detectDuration({ commit }, { hash, file }) {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = async () => {
      window.URL.revokeObjectURL(video.src);
      let sec = video.duration;
      if (sec) {
        commit("changeSelectedVideos", { hash, prop: "duration", val: sec });
        commit("changeSelectedVideos", {
          hash,
          prop: "durationOK",
          val: window.store.state.maxDuration * 60 > sec
        });
      }
    };
    video.src = URL.createObjectURL(file);
  },
  /************/
  /** :::DEPRECATED 24.3.19 :::
  getIndex({ state }, { hash }) {
    if (!state.selectedVideos.length) return false;
    for (let index in state.selectedVideos)
      if (state.selectedVideos[index].fileData.hash === hash) return index;
  },*/

  async removeSelectedAction({ getters, commit }) {
    console.log(arguments);
    //const newArr = [];
    //state.selectedVideos.forEach( e => e.userData && e.userData && e.userData.selected && e.userData.source ? e.userData.source.cancel('Cancelled by user'):"")
    //state.selectedVideos.forEach( e => !e.userData.selected && e.userData.percentCompleted != null  )
    //commit("changeProp", { prop: "selectedVideos", state: newArr });
    getters.selectedVideosGetter.forEach(e => {
      if (e.selected && e.percentCompleted == null) {
        commit("deleteFromSelectedVideos", { hash: e.hash });
      }
    });
  },

  removeAllAction({ state, getters, commit }) {
    const $t = window.$t;
    let deleted = 0,
      skipped = 0;
    getters.selectedVideosGetter.forEach(e => {
      //if(e.percentCompleted != null ) e.source.cancel('Cancelled by user');// <<< ==== на будущее -если надо будет тормозить и удалять
      if (e.percentCompleted == null) {
        commit("deleteFromSelectedVideos", { hash: e.hash });
        deleted++;
      } else skipped++;
    });
    let text;
    if (skipped > 0) {
      if (deleted == 1) text = $t("Remove all report 1", { deleted });
      else if (deleted > 1) text = $t("Remove all report 2", { deleted });
      if (skipped == 1)
        text =
          (deleted > 0 ? `${text}<br>` : "") +
          $t("Remove all report skipped 1", { skipped });
      else if (skipped > 1)
        text =
          (deleted > 0 ? `${text}<br>` : "") +
          $t("Remove all report skipped 2", { skipped });
    } else if (deleted > 0) {
      text =
        deleted > 1
          ? $t("Remove all completely 2", { deleted })
          : $t("Remove all completely 1", { deleted });
    } else text == "n/a";
    window.toast.success(text, state.getTime());
  },

  sendSelectedAction({ getters, dispatch }) {
    return getters.selectedVideosGetter.forEach(async e =>
      e.selected ? await dispatch("upload", { hash: e.hash }) : ""
    ); //кто выбран - отправляем в "домик"(на сервак);
  },

  /********/

    prepareToUploadAll({ state, getters, commit, dispatch }) {
      const $t = window.$t 

      commit("changeProp", { prop: "uploadAllInProgress", state: true });
       const arr = getters.selectedVideosGetter
       .filter(e => e.percentCompleted == null &&
                    e.sizeOK &&
                    e.typeOK
              )
       .map(e => dispatch("upload", { hash: e.hash }));
      Promise.all(arr)
      .then( res => { 
        const suc_count = res.filter(_ => _ === true).length;
        const fail_count = res.length - suc_count;
        let text =
          (suc_count && $t("Successively uploaded", { suc_count })) || "";
        text += $t("Uploaded with fail", { fail_count });
        const type =
          (suc_count && !fail_count && "success") ||
          (!suc_count && fail_count && "error") ||
          "warning";
          
        text = $t("Send all report", { text });
        window.toast[type](text, state.getTime());
      })
      .catch(err => {
        const text = window.$t("Upload all done with error", { err });
        window.toast.warning(text, state.getTime()) 
      })
      .finally(() => {
        commit("changeProp", { prop: "uploadAllInProgress", state: false });
        dispatch("getVideoList"); // for  refresh duplicate list -> HUIDs;
      });
  },

  /********/

  async sendFeedback({ state }, { VidUID, comment }) {
    const url = `${state.BASE_URL}action=abusingFile&VidUID=${VidUID}`;
    return await axios
      .post(url, { comment })
      .then(() => {
        const text = $t("Message sent successfully");
        window.toast.success(text, state.getTime());
      })
      .catch(err => {
        const text =
          $t("An error occurred while sending the request") + typeof err ===
          "string"
            ? ": " + err
            : "";
        window.toast.error(text, state.getTime());
        return false;
      });
  },

  async GET_CONFIG({ state, commit }) {
    const url = `${state.BASE_URL}action=get-config`;
    commit("SET_IS_CONFIG_GETTED", false);
    return await axios
      .get(url)
      .then(e => {
        const config = e.data;
        Object.keys(config).forEach(key =>
          commit("INIT_VALUE", { key, value: config[key] })
        );
        commit("SET_IS_CONFIG_GETTED", true);
      })
      .catch(err => {
        const text =
          $t("An error occurred while getting config") + typeof err === "string"
            ? ": " + err
            : "";
        commit("SET_IS_CONFIG_GETTED", text);
        window.toast.error(text, state.getTime());
        return false;
      });
  }
};
