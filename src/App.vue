<template>
  <div id="app">
    <div class="wrapper d-flex flex-column">
      <header-section />
      <main>
        <router-view />
        <BackToTop />
        <OfflineAlert/>
      </main>
      <footer-section />
    </div>
  </div>
</template>

<script>
import header from "@/Views/Header";
import footer from "@/Views/Footer";
import BackToTop from "@/components/BackToTop/BackToTop";
import OfflineAlert from '@/Views/OfflineAlert'

import { mapMutations, mapGetters } from "vuex";
export default {
  name: "app",
  components: {
    "header-section": header,
    "footer-section": footer,
    BackToTop,
    OfflineAlert
  },
  methods: {
    ...mapMutations(["changeProp"])
  },
  computed: {
    ...mapGetters([
      'selectedVideosGetter'
    ])
  },
  mounted() {
    window.App = this;
    window.$t = (args, obj = {}) => this.$t(args, obj);
  },
  created() {
    let p = this.$options._parentVnode.data.props;
    if('title' in p) window.document.title = p.title;//заголовок окна .!.
    Object.keys(p).forEach(prop => this.changeProp({ prop, state: p[prop] })); //Записываем конфиг в стор; из initVue({prop:state})

  window.addEventListener('beforeunload', e => {
    if(this.selectedVideosGetter.filter(ee=>ee.percentCompleted != null).length) {
      e.preventDefault();// Cancel the event
      e.returnValue = '';// Chrome requires returnValue to be set
    }
  });

  }
};
</script>

<style lang="scss">
body,
.wrapper {
  min-width: 500px;
  min-height: 100vh;
  overflow: auto;
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
