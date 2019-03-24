<i18n>
 {"/*в глобалку мигрировали*/":""}
</i18n>

<template>
  <tr class="list-item table-active">
    <th width="22">{{ $t("#") }}</th>
    <th scope="col">{{ $t("Preview") }}</th>
    <th class="pointer" @click="sortHandler('Status')" scope="col">
      <i class="fas fa-sort"></i> {{ $t("Status") }}
    </th>
    <th
      class="pointer"
      @click="sortHandler('Date')"
      scope="col"
      v-b-tooltip.hover
      :title="$t('Date of uploading')"
    >
      <i class="fas fa-sort"></i> {{ $t("Date") }}
    </th>
    <th scope="col">{{ $t("Info") }}</th>
    <th class="pointer width200" @click="sortHandler('Comments')" scope="col">
      <i class="fas fa-sort"></i>
      {{ $t("Comments") }}
    </th>
  </tr>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Uploaded-Videos-Head",
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
