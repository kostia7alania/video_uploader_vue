//const $t = window.$t;

export default {
  methods: {
    sizeCheck(e) {
      return this.$store.state.maxSize * 1000 * 1000 > e ? "size-success" : "size-error";
    },
    typeCheck: e =>
      e && e.split("/")[0] == "video" ? "type-success" : "type-error",
      durationCheck(e){
        return this.$store.state.maxDuration*60 > e ? "type-success" : "type-error"
      }

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


export const selectedFilesCounts = {
  mixins:[filters],
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
      return this.$t("Remove all text", {...this.toUploadCountsReport} );
    },
    removeAllTitle() {
      const count = this.countTransferingFiles;
      let ret = $t("Clear the list");
      ret += count ? ` (${$t("skip")} ${count} ${$t(count > 1 ? "transfering files" : "transfering file")})` : "";
      return ret;
    },
    removeAllClass: () => "btn btn-danger progress_btn",
    removeAllIcon_vue_awesome:()=>['fa','trash-alt'],
    //removeAllIcon: () => "far fa-trash-alt",

    /*REMOVE selected BTN*/
    removeSelectedShown() {
      return this.all_selected_count;
    },
    removeSelectedText() {
      return `${$t("Remove selected", {...this.toUploadCountsReport} )}`;
    },
    removeSelectedTitle() {
      const count = this.all_selected_count;
      return $t(`Remove Selected Title ${count == 1 ? 1 : 2}`, {
        count,
        valid: this.all_valid_selected_count,
        nonvalid: this.all_bad_selected_count,
        ...this.toUploadCountsReport
      });
    },
    removeSelectedClass: () => "btn btn-danger progress_btn",
    //removeSelectedIcon: () => "far fa-trash-alt",
    removeSelectedIcon_vue_awesome: ()=>["fa", 'trash-alt'],

    /*SEND SELECTED*/
    sendSelectedShown() {
      return this.all_valid_selected_count && this.all_selected_count;
    },
    sendSelectedIcon_vue_awesome: ()=>['fas', 'upload'],
    //sendSelectedIcon: () => "fas fa-upload",
    sendSelectedText() {
      let avsc = this.all_valid_selected_count;
      return $t(`Upload selected text ${avsc == 1 ? 1 : 2}`, { count: avsc, ...this.toUploadCountsReport });;
    },
    sendSelectedTitle() {
      let avsc = this.all_valid_selected_count;
      let absc = this.all_bad_selected_count;

      let out = $t(`Upload selected title ${avsc == 1 ? 1 : 2}`, { count: avsc, ...this.toUploadCountsReport });
      if (absc)
        out +=
          "\n" +
          $t(`Upload selected title without ${absc == 1 ? 1 : 2}`, { ...this.toUploadCountsReport });
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
    sendAllIcon_vue_awesome:()=>['fas','upload'],
    //sendAllIcon: () => "fas fa-upload",
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

    all_obj() {
      return {
        all_count:this.all.length,
        all_size: this.all.reduce((sum, cur) => cur.file.size + sum, 0),
        all_size_beauty: this.sizeMethod(this.all.reduce((sum, cur) => cur.file.size + sum, 0))
      }
    },

    /* ALL */
    all() { return this.selectedVideosGetter; },
    all_count() {return this.all.length; },
    all_size() { return this.all.reduce((sum, cur) => cur.file.size + sum, 0);},
    all_size_beauty() { return this.sizeMethod(this.all_size); },

    /* ALL SELECTED */
    all_selected() {return this.all.filter(e => e.selected && e.percentCompleted == null);},
    all_selected_count() {return this.all_selected.length;},
    all_selected_size() {return this.all_selected.reduce((sum, cur) => cur.file.size + sum, 0);},
    all_selected_size_beauty() { return this.sizeMethod(this.all_selected_size); },

    /* ALL VALID */
    all_valid() {return this.all.filter(e => e.sizeOK && e.typeOK && !('durationOK' in e && !e.durationOK));},
    all_valid_count() {return this.all_valid.length;},
    all_valid_size() {return this.all_valid.reduce((sum, cur) => cur.file.size + sum, 0);},
    all_valid_size_beauty() { return this.sizeMethod(this.all_valid_size); },

  /* ALL TRANSFERING */
    all_valid_transfering() {return this.all.filter( e => e.sizeOK && e.typeOK && !('durationOK' in e && !e.durationOK) && e.percentCompleted != null);},
    all_valid_transfering_count() {return this.all_valid_transfering.length;},
    all_valid_transfering_size() {return this.all_valid.reduce((sum, cur) => cur.file.size + sum, 0);},
    all_valid_transfering_size_beauty() { return this.sizeMethod(this.all_valid_transfering_size); },

    /* ALL NON-TRANSFERING */
    all_noneTransfering() {return this.all.filter(e => e.percentCompleted == null);},
    all_noneTransfering_count() {return this.all_noneTransfering.length;},
    all_noneTransfering_size() {return this.all.reduce((sum, cur) => cur.file.size + sum, 0);},
    all_noneTransfering_size_beauty() { return this.sizeMethod(this.all_noneTransfering_size); },

    /* ALL VALID NON-TRANSFERING */
    all_valid_noneTransfering() {return this.all.filter(e => e.sizeOK && e.typeOK && e.percentCompleted == null);},
    all_valid_noneTransfering_count() {return this.all_valid_noneTransfering.length;},
    all_valid_noneTransfering_size() {return this.all_valid.reduce((sum, cur) => cur.file.size + sum, 0);},
    all_valid_noneTransfering_size_beauty() { return this.sizeMethod(this.all_valid_noneTransfering_size); },

    /* ALL VALID CHOOSE */
    all_valid_selected() {return this.all_valid.filter(e => e.selected && e.percentCompleted == null);},
    all_valid_selected_count() {return this.all_valid_selected.length;},
    all_valid_selected_size() {return this.all_valid_selected.reduce((sum, cur) => cur.file.size + sum,0);},
    all_valid_selected_size_beauty() { return this.sizeMethod(this.all_valid_selected_size); },

    /* ALL VALID SELECTED NON-TRANSFERING */
    all_valid_selected_noneTransfering() {return this.all_valid_noneTransfering.filter(e => e.selected );},
    all_valid_selected_noneTransfering_count() {return this.all_valid_selected_noneTransfering.length;},
    all_valid_selected_noneTransfering_size() {return this.all_valid_selected_noneTransfering.reduce((sum, cur) => cur.file.size + sum, 0);},
    all_valid_selected_noneTransfering_size_beauty() { return this.sizeMethod(this.all_valid_selected_noneTransfering_size); },

    /* ALL NON-UPLOADING SELECTED with non-valid*/
    all_noneUploading_selected() {return this.all.filter(e => e.selected && e.percentCompleted == null);},
    all_valid_selected_count() {return this.all_noneUploading_selected.length;},
    all_valid_selected_size() { return this.calc_SIZE(this.all_noneUploading_selected) },
    all_valid_selected_size_beauty() { return this.sizeMethod(this.all_valid_selected_size); },

    /* ALL BAD*/
    all_bad() {return this.all.filter(e => !e.sizeOK || !e.typeOK || ('durationOK' in e && !e.durationOK) ) ;},
    all_bad_count() {return this.all_bad.length;},
    all_bad_size() {return this.all_bad.reduce((sum, cur) => cur.file.size + sum, 0);},
    all_bad_size_beauty() { return this.sizeMethod(this.all_bad_size); },

    /* ALL BAD SELECTED */
    all_bad_selected() {return this.all_bad.filter(e => e.selected);},
    all_bad_selected_count() {return this.all_bad_selected.length;},
    all_bad_selected_size() {return this.all_bad_selected.reduce((sum, cur) => cur.file.size + sum, 0);},
    all_bad_selected_size_beauty() { return this.sizeMethod(this.all_bad_selected_size); },

    toUploadCountsReport() { return {  "all_count":this.all_count,
        all_size_beauty:  this.all_size_beauty,
        all_selected_count: this.all_selected_count,
        all_selected_size_beauty: this.all_selected_size_beauty,
        all_valid_count:  this.all_valid_count,
        all_valid_size_beauty:  this.all_valid_size_beauty,
        all_valid_transfering_count:  this.all_valid_transfering_count,
        all_valid_transfering_size_beauty:  this.all_valid_transfering_size_beauty,
        all_valid_noneTransfering_count:  this.all_valid_noneTransfering_count,
        all_valid_noneTransfering_size_beauty:  this.all_valid_noneTransfering_size_beauty,
        all_valid_selected_count: this.all_valid_selected_count,
        all_valid_selected_size_beauty: this.all_valid_selected_size_beauty,
        all_bad_count:  this.all_bad_count,
        all_bad_size_beauty:  this.all_bad_size_beauty,
        all_bad_selected_count: this.all_bad_selected_count,
        all_bad_selected_size_beauty: this.all_bad_selected_size_beauty,
        "all_noneTransfering_count":  this.all_noneTransfering_count,
        "all_noneTransfering_size_beauty":  this.all_noneTransfering_size_beauty,
        "all_valid_selected_noneTransfering_count":this.all_valid_selected_noneTransfering_count,
        "all_valid_selected_noneTransfering_size_beauty": this.all_valid_selected_noneTransfering_size_beauty,
      }
    },

    stopAllClass: () => "btn btn-danger",
    //stopAllIcon: () => "far fa-hand-paper",
    stopAllIcon_vue_awesome: ()=> ['fas', 'hand-paper'],
    stopAllTitle() {
      const count = this.selectedVideosGetter.filter( e => e.percentCompleted != null ).length;
      return this.$t(`Stop all title ${count == 1 ? 1 : 2}`, { count });
    },
    stopAllText() {
      return this.stopAllTitle;
    },
  },
  methods: {

    calc_SIZE: arr => arr.reduce((sum, cur) => cur.file.size + sum,0) ,



  }
};


export const localCheckers = { // НЕ ИСПОЛЬЗУЕТСЯ!!!!!!!!!!!!!!!!
  computed: {
    ...mapState(["maxSize"]),
    sizeCheck_comp() {
      return this.maxSize * 1000 * 1000 > this.file.size ? "size-success" : "size-error";
    },
    typeCheck_comp() {
      return this.file.type && this.file.type.split("/")[0] == "video"
        ? "type-success"
        : "type-error";
    },
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
