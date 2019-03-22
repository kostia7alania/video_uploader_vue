<template>
  <b-button-group>
    <b-dropdown text="Info">
      <template v-for="(e, i) in dropDownInfo">
        <b-dropdown-divider v-if="i == 1 || i == 4" :key="i + 'div'" />
        <b-dropdown-item
          :key="i"
          @click="sortBy(e.method)"
          v-b-tooltip.hover.left
          :title="e.tooltip"
        >
          <i v-if="e.method == activeMethod" :class="iconSortActive"></i>
          {{ e.text }}
        </b-dropdown-item>
      </template>
    </b-dropdown>
  </b-button-group>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Selected-Files-Head-Info",
  data() {
    return {
      iconDOWN: "fas fa-arrow-down",
      iconUP: "far fas fa-arrow-up",
      activeMethod: null,
      type: 0, // <<<<<0 - desc<<<< ====== >>>>1 - asc>>>>
      dropDownInfo: [
        {
          method: "name",
          text: "Sort by Name",
          tooltip: "Sort the list by Name column"
        },
        {
          method: "size",
          text: "Sort by Size",
          tooltip: "Sort the list by file sizes"
        },
        {
          method: "type",
          text: "Sort by Type",
          tooltip: "Group the list by file formats"
        },
        {
          method: "lastModified",
          text: "Sort by Date",
          tooltip: "Sort the list by Modified "
        },
        {
          method: "selected",
          text: "Sort by Selected",
          tooltip: "Group the list by selected files "
        },
        {
          method: "comment",
          text: "Sort by Comment",
          tooltip: "Sort the list by Comment column "
        }
      ]
    };
  },
  watch: {
    selectedVideos() {
      console.log("WATCH !selectedVideos");
    }
  },
  methods: {
    ...mapMutations(["sortMutation"]),
    sortBy(method) {
      if (this.activeMethod === method) this.type = !this.type;
      else this.activeMethod = method;
      this.sortMutation({ key: method, type: this.type });
      console.log("sortBy=>", this.activeMethod, "type=>", this.type);
    }
  },
  computed: {
    ...mapState(["selectedVideos"]),
    iconSortActive() {
      return this.type ? this.iconDOWN : this.iconUP;
    }
  }
};
</script>

<style lang="scss" scoped>
.selected-row {
}
</style>
