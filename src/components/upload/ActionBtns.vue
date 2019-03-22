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
        <i class="far fa-share-square"></i>
      </button>

      <button
        class="btn"
        v-if="!isInProgress"
        @click.stop="deleteHandler"
        v-b-tooltip.hover
        title="Delete the file"
      >
        <i class="far fa-trash-alt"></i>
      </button>

      <button
        class="btn"
        v-if="!isInProgress && fileUserIndexData.error"
        @click.stop
        v-b-tooltip.hover
        :title="fileUserIndexData.error"
      >
        <i class="fas fa-exclamation text-danger"></i>
      </button>

      <button
        class="btn"
        v-if="isInProgress"
        @click.stop="stopHandler"
        v-b-tooltip.hover
        title="Stop"
      >
        <i class="far fa-stop-circle"></i>
      </button>
    </div>

    <div class="progress-bar">
      <progressBar
        v-if="isInProgress"
        :percent="+fileUserIndexData.percentCompleted"
        :fileUserIndexData="fileUserIndexData"
      />
    </div>
  </div>
</template>

<script>
import checkMixins from "@/mixins.js";
import { localCheckers } from "@/mixins.js";
import progressBar from "./ProgressBar";

import { mapMutations, mapActions, mapState } from "vuex";

export default {
  name: "Action-Btns",
  components: { progressBar },
  mixins: [checkMixins, localCheckers],
  props: { fileUserIndexData: Object },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["upload", "getVideoList"]),
    ...mapMutations([
      "deleteEntry" // `this.incrementBy(amount)` будет вызывать `this.$store.commit('incrementBy', amount)`
    ]),

    async sendHandler() {
      let up = await this.upload({
        index: this.fileUserIndexData.index,
        data: this.selectedVideos[this.fileUserIndexData.index]
      });
      if (up && up.status === 1) this.getVideoList();
      else console.warn("Upload was winished with errors!");
    },

    deleteHandler() {
      this.deleteEntry({
        prop: "selectedVideos",
        index: this.fileUserIndexData.index
      });
    },

    stopHandler() {
      this.selectedVideos[this.fileUserIndexData.index].userData.source.cancel(
        "Cancelled by user!"
      );
    }
  },
  mounted() {
    //  console.log('OBJ.>>>',this.fileUserIndexData)
  },
  computed: {
    ...mapState(["selectedVideos", "getTime"]),

    isInProgress() {
      return !isNaN(parseInt(this.fileUserIndexData.percentCompleted));
    },
    sendClass() {
      return !this.fileUserIndexData.sizeOK || !this.fileUserIndexData.typeOK
        ? "block"
        : "";
    },
    send_btn_tooltip() {
      return !this.fileUserIndexData.sizeOK || !this.fileUserIndexData.typeOK
        ? "You can't send this file"
        : "Send the file";
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
