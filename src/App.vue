<template>
  <div id="app">
    <div class="wrapper d-flex flex-column" v-if="IS_CONFIG_GETTED === true">
      <HeaderVue />

      <main>
        <router-view />
        <BackToTop />
        <OfflineAlert />
      </main>
      <footer-section />
    </div>
    <div v-else-if="IS_CONFIG_GETTED">
      {{ IS_CONFIG_GETTED }}
    </div>
    <div v-else class="getting-config">
      <Loading />
      <br />
      Getting configuration...
    </div>
  </div>
</template>

<script>
const HeaderVue = () => import("./Views/Header");
const footer = () => import("@/Views/Footer");
const OfflineAlert = () => import("@/Views/OfflineAlert");
const BackToTop = () => import("@/components/BackToTop/BackToTop");
//const Loading = () => import("./Loading");
import Loading from "./Loading";

// import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "app",
  components: {
    HeaderVue,
    "footer-section": footer,
    BackToTop,
    OfflineAlert,
    Loading
  },
  methods: {
    //...mapActions(["GET_CONFIG"]),
    //...mapMutations(["changeProp"])
  },
  watch: {
    locale(locale) {
      this.$i18n.locale = locale;
    }
  },
  computed: {
    locale() {
      return this.$store.state.locale;
    },
    ///...mapState(["IS_CONFIG_GETTED"]),
    //...mapGetters(["selectedVideosGetter"])
    IS_CONFIG_GETTED() {
      return this.$store.state.IS_CONFIG_GETTED;
    }
  },
  mounted() {
    window.toast = this.$toast;
    this.$store.dispatch("GET_CONFIG");
    window.App = this;
    window.$t = (args, obj = {}) => this.$t(args, obj);
  },
  created() {
    let p = this.$options._parentVnode.data.props;
    if ("title" in p) window.document.title = p.title; //заголовок окна .!.
    Object.keys(p).forEach(prop =>
      this.$store.commit("changeProp", { prop, state: p[prop] })
    ); //Записываем конфиг в стор; из initVue({prop:state})

    window.addEventListener("beforeunload", e => {
      if (
        this.$store.getters.selectedVideosGetter.filter(
          ee => ee.percentCompleted != null
        ).length
      ) {
        e.preventDefault(); // Cancel the event
        e.returnValue = ""; // Chrome requires returnValue to be set
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
.getting-config {
  color: red;
  font-size: 2em;
}
</style>
