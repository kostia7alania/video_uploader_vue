<template>
  <b-tabs fill content-class="mt-3">
    <b-tab :active="activeTab == '/'" @click="routeChange('/')">
      <template slot="title">
        <i :class="uploadIcon"></i>
        {{ uploadTabName }}
        <b-badge
          v-if="all_valid_count"
          pill
          :variant="activeTab == '/' ? 'dark' : 'primary'"
          >{{ all_valid_count }}</b-badge
        >
        <MultiProgressBar v-show="progressShow" />
      </template>
      <router-view />
    </b-tab>
    <b-tab :active="activeTab == 'uploaded'" @click="routeChange('uploaded')">
      <template slot="title">
        <i :class="alreadyUploadedIcon"></i>
        {{ alreadyUploadedTabName }}
        <b-badge
          v-if="alreadyUploaded.length"
          pill
          :variant="activeTab == 'uploaded' ? 'dark' : 'primary'"
        >
          {{ alreadyUploaded.length }}</b-badge
        >
      </template>

      <router-view />
    </b-tab>
  </b-tabs>
</template>

<script>
import { mapState } from "vuex";

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
    ...mapState([
      "selectedVideos",
      "alreadyUploaded_btn_status",
      "alreadyUploaded"
    ]),

    uploadTabName() {
      return "Upload video";
    },
    alreadyUploadedTabName() {
      return "Already uploaded";
    },

    progressShow() {
      return this.activeTab == "uploaded";
    },

    isLoadingUploader() {
      return this.selectedVideos.filter(
        e => e.userData.percentCompleted != null
      ).length;
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

<style lang="scss">
.nav-tabs .nav-item {
  width: 50%;
}
a.nav-link.active {
  cursor: not-allowed !important;
}
</style>
