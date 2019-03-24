<template>
  <tr
    @contextmenu.prevent="$emit('contextmenu', $event)"
    @click="toogleSelectRow({ hash })"
    v-b-tooltip.hover
    :title="rowTooltipText"
    class="list-item"
    :class="rowClass"
  >
    <td cols="1">{{ index + 1 }}</td>
    <td @contextmenu.stop cols="2" class="text-center width200">
      <VideoPlayer
        :isAvailabled="obj.file.type === 'video/mp4'"
        :file="obj.file"
        :duration="obj.duration"
      />
    </td>
    <td cols="3">
      <b :class="{ 'non-valid': nonValid }">
        <i v-if="nonValid" class="fas fa-ban"></i>
        <i v-if="isAlreadyUploaded" class="fas fa-exclamation-triangle"></i>
        {{ obj.file.name }}</b
      >
    </td>
    <td cols="3" class="info-column">
      <InfoCol :obj="obj" :file="obj.file" :duration="obj.duration" />
    </td>
    <td cols="2">
      <rowTextArea :comment="obj.comment" :hash="hash" />
    </td>
    <td cols="1">
      <ActionBtns @click.stop :obj="obj" />
    </td>
  </tr>
</template>

<script>
import ActionBtns from "./ActionBtns";
import VideoPlayer from "./VideoPlayer";
import checkMixins from "@/mixins.js";
import rowTextArea from "./rowTextArea";
import InfoCol from "@/components/Common/Info_col";

import { mapMutations, mapState } from "vuex";

export default {
  name: "Selected-Videos-Row",
  mixins: [checkMixins],
  components: { ActionBtns, VideoPlayer, InfoCol, rowTextArea },
  props: {
    selectedVideos: Array,
    obj: Object,
    index: Number,
    hash: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hightlight_class: "" // 4 pulse => bg-warning
    };
  },
  methods: {
    ...mapMutations(["toogleSelectRow"]),
    pulseHandler() {
      //описание анимации ПРИ попытке повторного добавления одного и того же файла;
      [
        { time: 0, class: "bg-danger" },
        { time: 500, class: "" },
        { time: 1000, class: "bg-warning" },
        { time: 1500, class: "" },
        { time: 2000, class: "bg-warning" },
        { time: 2500, class: "" },
        { time: 3000, class: "bg-warning" },
        { time: 3500, class: "" },
        { time: 4000, class: "bg-warning" },
        { time: 4500, class: "" }
      ].forEach(e =>
        setTimeout(() => (this.hightlight_class = e.class), e.time)
      ); //bg-warning
    }
  },
  beforeDestroy() {
    this.$emit("beforeDestroy");
  },
  watch: {
    pulse(neww, old) {
      console.log("pulse [neww] ->", neww, "; [old]=>", old);
      if (neww === "pulse") this.pulseHandler();
    }
  },
  computed: {
    ...mapState(["maxSize", "alreadyUploaded", "selectedActiveContextRowHash"]),
    nonValid() {
      return !this.obj.sizeOK || !this.obj.typeOK;
    },
    rowTooltipText() {
      let res = "";
      if (this.isAlreadyUploaded) res = this.$t("already uploaded");
      const fd = this.obj;
      if (!fd.sizeOK)
        res += `${res ? " and m" : " M"}ax size (<${this.maxSize /
          1000 /
          1000 /
          1000} GB) exceeded`;
      if (!fd.typeOK) res += `${res ? " and f" : " F"}ormat not supported`;
      return res;
    },

    isAlreadyUploaded() {
      let upds = this.alreadyUploaded;
      for (let index in upds) {
        if (upds[index].Hash === this.obj.hash) return true;
      }
      return false;
    },

    pulse() {
      return this.obj.class;
    },

    rowClass() {
      let cls = "";
      if (this.obj.hash == this.selectedActiveContextRowHash)
        cls += " row--context-active ";

      if (this.obj.selected) cls = " selected_row ";
      cls += this.hightlight_class;
      if (this.rowTooltipText && this.nonValid) cls += " rowWithErrors";
      return cls;
    }
  }
};
</script>

<style lang="scss"></style>
