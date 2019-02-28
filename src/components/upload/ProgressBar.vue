<template>
  <div align="center"> 
    <progress max="100" :value="uploadPercentage"></progress>
    <p>{{uploadPercentage}}%</p>
    <p>{{transferStatus}}</p>
  </div>
</template>

<script>
export default {
  name: "Progress-Bar",
  data(){
    return {
      uploadPercentage: 0
    }
  },
  computed: {
    transferStatus() { return this.$store.state.transferStatus; }
  }
};
</script>
 
<style scoped lang="scss">
progress {
  width: 400px;
  margin: auto;
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
