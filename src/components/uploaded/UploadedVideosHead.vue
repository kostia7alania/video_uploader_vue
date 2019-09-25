<i18n>
 {"/*в глобалку мигрировали*/":""}
</i18n>

<template>
  <tr class="list-item table-active">
    <th class="nopointer" width="22">{{ $t("#") }}</th>
    <th class="nopointer" scope="col">{{ $t("Preview") }}</th>
    <th class="pointer" @click="sortHandler('Status')" scope="col">
      <font-awesome-icon
        :icon="['fas', 'sort']"
      /><!--<i class="fas fa-sort"></i>-->
      {{ $t("Status") }}
    </th>
    <th
      class="pointer"
      @click="sortHandler('Date')"
      scope="col"
      v-b-tooltip.hover
      :title="$t('Date of uploading')"
    >
      <font-awesome-icon :icon="['fas', 'sort']" />
      <!--<i class="fas fa-sort"></i>-->
      {{ $t("Date") }}
    </th>
    <th class="nopointer" scope="col">{{ $t("Info") }}</th>
    <th class="pointer width300" @click="sortHandler('Comments')" scope="col">
      <font-awesome-icon :icon="['fas', 'sort']" />
      <!--<i class="fas fa-sort"></i>-->
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

<style lang="scss" scope>
.width300 {
  min-width: 146px;
  max-width: 333px;
}
.pointer {
  transition: 0.5s;
  &:active {
    transform: scale(0.9);
    color: gray;
  }
}
</style>
