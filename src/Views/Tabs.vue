<template>
  <ul fill class="nav nav-pills nav-justified tab-line">
    <li class="nav-item" sm="6">
      <a
        href="#"
        @click.prevent="routeChange('/')"
        v-b-tooltip.hover
        :title="uploadTabTitle"
        class="nav-link"
        :class="uploadTabClass"
      >
        <i :class="uploadIcon"></i>
        {{ $t("Tabs_vue.Upload") }}
        <b-badge
          v-if="all_valid_count"
          pill
          :variant="
            activeTab == '/' || activeTab == 'Home' ? 'info' : 'primary'
          "
          >{{ all_valid_count }}</b-badge
        >
      </a>
      <MultiProgressBar v-show="progressShow" />
    </li>
    <li class="nav-item second-tab" sm="6">
      <a
        href="#"
        @click.prevent="routeChange('uploaded')"
        v-b-tooltip.hover
        :title="alreadyUploadedTabTitle"
        class="nav-link"
        :class="alreadyUploadedTabClass"
      >
        <i :class="alreadyUploadedIcon"></i>
        {{ $t("Tabs_vue.Uploaded") }}
        <b-badge
          v-if="alreadyUploaded.length"
          pill
          :variant="activeTab == 'uploaded' ? 'info' : 'primary'"
          >{{ alreadyUploaded.length }}</b-badge
        >
      </a>
    </li>
  </ul>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MultiProgressBar from "../components/upload/MultiProgressBar";
import { selectedFilesCounts } from "@/mixins.js";

export default {
  name: "Tabs",
  components: {
    MultiProgressBar
  },
  mixins: [selectedFilesCounts],
  data() {
    return {
      activeTab: null
    };
  },
  methods: {
    routeChange(name) {
      this.$router.push(name);
      this.activeTab = name;
    }
  },
  mounted() {
    this.$router.onReady(route => (this.activeTab = route.name));
  },
  computed: {
    ...mapGetters(["selectedVideosGetter"]),
    ...mapState(["alreadyUploaded_btn_status", "alreadyUploaded"]),

    uploadTabClass() {
      return this.activeTab == "/" || this.activeTab == "Home" ? "active" : "";
    },
    alreadyUploadedTabClass() {
      return this.activeTab == "uploaded" ? "active" : "";
    },
    uploadTabTitle() {
      return this.activeTab == "/" || this.activeTab == "Home"
        ? this.$t("Tabs_vue.You-already-in-the-tab")
        : this.$t("Tabs_vue.open-upload-section");
    },
    alreadyUploadedTabTitle() {
      return this.activeTab == "uploaded"
        ? this.$t("Tabs_vue.You-already-in-the-tab")
        : this.$t("Tabs_vue.already-uploaded-section");
    },

    progressShow() {
      return this.activeTab == "uploaded";
    },

    isLoadingUploader() {
      return this.selectedVideosGetter.filter(e => e.percentCompleted != null)
        .length;
    },
    alreadyUploadedIcon() {
      return this.alreadyUploaded_btn_status == 2
        ? "fas fa-spinner fa-spin"
        : "fas fa-film";
    },

    uploadIcon() {
      return this.isLoadingUploader
        ? "fas fa-spinner fa-spin"
        : "fas fa-upload";
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  cursor: not-allowed !important;
}
a.nav-link.active {
  background-color: #343a40 !important;
}
.nav-item {
  a {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
  }
  background-color: rgba(0, 0, 0, 0.2);
  &:hover {
    background: hsla(0, 0%, 60%, 0.5);
  }
}
.second-tab,
.second-tab:hover {
  background-color: transparent;
}
ul.nav.nav-pills.nav-justified.tab-line {
  position: -webkit-sticky;
  position: sticky !important;
  z-index: 1000;
  top: 270px !important;
}
</style>
