<template>
  <div class="SelectedFiles">
    <b-container fluid>
      <!--<SelectedFilesRows v-for="(obj, index) in selectedVideos":key="obj.hash":obj="obj":index="index"/>-->
      <!--<b-table
        striped
        small
        show-empty
        empty-text="Нет элементов для отображения"
        stacked="xl"
        hover
        selectable
        :items="items"
        :fields="fields"
         @row-selected="rowSelected"
         @row-clicked ="rowClick"
      >
        <template slot="Preview" slot-scope="data">
          <VideoPlayer v-if="data.value.type === 'video/mp4'" :file="data.value"/>
          <span v-else v-b-tooltip.hover title="The video preview is unavailable">
            <i class="fas fa-ban"/> N/A
          </span>
        </template>
        <template slot="Name" slot-scope="data"><b>{{data.value}}</b></template>
        <template slot="Info" slot-scope="data"><InfoCol :obj="data.value" :file="data.value.file"/></template>

        <template slot="Comment" slot-scope="data">
          <textarea type="text" :value="$store.state.selectedVideos[data.index].userData.comment" @input="comment($event, data.index,data)"></textarea>
        </template>

        <template slot="Actions" slot-scope="data"><ActionBtns :obj="data.value" /></template>

      </b-table>-->
      <SelectedFilesRow />
    </b-container>
  </div>
</template>

<script>
//import SelectedFilesRows from "./SelectedFilesRows";

import ActionBtns from "./ActionBtns";
import VideoPlayer from "./VideoPlayer";
import checkMixins from "@/mixins.js";

import { mapMutations } from "vuex";

import InfoCol from "./Info_col";
import SelectedFilesRow from "./SelectedFilesRow";
export default {
  name: "Selected-Videos",
  mixins: [checkMixins],
  props: { selectedVideos: Array },
  data() {
    return {
      selected_rows: []
    };
  },
  components: { ActionBtns, VideoPlayer, InfoCol, SelectedFilesRow },
  methods: {
    ...mapMutations(["toogleSelectRow", "changeUserData"]),
    rowClick(e) {
      let index = e.index;
      this.toogleSelectRow({ index });
    },
    rowSelected(arr_rows) {
      console.log(arr_rows);
      this.selected_rows = arr_rows;
      //this.selected_rows[hash] = true;
    },

    comment(ev, index) {
      //this.$store.state.selectedVideos[index].userData.comment = ev.target.value
      // this.$forceUpdate();
      this.changeUserData({
        prop: "comment",
        index,
        val: ev.target.value
      });
    }
  },
  computed: {
    fields: () => [
      { key: "index", label: "#", formatter: e => e + 1 },
      "Preview",
      "Name",
      "Info",
      "Comment",
      "Actions"
    ],
    items() {
      return this.selectedVideos.map((el, i) => {
        let e = el.fileData;
        console.log(e.file.name, e);
        return {
          index: i,
          Preview: e.file,
          Name: e.file.name,
          Info: { ...e, file: e.file, index: i },
          Comment: "",
          Actions: { ...e, file: e.file, index: i },
          _rowVariant:
            this.selectedVideos[i].userData.class === "alert alert-danger"
              ? "danger"
              : ""
        };
      });
    }
  }
};
</script>

<style lang="scss">
.table-headers {
  font-weight: bold;
  margin: 10px 0 30px 0;
}

.list-item2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & > div {
    flex: auto;
    &:nth-child(1) {
      flex: 1;
    }
    &:nth-child(2) {
      flex: 3;
    }
    &:nth-child(3) {
      flex: 1;
    }
    &:nth-child(4) {
      flex: 2;
    }
    &:nth-child(5) {
      flex: 2;
    }
    &:nth-child(6) {
      flex: 1;
    }
  }
}
</style>
