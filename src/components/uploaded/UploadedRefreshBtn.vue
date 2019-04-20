<i18n>
{
  "en": {
    "Show list":"Show list",
    "Cancelled":"Cancelled",
    "Loading":"Loading..",
    "Error":"Error",
    "Success":"Success",
    "Refresh list":"Refresh",
    "The list is empty":"List is empty"
  },
  "ru": {
    "Show list":"Показать список",
    "Cancelled":"Отменено",
    "Loading":"Загрузка..",
    "Error":"Ошибка",
    "Success":"Успешно",
    "Refresh list":"Обновить"
   }
}
</i18n>

<template>
  <b-button-group>
    <b-button
      v-b-tooltip.hover.left
      :title="lastUpdatedTitle"
      :class="btn_class"
      class="btn btn-active"
      @click="load"
    >
    <font-awesome-icon :icon="btn_icon_class" :class="status==2?'fa-spin':''" />
      <!--<i :class="btn_icon_class" class="fa" />-->
      {{ btn_text }}
    </b-button>

    <!--<b-dropdown v-if="shown" right text="Menu">
      <b-dropdown-item @click="hide"><i class="far fa-eye-slash"></i> Hide list</b-dropdown-item>
      <! --<b-dropdown-divider />-- >
    </b-dropdown>-->
  </b-button-group>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "Uploaded-Refresh-Btn",
  props: {},
  data() {
    return {
      timeout: null
    }; //0-init,1-refreshed,2-loading,3-normal,4-error,5-success,6-cancelled
  },
  mounted() {
    if (!this.isLoadedList) this.load();
    //    if(this.shown) this.load()
    //  else this.getVideoList()//for getting HASH -- for prevent(alerting) upload DUPLICATES videos;
  },
  computed: {
    shown() {
      return this.$route.name === "uploaded";
    },
    ...mapState([
      "isLoadedList",
      "source",
      "lastUpdatedAlsoLoaded",
      "alreadyUploaded_btn_status"
    ]),
    status() {
      return this.alreadyUploaded_btn_status;
    },
    lastUpdatedTitle() {
      if (!this.shown) return "Show already uploaded list";
      let loaded = this.lastUpdatedAlsoLoaded;
      return loaded
        ? this.$t("Uploaded_vue['Last updated']") +
            "\n" +
            this.lastUpdatedAlsoLoaded.toLocaleString()
        : "";
    },
    btn_class() {
      let s = this.status;
      if (s === 6) return "btn-danger";
      if (s === 5) return "btn-success";
      if (s === 4) return "btn-danger";
      if (s === 2) return "btn-dark loading";
      return "btn-warning";
    },
    btn_icon_class() {
      let s = this.status;
      return s == 0 ? "cloud-download-alt"//все были с приставкой fa-
        : s == 1 ? "sync-alt"
        : s == 2 ? "splotch"//fa-spin
        : s == 3 ? "splotch"
        : s == 4 ? "skull-crossbones"
        : s == 6 ? "skull-crossbones"
                 : "smile-wink";
    },
    btn_text() {
      let status = this.status;
      let shown = this.shown;
      if (!shown) return this.$t("Show list");
      if (status == 6) return this.$t("Cancelled");
      if (status == 2) return this.$t("Loading");
      if (status == 4) return this.$t("Error");
      if (status == 5) return this.$t("Success");
      if (shown) return this.$t("Refresh list");
      return false;
    }
  },
  methods: {
    ...mapMutations(["changeProp"]),
    ...mapActions(["getVideoList"]),
    changeStatus(state) {
      clearInterval(this.timeout); //prevent sheduled events;
      this.timeout = null;
      this.changeProp({ prop: "alreadyUploaded_btn_status", state });
    },
    hide() {
      this.$router.push({ name: "Home", params: { userId: 123 } });
    },
    cancel() {
      if (!this.source) return;
      this.source.cancel(this.$t("Cancelled"));
      this.tmp_change_btn({ now: 6 });
    },
    tmp_change_btn({ now = 1, after = 3 }) {
      this.changeStatus(now);
      this.timeout = setTimeout(() => this.changeStatus(after), 1500);
    },
    async load() {
      this.$router.push("uploaded");
      let s = this.alreadyUploaded_btn_status;
      if (s === 2) return this.cancel();
      this.changeStatus(2);
      let list = await this.getVideoList();
      if (typeof list === "string") {
        if (list == this.$t("Network Error")) this.tmp_change_btn({ now: 4 });
        return;
      }
      this.tmp_change_btn(list ? { now: 5 } : { now: 4 });
      if (list instanceof Array && list.lenght === 0)
        this._vm.$toast.warning(
          this.$t("The list is empty"),
          this.$store.state.getTime()
        );
    }
  }
};
</script>

<style scoped lang="scss">
.loading {
  cursor: progress;
}

</style>
