<template>
  <ul fill class="nav nav-pills nav-justified tab-line">
    <li class="nav-item" sm="6">
      <a
        href="#"
        @click.prevent="routeChange('/')"
        v-b-tooltip.hover :title="uploadTabTitle"
        class="nav-link"
        :class="uploadTabClass"
      >
        <font-awesome-icon :icon="uploadIcon" :class="{'fa-spin':isLoadingUploader}" :spin="uploadIcon=='spinner'?true:false"/>
        <!--<i :class="uploadIcon"></i>-->
        {{ $t("Tabs_vue.Upload") }}
        <b-badge v-if="all_count" class="tab-badge"
          v-b-tooltip.hover.bottom :title="$t(`Tabs_vue['Selected files number in tab']`, {...toUploadCountsReport})"
          pill :variant="activeTab == '/' || activeTab == 'Home' ? 'info' : 'primary'">{{ all_count }}</b-badge>

        <b-badge v-if="all_valid_transfering_count" class="tab-badge"
          v-b-tooltip.hover.bottom :title="$t(`Tabs_vue['Selected files number tranfering in tab ${all_valid_transfering_count==1?1:2}']`, {...toUploadCountsReport})"
          pill variant="danger">{{ all_valid_transfering_count }}</b-badge>

        <b-badge v-if="all_valid_transfering_count" class="tab-badge stop-badge"
          @click="stopAll_Mixin"
          v-b-tooltip.hover.bottom :title="$t(`Tabs_vue['Stop transfer ${all_valid_transfering_count==1?1:2}']`, {...toUploadCountsReport})"
          pill variant="default">
            <font-awesome-icon icon="stop-circle"/> <!--<i class="far fa-stop-circle"></i> -->
          </b-badge>
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
      <font-awesome-icon :icon="alreadyUploadedIcon" :spin="alreadyUploadedIcon=='spinner'?true:false"/> <!--<i :class="alreadyUploadedIcon"></i>-->
        {{ $t("Tabs_vue.Uploaded") }}
        <b-badge
          class="tab-badge"
          v-b-tooltip.hover.bottom :title="$t(`Tabs_vue['Already uploaded number in tab ${alreadyUploaded.length==1?1:2}']`, {count: alreadyUploaded.length })"
          v-if="alreadyUploaded.length"
          pill
          :variant="activeTab == 'uploaded' ? 'info' : 'primary'"
          >{{ alreadyUploaded.length }}</b-badge>
      </a>
    </li>
  </ul>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import MultiProgressBar from "../components/upload/MultiProgressBar";
import { selectedFilesCounts, selectedFilesMethods } from "@/mixins.js";

export default {
  name: "Tabs",
  components: {
    MultiProgressBar
  },
  mixins: [selectedFilesCounts, selectedFilesMethods],
  data() {
    return {
      activeTab: null
    };
  },
  methods: {
    ...mapActions([
    ]),
    routeChange(name) {
      this.$router.push(name);
      this.activeTab = name;
    }
  },
  mounted() {
    this.$router.onReady(route => route && route.name ? (this.activeTab = route.name):'');
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
      return this.activeTab == "uploaded" || 1;
    },

    isLoadingUploader() {
      return this.selectedVideosGetter.filter(e => e.percentCompleted != null).length;
    },
    alreadyUploadedIcon() {
      return this.alreadyUploaded_btn_status == 2
        ? "spinner"//fas
        : "film";//fas
    },

    uploadIcon() {
      return this.isLoadingUploader
        ? "spinner"//fas
        : "upload";
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  cursor: not-allowed !important;
}

a.nav-link{
  transition: .5s;
    &.active {
      background-color: #343a40 !important;
    }

    &:active {
      transform: scale(.99);
      color: dark;
    }

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
.tab-badge {
  transition: .3s;
  &:hover {
    transform: scale(1.3)
  }
}
.stop-badge {
  cursor: pointer;
  &:hover {
    transform: scale(2);
    color: red;
  }
}
</style>
