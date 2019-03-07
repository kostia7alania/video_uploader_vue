<template>
  <b-container fluid class="table-responsive">
    <table class="table table-Default">
      <thead><SelectedFilesHead/></thead>
      <tbody>
        <SelectedFilesRow
          v-for="(obj, index) in selectedVideos"
          :obj="obj"
          :index="index"
          :key="obj.fileData.hash"
        />
      </tbody>
      <tfoot><SelectedFilesHead/></tfoot>
    </table>
  </b-container>
</template>

<script>
import SelectedFilesHead from './SelectedFilesHead';
import SelectedFilesRow from "./SelectedFilesRow";

export default {
  name: "Selected-Videos",
  props: { selectedVideos: Array },
  components: { SelectedFilesRow, SelectedFilesHead },
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
 
<style lang="scss">
/*
.table-headers {
  font-weight: bold;
  margin: 10px 0 30px 0;
}

.list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & > div {
    flex: auto;
    &:nth-child(1) { flex: 1; }
    &:nth-child(2) { flex: 3; }
    &:nth-child(3) { flex: 1; }
    &:nth-child(4) { flex: 2; }
    &:nth-child(5) { flex: 2; }
    &:nth-child(6) { flex: 1; }
  }
}

.list-item:nth-child(even){ background:#ffa; }
.list-item:nth-child(odd){ background:#ddd; }

.selected_row {
  background: rgba(17, 70, 247, 0.486) !important;
    &:hover {
    background: rgba(17, 70, 247, 0.386) !important;
  }
}
.list-item {
  padding: 5px 0 5px 0;
  cursor:pointer;
  transition: .1s;
  &:hover {
    background: rgba(119, 19, 19, 0.055)
  }
} */
</style>
