export default {
  methods: {
    sizeCheck(e) { return this.$store.state.maxSize > e ? "size-success" : "size-error"; },
    typeCheck: e => e && e.split("/")[0] == "video" ? "type-success" : "type-error"
  },
  size(e) { return this.$store.state.maxSize > e  ? true : false; },
  type:e => e && e.split("/")[0] == "video"      ? true : false
}


import { mapMutations, mapState, mapActions } from 'vuex'; 

export const selectedFilesCounts = {
  data() {
    return {
      removeAllText: "Remove all",
      removeSelectedText: "Remove selected",
    };
  },
  methods: {
    ...mapActions([
      'prepareToUploadAll',
      'removeSelectedAction',
      'sendSelectedAction',
    ]),
    ...mapMutations([
      'removeAll',
      'deleteEntry',
    ]),
    sendAllHandler() { this.prepareToUploadAll(); },
    deleteHandler() {
      this.deleteEntry({
        prop: "selectedVideos",
        index: this.index
      });
    }
  },
  computed: {
    ...mapState([ 'selectedVideos' ]),
    sendAllText() {
      return `Send all ${this.all_bad_count ? "valid" : ""} ${ this.all_valid_count } (${this.sizeMethod(this.all_valid_size)})`;
    },
    sendSelectedText() {
      return `Upload ${ this.all_valid_selected_count } ${this.all_bad_count ? "valid" : ""}  selected (${this.sizeMethod(this.all_valid_selected_size)})`;
    },
    sendAllTitle(){
        return `We will upload  ${this.all_valid_count} files \n(${this.sizeMethod(this.all_valid_size)})`;
      if(this.all_bad_count){
         return `We will upload only valid ${this.all_valid_count} file${this.all_valid_count>1?'s':''} (${this.sizeMethod(this.all_valid_size)})
                 and skip invalid ${this.all_bad_count} file${this.all_bad_count>1?'s':''} (${this.sizeMethod(this.all_bad_size)})`
      }
    },

    all() {return this.selectedVideos},
    all_count() {return this.all.length;},
    all_size() {return this.all.reduce((sum, cur) => cur.fileData.file.size + sum, 0);},

    all_selected() {return this.all.filter(e => e.userData.selected);},
    all_selected_count() {return this.all_selected.length;},
    all_selected_size() {return this.all_selected.reduce((sum, cur) => cur.fileData.file.size + sum,0);},

    all_valid() {return this.all.filter(e => e.fileData.sizeOK && e.fileData.typeOK);},
    all_valid_count() {return this.all_valid.length;},
    all_valid_size() {return this.all_valid.reduce((sum, cur) => cur.fileData.file.size + sum,0);},

    all_valid_selected() {return this.all_valid.filter(e => e.userData.selected);},
    all_valid_selected_count() {return this.all_valid_selected.length;},
    all_valid_selected_size() {return this.all_valid_selected.reduce((sum, cur) => cur.fileData.file.size + sum,0);},

    all_bad() {return this.all.filter(e => !e.fileData.sizeOK || !e.fileData.typeOK);},
    all_bad_count() {return this.all_bad.length;},
    all_bad_size() {return this.all_bad.reduce((sum, cur) => cur.fileData.file.size + sum, 0);},

    all_bad_selected() { return this.all_bad.filter(e => e.userData.selected); },
    all_bad_selected_count() { return this.all_bad_selected.length; },
    all_bad_selected_size() { return this.all_bad_selected.reduce( (sum, cur) => cur.fileData.file.size + sum, 0); }
  }
}

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
}

export const localCheckers = {
  computed: {
    sizeCheck_comp(){
      return this.$store.state.maxSize > this.file.size ? "size-success" : "size-error"; 
    },
    typeCheck_comp() {
      return this.file.type && this.file.type.split("/")[0] == "video" ? "type-success" : "type-error"
    }
  }
}