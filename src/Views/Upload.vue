<template>
  <div id="appVideoUploader">
    <DragDropZone />
    <SelectedFiles />
    <UploadBottomBtns v-if="selectedVideosGetter.length" />
    <MultiProgressBar class="mt-2" />
  </div>
</template>

<script>
import SelectedFiles from "../components/upload/SelectedFiles";
import DragDropZone from "../components/upload/DragDropZone";
import MultiProgressBar from "../components/upload/MultiProgressBar";
import UploadBottomBtns from "../components/upload/UploadBottomBtns";

import { mapState, mapGetters, mapActions } from "vuex";
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
  methods: {
    ...mapActions(["getVideoList"])
  },
  mounted() {
    if (this.canWrite && !this.isLoadedList) this.getVideoList();
    if(!this.canWrite) { this.$router.push('uploaded');}
  },
  computed: {
    ...mapGetters(["selectedVideosGetter"]),
    ...mapState(["isLoadedList",'canWrite'])
  }
};
</script>
