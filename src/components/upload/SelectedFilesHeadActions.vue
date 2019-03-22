<template>
  <b-button-group>
    <b-dropdown
      text="Actions"
      v-if="!uploadAllInProgress && !isAllValidTransferingInManual__mixin"
    >
      <b-dropdown-item
        @click="removeAllCommit"
        v-b-tooltip.hover.left
        :title="removeAllTitle"
      >
        <i :class="removeAllIcon"></i>
        {{ removeAllText }}
      </b-dropdown-item>

      <b-dropdown-item
        v-if="removeSelectedShown"
        @click="removeSelectedAction"
        v-b-tooltip.hover.left
        :title="removeSelectedTitle"
      >
        <i :class="removeSelectedIcon"></i>
        {{ removeSelectedText }}
      </b-dropdown-item>

      <b-dropdown-divider />

      <b-dropdown-item
        v-if="sendSelectedShown"
        @click="sendSelectedAction"
        v-b-tooltip.hover.left
        :title="sendSelectedTitle"
      >
        <i :class="sendSelectedIcon"></i>
        {{ sendSelectedText }}
      </b-dropdown-item>

      <b-dropdown-item
        v-if="sendAllShown"
        @click="sendAllHandler"
        v-b-tooltip.hover.left
        :title="sendAllTitle"
      >
        <i :class="sendAllIcon"></i>
        {{ sendAllText }}
      </b-dropdown-item>
    </b-dropdown>

    <b-dropdown v-else text="Actions" else>
      <b-dropdown-item
        @click="stopAllHandler"
        v-b-tooltip.hover.left
        :title="stopAllTitle"
      >
        <i :class="stopAllIcon"></i>
        {{ stopAllText }}
      </b-dropdown-item>
    </b-dropdown>
  </b-button-group>
</template>

<script>
import { filters, selectedFilesCounts } from "@/mixins.js";

export default {
  name: "Selected-Files-Head",
  components: {},
  props: {},
  mixins: [filters, selectedFilesCounts],
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
