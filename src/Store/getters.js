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
  }
};
