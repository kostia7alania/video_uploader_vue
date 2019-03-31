<i18n>
{
  "en": {
    "Size":"Size",
    "Type":"Type",
    "Modified":"Modified",
    "Duration":"Duration"
  },
  "ru": {
    "Size":"Размер",
    "Type":"Тип",
    "Modified":"Изменен",
    "Duration":"Длительность"
  }
}
</i18n>

<template>
  <b-col class="info-column">
    <div
      :class="'type ' + sizeCheck(file.size)"
      v-b-tooltip.hover
      :title="sizeTitle"
    >
      <b>{{ $t("Size") }}:</b>
      {{ sizeMethod(file.size) }}
    </div>
    <div
      :class="'type ' + typeCheck(file.type)"
      v-b-tooltip.hover
      :title="typeTitle"
    >
      <b>{{ $t("Type") }}:</b>
      {{ file.type | typeFilter }}
    </div>
    <div>
      <b>{{ $t("Modified") }}:</b>
      {{ file.lastModifiedDate || file.lastModified | dateFilter }}
      <br v-if="!inRow" />
      <span v-else> - </span>
      {{ file.lastModifiedDate || file.lastModified | dateFilterTime }}
    </div>
    <div>
      <b v-if="duration">{{ $t("Duration") }}:</b>
      {{ duration_comp(duration) }}
    </div>
  </b-col>
</template>

<script>
import checkMixins from "@/mixins.js";
import { filters, duration_comp_mixin } from "@/mixins.js";

export default {
  name: "Info-Column",
  mixins: [checkMixins, filters, duration_comp_mixin],
  props: {
    inRow: {
      type: null,
      default: () => false
    },
    duration: null,
    obj: { type: Object }, //default: () => { return { fileData: '' } }
    file: [File, Object],
    skipVerify: {
      type: null,
      default: () => false
    }
  },
  computed: {
    sizeTitle() {
      return this.skipVerify
        ? ""
        : this.obj.sizeOK
        ? this.$t("Size-is-OK")
        : this.$t("Max size exceeded", { maxSize: this.$store.state.maxSize / 1000 / 1000 / 1000 });
    },
    typeTitle() {
      return this.skipVerify
        ? ""
        : this.obj.typeOK
        ? this.$t("Type is OK")
        : this.$t("Format not supported");
    }
  },
  filters: {
    dateFilter: e => new Date(e).toLocaleDateString(),
    dateFilterTime: e => new Date(e).toLocaleTimeString(),
    typeFilter: e => (e ? `${e.split("/")[1]} (${e.split("/")[0]})` : "N/A")
  }
};
</script>

<style lang="scss" scoped>
.size-success {
  /*color: green*/
}
.size-error {
  color: red;
}
.type-success {
  /*color: green;*/
}
.type-error {
  color: red;
}

.info-column p {
  margin: 0px;
}
</style>
