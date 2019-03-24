<template>
  <b-row :class="obj.class + ' list-item'">
    <b-col cols="1">{{ index + 1 }}</b-col>

    <b-col>
      <VideoPlayer v-if="file.type === 'video/mp4'" :file="file" />
      <span v-else v-b-tooltip.hover title="The video preview is unavailable">
        <i class="fas fa-ban" /> N/A
      </span>
    </b-col>

    <b-col>
      <b>{{ file.name }}</b>
    </b-col>

    <b-col>
      <textarea type="text" @input="comment($event, index)"></textarea>
    </b-col>
    <b-col cols="1">
      <ActionBtns
        :typeCheck="typeCheck(file.type) === 'type-success'"
        :sizeCheck="sizeCheck(file.size) === 'size-success'"
        :index="index"
        :file="file"
      />
    </b-col>
  </b-row>
</template>

<script>
import ActionBtns from "./ActionBtns";
import VideoPlayer from "./VideoPlayer";

export default {
  name: "Selected-Videos-Rows",
  props: { obj: Object, index: null },
  components: { ActionBtns, VideoPlayer },
  methods: {
    comment(ev, index) {
      let val = ev.target.value;
      this.$store.commit("changeUserData", {
        obj: "selectedVideos",
        prop: "comment",
        index: index,
        val: val
      });
      console.log("comment=> ", arguments);
    },
    sizeCheck(e) {
      return this.maxSize > e ? "size-success" : "size-error";
    },
    typeCheck: e =>
      e && e.split("/")[0] == "video" ? "type-success" : "type-error"
  },
  filters: {
    dateFilter: e => new Date(e).toLocaleDateString(),
    typeFilter: e => (e ? `${e.split("/")[1]} (${e.split("/")[0]})` : "N/A")
  },
  computed: {
    file() {
      return this.obj.file;
    },
    maxSize() {
      return this.$store.state.maxSize;
    }
  }
};
</script>

<style scoped lang="scss">
.list-item {
  transition: all 0.5s;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
  display: flex;
  right: 0px;
  left: 0px;
}
.list-enter {
  transform: translateY(-60px);
}
.list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
/*.list-transitionend {  background: red}*/
/*.list-move {transition: transform 1s; }*/
</style>
