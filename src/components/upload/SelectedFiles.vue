<template>
  <b-container fluid class="table-responsive">
    <table class="table table-hover table-bordered table-striped">
      <thead v-show="selectedVideos.length || system_isLoading_comp" class="sticky table-dark">
        <SelectedFilesHead />
      </thead>

      <transition-group mode="in-out" tag="tbody" name="table-row">
        <SelectedFilesRow
          @contextmenu.prevent="$refs.menu.open($event, { ...obj, index })"
          v-for="(obj, index) in selectedVideos"
          :obj="obj"
          :index="index"
          :key="obj.fileData.hash"
          @beforeDestroy="$refs.menu.close()"
        />
      </transition-group>

      <SelFilesLoading v-show="system_isLoading_comp" />

      <tfoot v-show="selectedVideos.length || system_isLoading_comp" >
        <SelectedFilesHead />
      </tfoot>
    </table>

<!-- CONTEXT>> -->
    <ContextMenu ref="menu">
      <template slot-scope="{ contextData }">
        <ContextMenuItem
          v-if="whatShow({ name: 'upload', obj: contextData })"
          @click.native="slot_click({ name: 'upload', obj: contextData })"
          :class="sendClass({ obj: contextData })"
          v-b-tooltip.hover.left
          :title="send_btn_tooltip({ obj: contextData })"
        >
          <span
            ><i class="far fa-share-square"></i>
            Upload the file
          </span>
        </ContextMenuItem>

        <ContextMenuItem
          v-if="whatShow({ name: 'delete', obj: contextData })"
          @click.native="slot_click({ name: 'delete', obj: contextData })"
          v-b-tooltip.hover.left
          :title="`Delete: ${parseVal(contextData, 'name')}`"
        >
          <span
            ><i class="far fa-trash-alt"></i>
            Delete the file
          </span>
        </ContextMenuItem>

        <ContextMenuItem
          v-if="whatShow({ name: 'stop', obj: contextData })"
          @click.native="slot_click({ name: 'stop', obj: contextData })"
          v-b-tooltip.hover.left
          :title="`Stop transfering: ${parseVal(contextData, 'name')}`"
        >
          <span
            ><i class="far fa-stop-circle"></i>
            Stop
          </span>
        </ContextMenuItem>
      </template>
    </ContextMenu>
<!-- <<CONTEXT-->

  </b-container>
</template>

<script>
import SelectedFilesHead from "./SelectedFilesHead";
import SelectedFilesRow from "./SelectedFilesRow";

import ContextMenu from "@/components/ContextMenu/ContextMenu";
import ContextMenuItem from "@/components/ContextMenu/ContextMenuItem";
import { filters, selectedFilesCounts } from "@/mixins.js";

import { mapState, mapMutations, mapActions } from "vuex";

import SelFilesLoading from './SelectedFiles__loading'

export default {
  name: "Selected-Videos", 
  mixins: [filters, selectedFilesCounts],
  components: {
    SelectedFilesRow,
    SelectedFilesHead,
    ContextMenu,
    ContextMenuItem,
    SelFilesLoading,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "selectedVideos",
      "SelectedFiles__IsLoading",
    ]),
    system_isLoading_comp() {
      let t = this.SelectedFiles__IsLoading;
      return t?t:false;
    },
  },
  methods: {
    ...mapActions([
      "upload",
      "getVideoList"
    ]),
    ...mapMutations([
      "deleteEntry"
    ]),
    parseVal(e, name) {
      if (!name || typeof e != "object" || e === null || !("fileData" in e))
        return;
      console.log(e, name);
      if (name == "name") return e.fileData.file.name;
    },
    whatShow({ name, obj }) {
      if (
        typeof obj !== "object" ||
        obj === null ||
        typeof obj.fileData !== "object"
      )
        return;
      const perc = obj.userData.percentCompleted;
      if (name === "upload") return perc == null;
      if (name === "delete") return perc == null;
      if (name === "stop") return perc != null;
    },

    async slot_click({ name, obj }) {
      this.$refs.menu.close();
      const index = obj.index;
      console.log("click=?", obj);

      if (name == "upload") {
        let up = await this.upload({ index, data: this.selectedVideos[index] });
        if (up && up.status === 1) this.getVideoList();
        else console.warn("Upload was winished with errors!");
      }

      if (name == "delete") {
        this.deleteEntry({ prop: "selectedVideos", index });
      }

      if (name == "stop") {
        obj.userData.source.cancel("Cancelled by user!");
      }
    },

    sendClass({ obj }) {
      if (
        typeof obj !== "object" ||
        obj === null ||
        typeof obj.fileData !== "object"
      )
        return;
      const fd = obj.fileData;
      return !fd.sizeOK || !fd.typeOK ? "block text-muted" : "";
    },

    send_btn_tooltip({ obj }) {
      if (
        typeof obj !== "object" ||
        obj === null ||
        typeof obj.fileData !== "object"
      )
        return;
      const fd = obj.fileData;
      return !fd.sizeOK || !fd.typeOK
        ? "You can't send this file"
        : `Upload: ${this.parseVal(obj, "name")}`;
    }
  }
};
</script>

<style lang="scss">
.block {
  cursor: not-allowed;
  color: gray;
  &:hover {
    background: gray;
    color: black;
  }
}

.table-row {
  overflow: hidden;
  transition: height 350ms;
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-leave,
  &-enter-to {
    opacity: 1;
  }
  &-enter-active,
  &-leave-active {
    transition: opacity 200ms ease-in-out;
  }
  &-enter-active {
    transition-delay: 100ms;
  }
}
</style>
