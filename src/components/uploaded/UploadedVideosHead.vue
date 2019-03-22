<template>
  <tr class="list-item table-active">
    <th width="22">#</th>
    <th scope="col">Preview</th>
    <th class="pointer" @click="sortHandler('Status')" scope="col">
      <i class="fas fa-sort"></i> Status
    </th>
    <th
      class="pointer"
      @click="sortHandler('Date')"
      scope="col"
      v-b-tooltip.hover
      title="Date of unloading "
    >
      <i class="fas fa-sort"></i> Date
    </th>
    <th scope="col">Info</th>
    <th class="pointer" @click="sortHandler('Comments')" scope="col">
      <i class="fas fa-sort"></i> Comments
    </th>
  </tr>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Uploaded-Videos-Head",
  components: {},
  props: {},
  mixins: [],
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["changeProp"]),
    sortHandler(prop) {
      if (this.uploadedListSort == prop) {
        this.changeProp({
          prop: "uploadedListSortType",
          state: !this.uploadedListSortType
        });
      } else {
        this.changeProp({ prop: "uploadedListSort", state: prop });
      }
    }
  },
  watch: {},
  computed: {
    ...mapState(["uploadedListSortType", "uploadedListSort"])
  }
};
</script>

<style lang="scss"></style>
