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
    obj: Object
  },
  data() {
    return {};
  },
  beforeMount() {
    this.changeSelectedVideos({
      hash: this.obj.hash,
      prop: "variant",
      val: this.variantGen()
    });
    this.changeSelectedVideos({
      hash: this.obj.hash,
      prop: "striped",
      val: !!this.randomInteger(0, 1)
    });
    this.changeSelectedVideos({
      hash: this.obj.hash,
      prop: "animated",
      val: !!this.randomInteger(0, 1)
    });
  },
  methods: {
    ...mapMutations(["changeSelectedVideos"]),
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
      return this.obj.variant;
    },
    striped() {
      return this.obj.striped;
    },
    animated() {
      return this.obj.animated;
    }
  }
};
</script>

<style scoped lang="scss"></style>
