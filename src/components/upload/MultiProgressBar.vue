<template>
  <b-progress v-if="progress.length" class="mt-2" :max="max" show-value>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      max: 100
    };
  },
  methods: {},
  computed: {
    ...mapState(["selectedVideos"]),
    progress() {
      let a = [];
      this.selectedVideos.forEach(e => {
        if (e.userData.percentCompleted != null) {
          a.push({
            percentCompleted: e.userData.percentCompleted,
            variant: e.userData.variant,
            striped: e.userData.striped,
            animated: e.userData.animated
          });
        }
      });
      return a;
    }
  }
};
</script>
