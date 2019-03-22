export default {
  methods: {
    sizeCheck(e) {
      return this.$store.state.maxSize > e ? "size-success" : "size-error";
    },
    typeCheck: e =>
      e && e.split("/")[0] == "video" ? "type-success" : "type-error"
  },
  size(e) {
    return this.$store.state.maxSize > e ? true : false;
  },
  type: e => (e && e.split("/")[0] == "video" ? true : false)
};

import { mapMutations, mapState, mapActions } from "vuex";

export const selectedFilesCounts = {
  data() {
    return {
      sendingToAll: false
    };
  },
  methods: {
    ...mapMutations(["changeProp"]),
    ...mapActions([
      "prepareToUploadAll",
      "removeSelectedAction",
      "sendSelectedAction"
    ]),
    ...mapMutations(["removeAllCommit", "deleteEntry"]),
    sendAllHandler() {
      this.prepareToUploadAll();
    },
    deleteHandler() {
      this.deleteEntry({
        prop: "selectedVideos",
        index: this.index
      });
    },
    stopAllHandler() {
      this.changeProp({ prop: "uploadAllInProgress", state: false });
      let cancelled = this.selectedVideos.filter(e =>
        e.userData.source
          ? e.userData.source.cancel("cancelled by user..")
          : false
      ).length;
      console.log("cancelled -> ", cancelled);
    }
  },
  computed: {
    ...mapState(["selectedVideos", "uploadAllInProgress"]),

    isAllValidTransferingInManual__mixin() {
      const s = this.selectedVideos;
      const f = s.filter(e => e.userData.percentCompleted != null).length;
      return s.length && f && this.all_valid_count && s.length == f;
    },

    countTransferingFiles() {
      const s = this.selectedVideos;
      return s.filter(e => e.userData.percentCompleted != null).length;
    },

    /*REMOVE ALL BTN*/
    removeAllText() {
      return `Remove all ${
        this.countTransferingFiles > 0 ? "other " : ""
      } (${this.all_count - this.countTransferingFiles})`;
    },
    removeAllTitle() {
      return `Clear the list ${
        this.countTransferingFiles
          ? "(skip " + this.countTransferingFiles + " transfering file)"
          : ""
      }`;
    },
    removeAllClass: () => "btn btn-danger progress_btn",
    removeAllIcon: () => "far fa-trash-alt",

    /*REMOVE selected BTN*/
    removeSelectedShown() {
      return this.all_selected_count;
    },
    removeSelectedText() {
      return `Remove selected (${this.all_selected_count})`;
    },
    removeSelectedTitle() {
      return `Remove ${this.all_selected_count} selected files: \n${
        this.all_valid_selected_count
      } - valid, ${this.all_bad_selected_count} - non valid`;
    },
    removeSelectedClass: () => "btn btn-danger progress_btn",
    removeSelectedIcon: () => "far fa-trash-alt",

    /*SEND SELECTED*/
    sendSelectedShown() {
      return this.all_valid_selected_count && this.all_selected_count;
    },
    sendSelectedIcon: () => "fas fa-upload",
    sendSelectedText() {
      let avsc = this.all_valid_selected_count;
      let abc = this.all_bad_count;
      let avss = this.all_valid_selected_size;
      return `Upload ${avsc} ${abc ? "valid" : ""} selected (${this.sizeMethod(
        avss
      )})`;
    },
    sendSelectedTitle() {
      let avsc = this.all_valid_selected_count;
      let avss = this.sizeMethod(this.all_valid_selected_size);
      let abc = this.all_bad_count;
      let out = `Upload ${avsc} selected file${
        avsc > 1 ? "s" : ""
      } \n(${avss})`;
      if (abc)
        out += `\n(without ${abc} selected non valid file${
          abc > 1 ? "s" : ""
        })`;
      return out;
    },
    sendSelectedClass: () => "btn btn-primary progress_btn",

    /*remove All BTN*/
    removeAllShown() {
      return this.all_count && !this.isAllValidTransferingInManual__mixin;
    },
    /*STOP ALL btn*/
    stopAllShown() {
      return this.countTransferingFiles;
    },
    /* SEND ALL BTN */
    sendAllShown() {
      return this.countTransferingFiles !== this.all_valid_count;
    },
    sendAllClass: () => "btn btn-warning progress_btn",
    sendAllText() {
      if (this.countTransferingFiles) {
        const diff = this.all_valid_count - this.countTransferingFiles;
        return `Send all other  ${diff} valid`;
      }
      return `Send all ${this.all_valid_count ? "valid" : ""} ${
        this.all_valid_count
      } (${this.sizeMethod(this.all_valid_size)})`;
    },
    sendAllIcon: () => "fas fa-upload",
    sendAllTitle() {
      if (this.countTransferingFiles) {
        return "We will append all other files..";
      }
      let avc = this.all_valid_count;
      let avs = this.all_valid_size;
      let abc = this.all_bad_count;
      let abs = this.all_bad_size;
      let out = `We will upload  ${avc} file${
        avc > 1 ? "s" : ""
      } \n(${this.sizeMethod(avs)})`;
      if (abc)
        out += `\nand ignore ${abc} invalid file${
          abc > 1 ? "s" : ""
        }  \n(${this.sizeMethod(abs)})`;
      return out;
    },

    all() {
      return this.selectedVideos;
    },
    all_count() {
      return this.all.length;
    },
    all_size() {
      return this.all.reduce((sum, cur) => cur.fileData.file.size + sum, 0);
    },

    all_selected() {
      return this.all.filter(e => e.userData.selected);
    },
    all_selected_count() {
      return this.all_selected.length;
    },
    all_selected_size() {
      return this.all_selected.reduce(
        (sum, cur) => cur.fileData.file.size + sum,
        0
      );
    },

    all_valid() {
      return this.all.filter(e => e.fileData.sizeOK && e.fileData.typeOK);
    },
    all_valid_count() {
      return this.all_valid.length;
    },
    all_valid_size() {
      return this.all_valid.reduce(
        (sum, cur) => cur.fileData.file.size + sum,
        0
      );
    },

    all_valid_selected() {
      return this.all_valid.filter(e => e.userData.selected);
    },
    all_valid_selected_count() {
      return this.all_valid_selected.length;
    },
    all_valid_selected_size() {
      return this.all_valid_selected.reduce(
        (sum, cur) => cur.fileData.file.size + sum,
        0
      );
    },

    all_bad() {
      return this.all.filter(e => !e.fileData.sizeOK || !e.fileData.typeOK);
    },
    all_bad_count() {
      return this.all_bad.length;
    },
    all_bad_size() {
      return this.all_bad.reduce((sum, cur) => cur.fileData.file.size + sum, 0);
    },

    all_bad_selected() {
      return this.all_bad.filter(e => e.userData.selected);
    },
    all_bad_selected_count() {
      return this.all_bad_selected.length;
    },
    all_bad_selected_size() {
      return this.all_bad_selected.reduce(
        (sum, cur) => cur.fileData.file.size + sum,
        0
      );
    },

    stopAllClass: () => "btn btn-danger",
    stopAllIcon: () => "far fa-hand-paper",
    stopAllTitle() {
      //let p = this.uploadAllInProgress; if(!p) return;
      let c = this.selectedVideos.filter(
        e => e.userData.percentCompleted != null
      ).length;
      return `stop ${c > 1 ? "all" : ""} ${c} transfer${c > 1 ? "s" : ""}`;
    },
    stopAllText() {
      return this.stopAllTitle;
    }
  }
};

