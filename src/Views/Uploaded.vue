<template>
  <div>
    <h1>Already uploaded</h1>
    <UploadedRefreshBtn :shown="shown" @updated="shown = true"/> 
    <router-view :shown="shown"></router-view> 
  </div>
</template>

<script> 
import UploadedRefreshBtn from "../components/uploaded/UploadedRefreshBtn";

export default {
  name: "Uploaded",
  data() {
    return { shown: false };
  },
  components: { 
    UploadedRefreshBtn
  },
  computed: {
  }
};
</script>
 
<style scoped lang="scss">
</style>
