<template>
  <div class="Drag-Drop-Zone-Button">
    <label class="file-label" for="file">
      <i class="far fa-folder-open"></i>
      Browse</label
    >
    <input
      type="file"
      id="file"
      :accept="accept_formats"
      @change="sel($event)"
      multiple
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Drag-Drop-Zone-Button",
  methods: {
    async sel(event) {
     let a =  await this.filesSelected(event);
     console.log('a',a)
      event.target.value = "";
    },
    ...mapActions(["filesSelected"])
  },
  computed: {
    ...mapState(["formats"]),
    accept_formats() {
      return this.formats.replace(/(\w{1,99})/gim, ".$1");
    }
  }
};
</script>

<style scoped lang="scss">
.file-label {
  display: inline-block;
  padding: 10px 15px;
  border: 1px solid #74b9ff;
  color: #74b9ff;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
}
.file-label:hover {
  color: #fff;
  background-color: #74b9ff;
}
#file {
  display: none;
}
</style>
