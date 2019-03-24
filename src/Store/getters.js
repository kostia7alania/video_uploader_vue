export default {
  //DEPRECATED:
  /*getBrowsedFiles: state => {
    let au  = state.selectedVideos
    let aus  = state.selectedSort
    let aust  = state.selectedSortType
    return au;
  } */
  uploadedList: state => {
    /*uploadedListSort uploadedListSortType*/
    let ls = state.alreadyUploaded;
    let key = state.uploadedListSort;
    let type = state.uploadedListSortType;

    let parseFunc = obj => obj[key];

    let asc = (a, b) => (a > b ? 1 : a < b ? -1 : 0);
    let desc = (a, b) => (a > b ? 1 : a < b ? -1 : 0);

    return type
      ? ls.sort((a, b) => asc(parseFunc(a), parseFunc(b)))
      : ls.sort((a, b) => desc(parseFunc(b), parseFunc(a)));
  },
  modalActiveFileGetter: state => {
    return (
      state.modalActiveIndex !== false &&
      state.alreadyUploaded[state.modalActiveIndex]
    );
  },

  selectedVideosGetter: state => {
    const sel = state.selectedVideos,
      keys = Object.keys(sel);
    let res = keys.map(e => sel[e]);
    console.warn("GETTER=>", res);

    /* SORT */
    const key = state.selectedVideos_Sort;
    if (key != "") {
      const type = state.selectedVideos_SortType;

      const parseFunc =
        key === "selected" || key === "comment"
          ? obj => obj[key]
          : obj => obj.file[key];

      const asc = (a, b) => {
        [a, b] = nullToEmpty(a, b);
        return a == null || b == null ? 0 : a > b ? 1 : a < b ? -1 : 0;
      };

      const desc = (a, b) => {
        [a, b] = nullToEmpty(a, b);
        return a > b ? 1 : a < b ? -1 : 0;
      };
      const nullToEmpty = (a, b) => [a == null ? "" : a, b == null ? "" : b];
      type
        ? res.sort((a, b) => asc(parseFunc(a), parseFunc(b)))
        : res.sort((a, b) => desc(parseFunc(b), parseFunc(a)));
    }
    /* <== S O R T */

    return res;
  }
};
