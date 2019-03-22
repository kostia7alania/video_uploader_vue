<template>
  <div id="appVideoUploader">
    <DragDropZone />
    <SelectedFiles  />
    <UploadBottomBtns v-if="selectedVideos.length" />
    <MultiProgressBar />
  </div>
</template>

<script>
import SelectedFiles from "../components/upload/SelectedFiles";
import DragDropZone from "../components/upload/DragDropZone";
import MultiProgressBar from "../components/upload/MultiProgressBar";
import UploadBottomBtns from "../components/upload/UploadBottomBtns";

import { mapState } from "vuex";
export default {
  name: "Upload",
  components: {
    SelectedFiles,
    DragDropZone,
    MultiProgressBar,
    UploadBottomBtns
  },
  data() {
    return {
      uploadPercentage: 0,
      btnsend: "SEND",
      updbtn: "Update this list",
      btnalreadyuploaded: "Load already uploaded videos"
    };
  },
  computed: {
    ...mapState(["selectedVideos"])
  }
};
</script>

<style scoped lang="scss">
.progress_btn {
  width: 100%;
  cursor: pointer;
}
</style>
