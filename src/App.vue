<template>
  <div id="app">
    <header-section/>
    <Upload/>
    <Uploaded/>
    <footer-section/>
  </div>
</template>

<script>

import header from "@/Views/Header";
import footer from "@/Views/Footer";
import Upload from "@/Views/Upload";
import Uploaded from "@/Views/Uploaded";

export default {
  name: "app", 
  components: {
    Upload,
    Uploaded,
    'header-section': header,
    'footer-section': footer,
  }, 
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
