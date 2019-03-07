<template>
  <div> 
      <button
        class="btn btn-danger progress_btn" 
        @click="removeAll"
        v-b-tooltip.hover
        title="Remove selected videos from the list">
        <i class="far fa-trash-alt"></i>
        {{removeAllText}} ({{all_count}})
      </button> 

      <button
        class="btn btn-danger progress_btn"
        v-if="all_selected_count"
        @click="removeSelectedAction"
        v-b-tooltip.hover
        title="Clear list">
        <i class="far fa-trash-alt"></i>
        {{removeSelectedText}} ({{all_selected_count}})
      </button>

      <button
        class="btn btn-primary progress_btn"
        v-if="all_valid_selected_count && all_selected_count"
        @click="sendSelectedAction">
        <i class="fas fa-upload"></i>
      {{sendSelectedText}} 
      </button>

      <button
        v-if="all_valid_count"
        class="btn btn-warning progress_btn"
        v-b-tooltip.hover
        :title="sendAllTitle"
        @click="sendAllHandler">
        <i class="fas fa-upload"></i>
        {{sendAllText}} 
      </button>
 
  </div>
</template>

<script>
import { filters, selectedFilesCounts} from "@/mixins.js";

export default {
  name: "Action-Btns",
  mixins: [filters, selectedFilesCounts],
  props: {},
  computed: { /*migrated to MIXINS! */}
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
