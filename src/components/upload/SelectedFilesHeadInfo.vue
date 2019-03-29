<template>
  <b-button-group>
    <b-dropdown :text="$t('Info')">
      <template v-for="(e, i) in dropDownInfo">
        <b-dropdown-divider
          v-if="
            i == 1 ||
              (i == 5 && e.show) ||
              (i == 6 && e.show && !dropDownInfo[i - 1].show)
          "
          :key="i + 'div'"
        />
        <b-dropdown-item
          :key="i"
          @click="sortBy(e.method)"
          :class="{ selected: e.method == selectedVideos_Sort }"
          v-if="(e.show && ['selected', 'comment'].includes(e.method)) ||
              !['selected', 'comment'].includes(e.method)"
          v-b-tooltip.hover.left :title="e.tooltip"
        >
          <font-awesome-icon  v-if="e.method == selectedVideos_Sort && i != 0" :icon="iconSortActive_vue_awesome"/><!--<i v-if="e.method == selectedVideos_Sort && i != 0" :class="iconSortActive"></i>-->
          <font-awesome-icon  v-if="e.method == selectedVideos_Sort && i == 0" :icon="['fas','sort']"/><!--<i v-if="e.method == selectedVideos_Sort && i == 0" class="fa fa-sort"></i>-->
          {{ e.text }}
        </b-dropdown-item>
      </template>
    </b-dropdown>
  </b-button-group>
</template>
<script>
import { mapMutations, mapState, mapGetters } from "vuex";
export default {
  name: "Selected-Files-Head-Info",
  data() {
    return {
      //iconDOWN: "fas fa-arrow-down",iconUP: "far fas fa-arrow-up"
      iconDOWN: ["fas","arrow-down"],
      iconUP: ["fas","arrow-up"]
      // type: 0, // <<<<<0 - desc<<<< ====== >>>>1 - asc>>>>
    };
  },
  methods: {
    ...mapMutations(["changeProp"]),
    sortBy(method) {
      if (this.selectedVideos_Sort === method)
        this.changeProp({
          prop: "selectedVideos_SortType",
          state: !this.selectedVideos_SortType
        });
      else this.changeProp({ prop: "selectedVideos_Sort", state: method });
    }
  },
  computed: {
    ...mapGetters(["selectedVideosGetter"]),
    ...mapState(["selectedVideos_Sort", "selectedVideos_SortType"]),
    iconSortActive_vue_awesome() {
       return this.selectedVideos_SortType ? this.iconDOWN : this.iconUP; 
    },
    //iconSortActive() { return this.selectedVideos_SortType ? this.iconDOWN : this.iconUP; },
    isAnySelected() {
      return (
        this.selectedVideosGetter.length > 1 &&
        this.selectedVideosGetter.filter(e => e.selected).length
      );
    },
    isAnyComment() {
      return (
        this.selectedVideosGetter.length > 1 &&
        this.selectedVideosGetter.filter(e => e.comment).length
      );
    },
    dropDownInfo() {
      return [
        {
          method: "",
          text: this.$t("Sort by added"),
          tooltip: this.$t("Sort the list by added")
        },
        {
          method: "name",
          text: this.$t("Sort by Name"),
          tooltip: this.$t("Sort the list by Name column")
        },
        {
          method: "size",
          text: this.$t("Sort by Size"),
          tooltip: this.$t("Sort the list by file sizes")
        },
        {
          method: "type",
          text: this.$t("Sort by Type"),
          tooltip: this.$t("Group the list by file formats")
        },
        {
          method: "lastModified",
          text: this.$t("Sort by Date"),
          tooltip: this.$t("Sort the list by Modified")
        },
        {
          method: "selected",
          text: this.$t("Sort by Selected"),
          tooltip: this.$t("Group the list by selected files"),
          show: this.isAnySelected
        },
        {
          method: "comment",
          text: this.$t("Sort by Comment"),
          tooltip: this.$t("Sort the list by Comment column"),
          show: this.isAnyComment
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
a.dropdown-item.selected {
  background: black;
  color: white;
  padding-left: 6px;
}
div.dropdown-divider {
  margin: 0.2rem 0;
  height: 2px;
  background: #c0c5ca;
}
</style>