export const filters = {
  methods: {
    sizeMethod: e => {
      let round = d =>
        d - Math.floor(d) > 0.1 && d - Math.floor(d) < 0.95
          ? d.toFixed(1)
          : d.toFixed(0); //убираем дробную часть где она не носит смысловую нагрузку (n.0, где n - число);
      return e < 1000
        ? e + " B"
        : e < 1000000
        ? round(e / 1000) + " KB"
        : e < 1000000000
        ? round(e / 1000 / 1000) + " MB"
        : round(e / 1000 / 1000 / 1000) + " GB";
    }
  },
  filters: {
    sizeFilter: e => {
      let round = d =>
        d - Math.floor(d) > 0.1 && d - Math.floor(d) < 0.95
          ? d.toFixed(1)
          : d.toFixed(0); //убираем дробную часть где она не носит смысловую нагрузку (n.0, где n - число);
      return e < 1000
        ? e + " B"
        : e < 1000000
        ? round(e / 1000) + " KB"
        : e < 1000000000
        ? round(e / 1000 / 1000) + " MB"
        : round(e / 1000 / 1000 / 1000) + " GB";
    }
  }
};

export const localCheckers = {
  computed: {
    sizeCheck_comp() {
      return this.$store.state.maxSize > this.file.size
        ? "size-success"
        : "size-error";
    },
    typeCheck_comp() {
      return this.file.type && this.file.type.split("/")[0] == "video"
        ? "type-success"
        : "type-error";
    }
  }
};

export const duration_comp_mixin = {
  methods: {
    duration_comp: d => {
      if (!d) return;
      const sec = Math.round(d), //.toFixed(0),
        h = (sec / 3600) ^ 0,
        m = ((sec - h * 3600) / 60) ^ 0,
        s = sec - h * 3600 - m * 60,
        duration = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
          s < 10 ? "0" + s : s
        }`;
      return duration;
    }
  }
};
