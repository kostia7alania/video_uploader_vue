<template>
  <div>
    <button
      v-if="stopAllShown"
      v-b-tooltip.hover
      :title="stopAllTitle"
      @click="stopAll_Mixin"
      :class="stopAllClass"
    >
      <font-awesome-icon :icon="stopAllIcon_vue_awesome" />
      <!--<i :class="stopAllIcon"></i>-->
      {{ stopAllText }}
    </button>

    <button
      v-if="removeAllShown"
      v-b-tooltip.hover.left
      :title="removeAllTitle"
      @click="removeAllAction"
      :class="removeAllClass"
    >
      <font-awesome-icon
        :icon="removeAllIcon_vue_awesome"
      /><!--<i :class="removeAllIcon"></i>-->
      {{ removeAllText }}
    </button>

    <button
      v-if="removeSelectedShown"
      v-b-tooltip.hover
      :title="removeSelectedTitle"
      @click="removeSelectedAction"
      :class="removeSelectedClass"
    >
      <font-awesome-icon
        :icon="removeSelectedIcon_vue_awesome"
      /><!--<i :class="removeSelectedIcon"></i>-->
      {{ removeSelectedText }}
    </button>

    <button
      v-if="sendSelectedShown"
      v-b-tooltip.hover
      :title="sendSelectedTitle"
      @click="sendSelectedAction"
      :class="sendSelectedClass"
    >
      <font-awesome-icon
        :icon="sendSelectedIcon_vue_awesome"
      /><!--<i :class="sendSelectedIcon"></i>-->
      {{ sendSelectedText }}
    </button>

    <button
      v-if="sendAllShown"
      v-b-tooltip.hover
      :title="sendAllTitle"
      @click="sendAll_Mixin"
      :class="sendAllClass"
    >
      <font-awesome-icon
        :icon="sendAllIcon_vue_awesome"
      /><!--<i :class="sendAllIcon"></i>-->
      {{ sendAllText }}
    </button>
  </div>
</template>

<script>
import {
  filters,
  selectedFilesCounts,
  selectedFilesMethods
} from "@/mixins.js";
export default {
  name: "Action-Btns",
  mixins: [filters, selectedFilesCounts, selectedFilesMethods]
};
</script>

<style scoped lang="scss">
.block {
  cursor: not-allowed;
  color: gray;
  &:hover {
    background: gray;
    color: black;
  }
}

button {
  transition: 0.5s;
  margin: 3px;
  padding: 2px 6px 2px 6px;
  &:hover {
    background: orangered;
    transform: scale(1.1);
    color: white;
  }
}
</style>
