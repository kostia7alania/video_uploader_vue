<template>
  <div id="#appVideoUploader"> 
      <DragDropZone/>
      <SelectedFiles v-if="selectedVideos.length" :selectedVideos="selectedVideos"/>
      <UploadAllBtn v-if="selectedVideos.length" />
      <ProgressBar/> 
  </div>
</template>


<script>

import SelectedFiles from "../components/upload/SelectedFiles";
import DragDropZone from "../components/upload/DragDropZone";
import ProgressBar from "../components/upload/ProgressBar";
import UploadAllBtn from "../components/upload/UploadAllBtn";

import axios from "axios";

export default {
  name: "Upload",
  components: {
    SelectedFiles,
    DragDropZone,
    ProgressBar,
    UploadAllBtn
  },
  props: { msg: String },
  data() {
    return {
      uploadPercentage: 0, 
      btnsend: "SEND",
      updbtn: "Update this list",
      btnalreadyuploaded: "Load already uploaded videos"
    };
  }, 
  computed: {
    selectedVideos() {
      return this.$store.state.selectedVideos;
    },
  }
};
</script>
 
<style scoped lang="scss">
 
.progress_btn {
  width: 100%;
  cursor: pointer;
}
</style>
