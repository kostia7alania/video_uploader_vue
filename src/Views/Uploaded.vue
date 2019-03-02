<template>
  <div>
    <h1>Already uploaded</h1>
    <UploadedRefreshBtn :shown="shown" @updated="shown = true"/>
    <UploadedVideos v-if="alreadyUploaded.length" :alreadyUploaded="alreadyUploaded"/>
    <h1 v-else-if="shown">Your video-list is empty! Please, try load you video again or convert it to another format!</h1>
    <p v-else>Click the button to get the list with uploaded videos!</p>
  </div>
</template>

<script>
import UploadedVideos from "../components/uploaded/UploadedVideos";
import UploadedRefreshBtn from "../components/uploaded/UploadedRefreshBtn";

export default {
  name: "Uploaded",
  data() {
    return {
      shown: false
    };
  },
  components: {
    UploadedVideos,
    UploadedRefreshBtn
  },
  computed: {
    alreadyUploaded() {
      return this.$store.state.alreadyUploaded;
    }
  }
};
</script>
 
<style scoped lang="scss">
</style>
