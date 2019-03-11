<template>
  <div>
    <h1>Already uploaded</h1>
    <UploadedRefreshBtn/> 
    <router-view/>
  </div>
</template>

<script> 
import UploadedRefreshBtn from "../components/uploaded/UploadedRefreshBtn";

export default {
  name: "Uploaded",
  components: {UploadedRefreshBtn},
};
</script> 
