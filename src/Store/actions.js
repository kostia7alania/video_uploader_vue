import axios from "axios";
const object_hash = require("object-hash");
import alreadyActions from "./modules/alreadyUploaded_actions";
import uploadActions from "./modules/upload_actions";

export default {
  ...alreadyActions,
  ...uploadActions,
  params: async () =>
    window.location.search
      .replace("?", "")
      .split("&")
      .reduce((p, e) => {
        let a = e.split("=");
        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return p;
      }, {}),
  toast({ state }, { text, type }) {
    this._vm.$toast[type](text, state.getTime());
  },
  pulseRow({ state, commit }, { hash, index }) {
    let val_tmp = { obj: "selectedVideos", index, prop: "class", val: "pulse" };
    commit("changeUserData", val_tmp);
    setTimeout(
      () =>
        state.selectedVideos.forEach((el, newIndex) => {
          if (el.fileData.hash === hash)
            commit("changeUserData", {
              obj: "selectedVideos",
              index: newIndex,
              prop: "class",
              val: ""
            });
        }),
      3000
    ); //write class in ACTUAL index //prev class
  },

  /******
   *    *
   *    *
   *    *
   *    *
   ******/
async filesSelected({ state, commit, dispatch }, event) {
    
    let fileList = event.target.files || event.dataTransfer.files;
    if (!fileList.length) {
      return;
    }
commit('changeProp',{prop:'SelectedFiles__IsLoading',state: true});
    
return new Promise( (resolve, reject) => {
  this._vm.$nextTick(()=>
  setTimeout(() => {
  console.log('ВНУТРИ',fileList);
    Array.prototype.forEach.call(fileList, file => {
      if (!file || !file.name.split(".").length) {
        this._vm.$toast.warning(
          `The file <b>"${file.name}"</b> is corrupt`,
          state.getTime()
        );
      }
      let spName = file.name.split(".");
      const ext = spName[spName.length - 1];
      if (!state.formats.includes(ext.toLowerCase())) {
        this._vm.$toast.warning(
          `The file <b>"${
            file.name
          }"</b> has an unsupported format. See the list of supported formats`,
          state.getTime()
        );
        return false;
      }

      const hash = object_hash({
        m: file.lastModified,
        n: file.name,
        s: file.size,
        t: file.type
      });

      let t;
      state.selectedVideos.forEach((e, index) => {
        if (e.fileData.hash === hash) {
          //if equal, will temporary highlight appropriate row in the table with already uploaded videos
          dispatch("pulseRow", { hash, index });
          this._vm.$toast.warning(
            `The file <b>"${e.fileData.file.name}"</b> is already selected`,
            state.getTime()
          );
          t = true;
          return; // OPTIMIZE; just TRUST ME!;-)
        }
      });

      if (!t) {
        let sizeCheck = state.maxSize > file.size; //true = okay
        let typeCheck = file.type && file.type.split("/")[0] == "video"; //true = okay

        commit("appendToArray", {
          prop: "selectedVideos",
          val: {
            userData: {
              comment: null,
              selected: false,
              class: "",
              percentCompleted: null,
              source: null
            },
            fileData: {
              hash: hash,
              file: file,
              sizeOK: sizeCheck,
              typeOK: typeCheck
            }
          }
        });

        /**** DETECT DURATION *****/
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = async () => {
          window.URL.revokeObjectURL(video.src);
          let sec = video.duration;
          if (!sec) return "";
          commit("changeFileData", {
            index: await dispatch("getIndex", { hash }),
            prop: "duration",
            val: sec
          });
        };
        video.src = URL.createObjectURL(file);
      }
    });
    resolve();
    },300)
    )
  })
    .finally(()=>commit('changeProp',{prop:'SelectedFiles__IsLoading',state: false}))    
  },

  /************/

  getIndex({ state }, { hash }) {
    if (!state.selectedVideos.length) return false;
    for (let index in state.selectedVideos)
      if (state.selectedVideos[index].fileData.hash === hash) return index;
  },

  removeSelectedAction({ state, commit }) {
    let newSelVideos = state.selectedVideos.filter(e => !e.userData.selected); //осталвляем тех, кто НЕ выбран,остальные ->в баню; в бесконечность;;
    commit("changeProp", { prop: "selectedVideos", state: newSelVideos });
  },

  sendSelectedAction({ state, dispatch }) {
    const selected = state.selectedVideos.filter(e => e.userData.selected); //кто выбран - отправляем в "домик";
    selected.forEach(async e => {
      let uploaded = await dispatch("upload", { data: e });
      console.log("selected UPLOADED =>", uploaded);
    });
  },

  /********/

  async prepareToUploadAll({ state, commit, dispatch }) {
    await commit("changeProp", { prop: "uploadAllInProgress", state: true });
    let arr = await state.selectedVideos.filter(
      async e => e.userData.percentCompleted == null
    );

    arr = arr.map(async e => {
      //if(e.fileData.sizeOK && e.fileData.typeOK)  { }
      let uploaded = await dispatch("upload", { data: e });
      console.log("uploaded=>", uploaded);
      return uploaded;
    });
    Promise.all(arr)
      .then(e => {
        console.log("Promise.all suc", e);
        let suc = 0,
          fail = 0;
        e.forEach(el => (el && el.status ? suc++ : fail++));
        let res = "";
        res = suc > 0 ? `Successively uploaded <b>${suc}</b>` : "";
        res = fail
          ? `${res ? res + " and f" : "F"}ailed <b>${fail}</b> file${
              suc + fail > 1 ? "s" : ""
            }`
          : `${res} file${suc + fail > 1 ? "s" : ""}`;
        dispatch("toast", {
          text: "<b>Send all: </b>" + res,
          type: suc > 0 ? "success" : "warning"
        });
        dispatch("getVideoList"); // for  refresh duplicate list -> HUIDs;
      })
      .catch(err => {
        console.warn("Promise.all err", err);
        dispatch("toast", {
          text: "Upload all done with error: " + err,
          type: "warning"
        });
      })
      .finally(() =>
        commit("changeProp", { prop: "uploadAllInProgress", state: false })
      );
    console.log("arr!!!!!");
  },

  /********/

  async sendFeedback({ state, dispatch }, { VidUID, comment }) {
    const url = `${state.url_api}?action=abusingFile&VidUID=${VidUID}`;
    console.log(comment);
    return await axios
      .post(url, { comment })
      .then(res => {
        console.log(res.data);
        dispatch("toast", {
          text: "Message sent successfully!",
          type: "success"
        });
        return true;
      })
      .catch(err => {
        dispatch("toast", {
          text: "An error occurred while sending the message",
          type: "warning"
        });
        return false;
      });
  }
};
