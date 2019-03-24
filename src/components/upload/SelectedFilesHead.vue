<template>
  <tr class="list-item table-active">
    <th scope="col">{{ $t("#") }}</th>
    <th scope="col">{{ $t("Preview") }}</th>
    <th scope="col">{{ $t("Name") }}</th>
    <th scope="col" v-if="selectedVideosGetter.length > 1">
      <SelectedFilesHeadInfo />
    </th>
    <th scope="col" v-else>{{ $t("Info") }}</th>
    <th scope="col">{{ $t("Comment") }}</th>
    <th scope="col"><SelectedFilesHeadActions /></th>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: { ...mapGetters(["selectedVideosGetter"]) }
};
</script>

<style lang="scss"></style>
