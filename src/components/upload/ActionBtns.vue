<template>
  <div align="center">
    <div>
      <button
        class="btn"
        v-if="!isInProgress"
        @click.stop="sendHandler"
        :class="sendClass"
        v-b-tooltip.hover
        :title="send_btn_tooltip"
      >
        <font-awesome-icon :icon="['fa', 'share-square']" />
        <!--<i class="far fa-share-square"></i>-->
      </button>

      <button
        class="btn"
        v-if="!isInProgress"
        @click.stop="delete_Mixin"
        v-b-tooltip.hover
        :title="$t('Delete the file')"
      >
        <font-awesome-icon
          :icon="['fa', 'trash-alt']"
        /><!--<i class="far fa-trash-alt"></i>-->
      </button>

      <button
        class="btn"
        v-if="!isInProgress && obj.error"
        @click.stop
        v-b-tooltip.hover
        :title="$t(obj.error)"
      >
        <font-awesome-icon
          :icon="['fas', 'exclamation']"
          class="text-danger"
        /><!--<i class="fas fa-exclamation text-danger"></i>-->
      </button>

      <button
        class="btn"
        v-if="isInProgress"
        @click.stop="stop_Mixin"
        v-b-tooltip.hover
        :title="$t('Stop')"
      >
        <font-awesome-icon
          :icon="['fas', 'stop-circle']"
        /><!--<i class="far fa-stop-circle"></i>-->
      </button>
    </div>

    <div class="progress-bar">
      <progressBar
        v-if="isInProgress"
        :percent="+obj.percentCompleted"
        :obj="obj"
      />
    </div>
  </div>
</template>

<script>
import progressBar from "./ProgressBar";
import { mapMutations, mapActions, mapState } from "vuex";

import checkMixins from "@/mixins.js";
import { selectedFilesMethods } from "@/mixins.js";

export default {
  name: "Action-Btns",
  components: { progressBar },
  mixins: [checkMixins, selectedFilesMethods],
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["upload", "getVideoList"]),
    ...mapMutations([
      "deleteFromSelectedVideos" // `this.incrementBy(amount)` будет вызывать `this.$store.commit('incrementBy', amount)`
    ]),

    async sendHandler() {
      let up = await this.upload({ hash: this.obj.hash });
      if (up && up.status === 1) this.getVideoList();
      else console.warn("Upload was winished with errors!");
    }
  },
  computed: {
    ...mapState(["selectedVideos", "getTime"]),
    isInProgress() {
      return !isNaN(parseInt(this.obj.percentCompleted));
    },
    sendClass() {
      let durationOK = true;
      if ("durationOK" in this.obj) durationOK = this.obj.durationOK;
      return !this.obj.sizeOK || !this.obj.typeOK || !durationOK ? "block" : "";
    },
    send_btn_tooltip() {
      let durationOK = true;
      if ("durationOK" in this.obj) durationOK = this.obj.durationOK;
      return !this.obj.sizeOK || !this.obj.typeOK || !durationOK
        ? this.$t("You can't send this file")
        : this.$t("Upload the file", { filename: this.obj.file.name });
    }
  }
};
</script>

<style scoped lang="scss">
.block {
  cursor: not-allowed;
  color: gray;
  &:hover {
    background: gray;
    color: black;
  }
}
button {
  transition: 0.5s;
  margin: 3px;
  padding: 2px 6px 2px 6px;
  &:hover {
    background: orangered;
    transform: scale(1.1);
    color: white;
  }
}
</style>
