<template>
  <footer class="text-muted">
    <div class="container">
      <!--<p class="float-right"> <a href="#">Back to top</a> </p>-->
      <footer class="container-fluid w-100  py-3">
        Copyright <i class="far fa-copyright"></i>
        {{ new Date().getFullYear() }}
        <span
          v-b-tooltip.hover.topleft
          title="Information Coordination Center of State Port Control"
          >ICCSPC</span
        >
      </footer>
    </div>
  </footer>
</template>

<script>
export default {
  name: "my-footer",
  components: {},
  props: {}
};
</script>

<style scoped lang="scss">
span {
  cursor: pointer;
}
span:hover {
  color: black;
  font-weight: 550;
}
</style>
