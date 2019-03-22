<template>
  <b-progress :max="100">
    <b-progress-bar
      show-progress
      :variant="variant"
      :striped="striped"
      :animated="animated"
      :value="percent"
      :label="`${percent} %`"
    />
  </b-progress>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Progress-Bar",
  props: {
    percent: { type: Number, default: () => 0 },
    fileUserIndexData: Object
  },
  data() {
    return {};
  },
  beforeMount() {
    this.changeUserData({
      index: this.fileUserIndexData.index,
      prop: "variant",
      val: this.variantGen()
    });

    this.changeUserData({
      index: this.fileUserIndexData.index,
      prop: "striped",
      val: !!this.randomInteger(0, 1)
    });

    this.changeUserData({
      index: this.fileUserIndexData.index,
      prop: "animated",
      val: !!this.randomInteger(0, 1)
    });
  },
  methods: {
    ...mapMutations(["changeUserData"]),
    randomInteger(min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },
    variantGen() {
      const variants = [
        "success",
        "info",
        "warning",
        "danger",
        "primary",
        "secondary",
        "dark"
      ];
      return variants[this.randomInteger(0, variants.length - 1)];
    }
  },
  computed: {
    ...mapState(["selectedVideos"]),
    variant() {
      return this.selectedVideos[this.fileUserIndexData.index].userData.variant;
    },
    striped() {
      return this.selectedVideos[this.fileUserIndexData.index].userData.striped;
    },
    animated() {
      return this.selectedVideos[this.fileUserIndexData.index].userData
        .animated;
    }
  }
};
</script>

<style scoped lang="scss"></style>
