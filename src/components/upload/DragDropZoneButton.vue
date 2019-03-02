<template> 
    <div class="Drag-Drop-Zone-Button">
      <label class="file-label" for="file">
        <i class="far fa-folder-open"></i>
        Browse</label>
      <input type="file" id="file" :accept="formats" @change="filesSelected" multiple>
    </div>
</template>

<script>
export default {
  name: "Drag-Drop-Zone-Button",
  methods: {
    filesSelected(event) {
      this.$store.dispatch("filesSelected", event);
    }
  },
  computed: {
    formats() {
      return this.$store.state.formats.replace(/(\w{1,99})/gim, ".$1");
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
#file {display: none; }
</style>
