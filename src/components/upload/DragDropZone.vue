<template>
  <div class="Drag-Drop-Zone">
    <form
      v-if="dragAndDropCapable"
      id="file-drag-drop"
      :class="{ dropped }"
      @dragleave.stop.prevent="dragEvent(0)"
      @drop.stop.prevent="dragEvent(0, $event)"
      @dragover.stop.prevent="dragEvent(1)"
      @dragenter.stop.prevent="dragEvent(1)"
    >
      <template v-if="!dropped">
        {{ $t("drop") }}
      </template>
      <template v-else>
        {{ $t("release") }}
      </template>
    </form>
    <DragDropZoneButton />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DragDropZoneButton from "./DragDropZoneButton";
export default {
  name: "Drag-Drop-Zone",
  data() {
    return { dropped: false };
  },
  components: { DragDropZoneButton },
  watch: {},
  methods: {
    ...mapActions(["filesSelected"]),
    dragEvent(e, dropEvent) {
      if (dropEvent) this.filesSelected(dropEvent); //send files to Vuex action
      this.dropped = e ? true : false;
    }
  },
  computed: {
    dragAndDropCapable() {
      /* https://serversideup.net/drag-and-drop-file-uploads-with-vuejs-and-axios/ */
      let div = document.createElement("div");
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    }
  },
  mounted() {
    let prevent = e => {
      e.preventDefault();
      e.stopPropagation();
    };
    if (this.dragAndDropCapable) {
      "drag,dragstart,dragend,dragover,dragenter,dragleave,drop"
        .split(",")
        .forEach(evt => window.addEventListener(evt, prevent, false));
      //window.addEventListener("drop", this.selectFilesHandler);
    }
    //через VUE-фичи .stop.prevent реализовал потом: https://ru.vuejs.org/v2/api/index.html#v-on
    /*
    let drop = document.querySelector("#file-drag-drop");
    let  highlight  = () => drop.classList.add("isActive")
    let unhighlight = () => drop.classList.remove("isActive") 
    let unhighlightEvents = ["dragleave", "drop"];
    let highlightEvents = ["dragenter", "dragover"];
    [...unhighlightEvents, ...highlightEvents].forEach(ev =>drop.addEventListener(ev, prevent, false) );//+-
    highlightEvents.forEach(ev => drop.addEventListener(ev, highlight, false) );
    unhighlightEvents.forEach(ev => drop.addEventListener(ev, unhighlight, false) );
    */
  }
};
</script>

<style scoped lang="scss">
#file-drag-drop:not(.dropped) {
  background: #ccc;
  width: 400px;
}
#file-drag-drop {
  display: block;
  height: 400px;
  margin: 50px auto;
  margin-top: 40px;
  text-align: center;
  line-height: 400px;
  border-radius: 1px;
  padding: 20px;
  border: 2px dashed #999;
}
.dropped {
  border-color: #74b9ff;
  width: 100% !important;
  background: -webkit-radial-gradient(red, yellow, green); /* Safari 5.1-6.0 */
  background: -o-radial-gradient(red, yellow, green); /* Opera 11.6-12.0 */
  background: -moz-radial-gradient(red, yellow, green); /* Firefox 3.6-15 */
  background: radial-gradient(red, yellow, green); /* Стандартный синтаксис */
  background: -webkit-radial-gradient(
    60% 55%,
    farthest-side,
    red,
    yellow,
    black
  ); /* Safari 5.1-6.0 */
  background: -o-radial-gradient(
    60% 55%,
    farthest-side,
    red,
    yellow,
    black
  ); /* Opera 11.6-12.0 */
  background: -moz-radial-gradient(
    60% 55%,
    farthest-side,
    red,
    yellow,
    black
  ); /* Firefox 3.6-15 */
  background: radial-gradient(
    farthest-side at 60% 55%,
    red,
    yellow,
    black
  ); /* Стандартный синтаксис */
}

#file-drag-drop {
  animation: yourAnimation 2s;
}

@keyframes yourAnimation {
  0% {
    transform-origin: 50% 50%;
  }
  10% {
    transform: rotate(0);
    transform-origin: 20% 30%;
    background: black;
    opacity: 1;
  }
  18% {
    transform-origin: 20% 30%;
  }
  31% {
    transform: rotate(0);
    transform-origin: 20% 30%;
    background: white;
    opacity: 0.6;
    color: black;
  }
  45% {
    transform: rotate(0);
    transform-origin: 20% 30%;
    background: black;
    opacity: 0.5;
  }
  61% {
    transform: rotate(0);
    transform-origin: 20% 30%;
    background: red;
  }
  73% {
    transform: rotate(0);
    transform-origin: 20% 30%;
    background: black;
    opacity: 0.6;
    color: white;
  }
  78% {
    transform: rotate(0);
    transform-origin: 20% 30%;
    background: black;
    opacity: 0.5;
  }
  98% {
    transform: rotate(0);
    transform-origin: 20% 30%;
    background: gray;
    color: black;
    opacity: 1;
  }
}

.elementToAnimate {
  animation: yourAnimation 3s infinite 0s linear;
}
</style>
