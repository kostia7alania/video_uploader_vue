<template>
  <div id="app">
    <div class="wrapper d-flex flex-column">
      <header-section />
      <main>
        <Tabs />
        <BackToTop />
      </main>
      <footer-section />
    </div>
  </div>
</template>

<script>
import header from "@/Views/Header";
import footer from "@/Views/Footer";
import Tabs from "@/Views/Tabs";
import BackToTop from "@/components/BackToTop/BackToTop";

import { mapMutations } from "vuex";
export default {
  name: "app",
  components: {
    Tabs,
    "header-section": header,
    "footer-section": footer,
    BackToTop
  },
  methods: {
    ...mapMutations(["changeProp"])
  },
  created() {
    let p = this.$options._parentVnode.data.props;
    Object.keys(p).forEach(prop => this.changeProp({ prop, state: p[prop] })); //Записываем конфиг в стор; из initVue({prop:state})
  }
};
</script>

<style lang="scss">
body,
.wrapper {
  min-height: 100vh;
}
main {
  flex: 1;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
