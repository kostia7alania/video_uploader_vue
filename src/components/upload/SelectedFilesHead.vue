<template>
  <tr class="list-item table-active">
    <th scope="col">#</th>
    <th scope="col">Preview</th>
    <th scope="col">Name</th>
    <th scope="col" v-if="selectedVideos.length > 1">
      <SelectedFilesHeadInfo />
    </th>
    <th scope="col" v-else>Info</th>
    <th scope="col">Comment</th>
    <th scope="col"><SelectedFilesHeadActions /></th>
  </tr>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { filters, selectedFilesCounts } from "@/mixins.js";
import SelectedFilesHeadInfo from "./SelectedFilesHeadInfo";
import SelectedFilesHeadActions from "./SelectedFilesHeadActions";

export default {
  name: "Selected-Files-Head",
  components: { SelectedFilesHeadInfo, SelectedFilesHeadActions },
  props: {},
  mixins: [filters, selectedFilesCounts],
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {
    ...mapState(["selectedVideos"])
  }
};
</script>

<style lang="scss"></style>
