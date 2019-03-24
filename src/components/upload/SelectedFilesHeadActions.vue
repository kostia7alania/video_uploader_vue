<template>
  <b-button-group>
    <b-dropdown :text="$t('Actions')">
      <b-dropdown-item
        v-show="stopAllShown"
        @click="stopAll_Mixin"
        v-b-tooltip.hover.left
        :title="stopAllTitle"
      >
        <i :class="stopAllIcon"></i>
        {{ stopAllText }}
      </b-dropdown-item>

      <b-dropdown-item
        v-if="removeAllShown"
        @click="removeAllAction"
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
        @click="sendAll_Mixin"
        v-b-tooltip.hover.left
        :title="sendAllTitle"
      >
        <i :class="sendAllIcon"></i>
        {{ sendAllText }}
      </b-dropdown-item>
    </b-dropdown>
  </b-button-group>
</template>

<script>
import {
  filters,
  selectedFilesCounts,
  selectedFilesMethods
} from "@/mixins.js";

export default {
  name: "Selected-Files-Head",
  props: {},
  mixins: [filters, selectedFilesCounts, selectedFilesMethods],
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
