<template>
  <div id="appVideoUploader">
    <DragDropZone />
    <SelectedFiles />
    <UploadBottomBtns v-if="selectedVideosGetter.length" />
    <MultiProgressBar class="mt-2" />
  </div>
</template>

<script>
const SelectedFiles = () => import("../components/upload/SelectedFiles");
const DragDropZone = () => import("../components/upload/DragDropZone");
const MultiProgressBar = () => import("../components/upload/MultiProgressBar");
const UploadBottomBtns = () => import("../components/upload/UploadBottomBtns");

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
    return {};
  },
  methods: {
    ...mapActions(["getVideoList"])
  },
  mounted() {
    if (!this.canWrite) this.$router.push("uploaded");
    if (!this.isLoadedList) this.getVideoList();
  },
  computed: {
    ...mapGetters(["selectedVideosGetter"]),
    ...mapState(["isLoadedList", "canWrite"])
  }
};
</script>
