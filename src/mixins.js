const $t = window.$t;

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

import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

export const selectedFilesMethods = {
  computed: {
    ...mapGetters(["selectedVideosGetter"])
  },
  methods: {
    ...mapActions([
      "prepareToUploadAll",
      "removeSelectedAction",
      "removeAllAction",
      "sendSelectedAction" /*<=используЮтся в компонентах*/
    ]),
    ...mapMutations([
      "changeProp",
      "deleteFromSelectedVideos" /*<=используется в компонентах*/
    ]),
    sendAll_Mixin() {
      this.prepareToUploadAll();
    },
    delete_Mixin() {
      this.stop_Mixin();
      this.deleteFromSelectedVideos({ hash: this.obj.hash });
    },
    stop_Mixin() {
      this.obj.source
        ? this.obj.source.cancel(this.$t("Cancelled by user"))
        : "";
    },
    stopAll_Mixin() {
      this.changeProp({ prop: "uploadAllInProgress", state: false });
      return this.selectedVideosGetter.filter(e =>
        e.source ? e.source.cancel(this.$t("Cancelled by user")) : false
      ).length;
    }
  }
};

export const selectedFilesCounts = {
  computed: {
    ...mapGetters(["selectedVideosGetter"]),
    ...mapState(["uploadAllInProgress"]),

    isAllValidTransferingInManual__mixin() {
      const s = this.selectedVideosGetter;
      const f = s.filter(e => e.percentCompleted != null).length;
      return s.length && f && this.all_valid_count && s.length == f;
    },
    countTransferingFiles() {
      const s = this.selectedVideosGetter;
      return s.filter(e => e.percentCompleted != null).length;
    },

    /*REMOVE ALL BTN*/
    removeAllText() {
      return `${this.$t("Remove all")} ${
        this.countTransferingFiles > 0 ? this.$t("other") + " " : ""
      } (${this.all_count - this.countTransferingFiles})`;
    },
    removeAllTitle() {
      const $t = e => ("$t" in this ? this.$t(e) : e);
      const count = this.countTransferingFiles;
      let ret = $t("Clear the list");
      ret += count
        ? ` (${$t("skip")} ${count} ${$t(
            count > 1 ? "transfering files" : "transfering file"
          )})`
        : "";
      return ret;
    },
    removeAllClass: () => "btn btn-danger progress_btn",
    removeAllIcon: () => "far fa-trash-alt",

    /*REMOVE selected BTN*/
    removeSelectedShown() {
      return this.all_selected_count;
    },
    removeSelectedText() {
      return `${$t("Remove selected")} (${this.all_selected_count})`;
    },
    removeSelectedTitle() {
      const count = this.all_selected_count;
      return $t(`Remove Selected Title ${count == 1 ? 1 : 2}`, {
        count,
        valid: this.all_valid_selected_count,
        nonvalid: this.all_bad_selected_count
      });
    },
    removeSelectedClass: () => "btn btn-danger progress_btn",
    removeSelectedIcon: () => "far fa-trash-alt",

    /*SEND SELECTED*/
    sendSelectedShown() {
      return this.all_valid_selected_count && this.all_selected_count;
    },
    sendSelectedIcon: () => "fas fa-upload",
    sendSelectedText() {
      return this.sendSelectedTitle;
    },
    sendSelectedTitle() {
      let avsc = this.all_valid_selected_count;
      //let avss = this.sizeMethod(this.all_valid_selected_size);
      let abc = this.all_bad_count;

      let out = $t(`Upload selected ${avsc == 1 ? 1 : 2}`, { count: avsc });
      if (abc)
        out +=
          "\n" +
          $t(`Upload selected without ${abc == 1 ? 1 : 2}`, { count: avsc });
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
        return $t("Send all text ignor", {
          count: this.all_valid_count - this.countTransferingFiles,
          size: this.sizeMethod(this.all_valid_noneTransfering_size)
        });
      }
      return $t("Send all text", {
        count: this.all_valid_count,
        size: this.sizeMethod(this.all_valid_size)
      });
    },
    sendAllIcon: () => "fas fa-upload",
    sendAllTitle() {
      if (this.countTransferingFiles) {
        const count = this.all_valid_count - this.countTransferingFiles;
        return $t(`Send all other title ${count == 1 ? 1 : 2}`, { count });
      }
      let avc = this.all_valid_count;
      let avs = this.all_valid_size;
      let abc = this.all_bad_count; //let abs = this.all_bad_size;

      let out = $t(`sendAllTitle ${avc == 1 ? 1 : 2}`, {
        count: avc,
        size: this.sizeMethod(avs)
      });
      if (abc)
        out += $t(`sendAllTitle ignore ${abc == 1 ? 1 : 2}`, {
          count: abc,
          size: this.sizeMethod(abc)
        });
      return out;
    },

    all() {
      return this.selectedVideosGetter;
    },
    all_count() {
      return this.all.length;
    },
    all_size() {
      return this.all.reduce((sum, cur) => cur.file.size + sum, 0);
    },

    all_selected() {
      return this.all.filter(e => e.selected && e.percentCompleted == null);
    },
    all_selected_count() {
      return this.all_selected.length;
    },
    all_selected_size() {
      return this.all_selected.reduce((sum, cur) => cur.file.size + sum, 0);
    },

    all_valid() {
      return this.all.filter(e => e.sizeOK && e.typeOK);
    },
    all_valid_count() {
      return this.all_valid.length;
    },
    all_valid_size() {
      return this.all_valid.reduce((sum, cur) => cur.file.size + sum, 0);
    },

    all_valid_transfering() {
      return this.all.filter(
        e => e.sizeOK && e.typeOK && e.percentCompleted != null
      );
    },
    all_valid_transfering_count() {
      return this.all_valid_transfering.length;
    },
    all_valid_transfering_size() {
      return this.all_valid.reduce((sum, cur) => cur.file.size + sum, 0);
    },

    all_valid_noneTransfering() {
      return this.all.filter(
        e => e.sizeOK && e.typeOK && e.percentCompleted == null
      );
    },
    all_valid_noneTransfering_count() {
      return this.all_valid_transfering.length;
    },
    all_valid_noneTransfering_size() {
      return this.all_valid.reduce((sum, cur) => cur.file.size + sum, 0);
    },

    all_valid_selected() {
      return this.all_valid.filter(
        e => e.selected && e.percentCompleted == null
      );
    },
    all_valid_selected_count() {
      return this.all_valid_selected.length;
    },
    all_valid_selected_size() {
      return this.all_valid_selected.reduce(
        (sum, cur) => cur.file.size + sum,
        0
      );
    },

    all_bad() {
      return this.all.filter(e => !e.sizeOK || !e.typeOK);
    },
    all_bad_count() {
      return this.all_bad.length;
    },
    all_bad_size() {
      return this.all_bad.reduce((sum, cur) => cur.file.size + sum, 0);
    },

    all_bad_selected() {
      return this.all_bad.filter(e => e.selected);
    },
    all_bad_selected_count() {
      return this.all_bad_selected.length;
    },
    all_bad_selected_size() {
      return this.all_bad_selected.reduce((sum, cur) => cur.file.size + sum, 0);
    },

    stopAllClass: () => "btn btn-danger",
    stopAllIcon: () => "far fa-hand-paper",
    stopAllTitle() {
      const count = this.selectedVideosGetter.filter(
        e => e.percentCompleted != null
      ).length;
      return this.$t(`Stop all title ${count == 1 ? 1 : 2}`, { count });
    },
    stopAllText() {
      return this.stopAllTitle;
    }
  }
};

export const filters = {
  methods: {
    sizeMethod(e) {
      let round = d =>
        d - Math.floor(d) > 0.1 && d - Math.floor(d) < 0.95
          ? d.toFixed(1)
          : d.toFixed(0); //убираем дробную часть где она не носит смысловую нагрузку (n.0, где n - число);
      return e < 1000
        ? e + " " + this.$t("Bytes")
        : e < 1000000
        ? round(e / 1000) + " " + this.$t("KB")
        : e < 1000000000
        ? round(e / 1000 / 1000) + " " + this.$t("MB")
        : round(e / 1000 / 1000 / 1000) + " " + this.$t("GB");
    }
  }
};

export const localCheckers = {
  computed: {
    ...mapState(["maxSize"]),
    sizeCheck_comp() {
      return this.maxSize > this.file.size ? "size-success" : "size-error";
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
