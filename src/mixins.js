export default {
  methods: {
    sizeCheck(e) { return this.$store.state.maxSize > e ? "size-success" : "size-error"; },
    typeCheck: e => e && e.split("/")[0] == "video" ? "type-success" : "type-error"
  },
  size(e) { return this.$store.state.maxSize > e  ? true : false; },
  type:e => e && e.split("/")[0] == "video"      ? true : false
}

export const filters = {
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