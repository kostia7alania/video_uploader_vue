<template>
  <b-container fluid class="table-responsive">
    <table class="table table-hover table-bordered table-striped">
      <thead
        v-show="selectedVideosGetter.length || system_isLoading_comp"
        class="sticky table-dark"
      >
        <SelectedFilesHead />
      </thead>

      <transition-group mode="in-out" tag="tbody" name="table-row">
        <SelectedFilesRow
          @contextmenu.prevent="$refs.menu.open($event, { ...obj })"
          v-for="(obj, index) in selectedVideosGetter"
          :obj="obj"
          :hash="obj.hash"
          :key="obj.hash"
          :index="index"
          @beforeDestroy="$refs.menu.close()"
        />
      </transition-group>

      <SelFilesLoading v-show="system_isLoading_comp" />

      <tfoot v-show="selectedVideosGetter.length || system_isLoading_comp">
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
            {{ $t("Upload the file", { filename: contextData.file.name }) }}
          </span>
        </ContextMenuItem>

        <ContextMenuItem
          v-if="whatShow({ name: 'delete', obj: contextData })"
          @click.native="slot_click({ name: 'delete', obj: contextData })"
          v-b-tooltip.hover.left
          :title="$t('Delete the file')"
        >
          <span
            ><i class="far fa-trash-alt"></i>
            {{ $t("Delete the file", { filename: contextData.file.name }) }}
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
            {{ $t("Stop") }}
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

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

import SelFilesLoading from "./SelectedFiles__loading";

export default {
  name: "Selected-Files",
  mixins: [filters, selectedFilesCounts],
  components: {
    SelectedFilesRow,
    SelectedFilesHead,
    ContextMenu,
    ContextMenuItem,
    SelFilesLoading
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["selectedVideosGetter"]),
    ...mapState(["selectedVideos", "SelectedFiles__IsLoading"]),
    system_isLoading_comp() {
      let t = this.SelectedFiles__IsLoading;
      return t ? t : false;
    }
  },
  methods: {
    ...mapActions(["upload", "getVideoList"]),
    ...mapMutations(["deleteFromSelectedVideos"]),
    isInValid(obj) {
      return (
        this.selectedVideosGetter.length === 0 ||
        obj === null ||
        typeof obj !== "object" ||
        !("file" in obj)
      );
    },

    parseVal(obj, name = "") {
      if (this.isInValid(obj)) return "";
      if (name == "name") return obj.file.name;
      return "";
    },

    whatShow({ obj, name = "" }) {
      if (this.isInValid(obj)) return;
      const perc = obj.percentCompleted;
      if (name === "upload") return perc == null;
      if (name === "delete") return perc == null;
      if (name === "stop") return perc != null;
    },

    async slot_click({ obj, name = "" }) {
      this.$refs.menu.close();
      const hash = obj.hash;
      if (name == "upload") {
        let up = await this.upload({ hash });
        if (up && up.status === 1) return this.getVideoList();
        console.warn("Upload was winished with errors!");
        return;
      }
      if (name == "delete") {
        if (obj.source) obj.source.cancel(this.$t("Cancelled by user"));
        this.deleteFromSelectedVideos({ hash });
        return;
      }
      if (name == "stop") {
        obj.source.cancel(this.$t("Cancelled by user"));
        return;
      }
    },

    sendClass({ obj }) {
      if (this.isInValid(obj)) return;
      return !obj.sizeOK || !obj.typeOK ? "block text-muted" : "";
    },
    send_btn_tooltip({ obj }) {
      if (this.isInValid(obj)) return;
      return !obj.sizeOK || !obj.typeOK
        ? this.$t("You can't send this file")
        : this.$t("Upload the file", { filename: obj.file.name });
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
</style>
