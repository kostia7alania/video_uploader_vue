<template>
  <b-progress v-if="progress.length" :max="max" show-value>
    <b-progress-bar
      v-for="prog in progress"
      :key="prog.i"
      show-progress
      :variant="prog.variant"
      :striped="prog.striped"
      :animated="prog.animated"
      :value="prog.percentCompleted"
      :label="`${prog.percentCompleted} %`"
    />
  </b-progress>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      max: 100
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["selectedVideosGetter"]),
    progress() {
      let a = [];
      this.selectedVideosGetter.forEach(e => {
        if (e.percentCompleted != null) {
          a.push({
            percentCompleted: e.percentCompleted,
            variant: e.variant,
            striped: e.striped,
            animated: e.animated
          });
        }
      });
      return a;
    }
  }
};
</script>
