<template>
  <div class="Progress-Bar">
    <b-progress :max=100>
      <b-progress-bar :value="percent" :label="`${percent} %`"/>
    </b-progress>
  </div>
</template>

<script>
export default {
  name: "Progress-Bar",
  props: { percent: { type: Number, default: () => 0 } },
  data() {
    return {};
  },
  computed: {}
};
</script>
 
<style scoped lang="scss">
</style>
