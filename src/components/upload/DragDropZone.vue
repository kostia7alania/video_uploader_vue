<template>
  <div>
    <form v-if="dragAndDropCapable" id="file-drag-drop" ref="fileform">
      <span class="drop-files">Drop your files in this area ...</span>
    </form>
    <DragDropZoneButton :formats="formats"/>
  </div>
</template>

<script>
import DragDropZoneButton from "./DragDropZoneButton";
export default {
  name: "Drag-Drop-Zone",
  props: {},
  components: {
    DragDropZoneButton
  },
  methods: {
    selectFilesHandler(event) {
      this.$store.dispatch("filesSelected", event);
      /*
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          let curfile = (window.curFile = e.dataTransfer.files[i]); 
          let aa = curfile.name.split(".");
          let fileType = "." + aa[aa.length - 1];  
            this.$store.commit("appendToArray", { prop: "selectedVideos", state:  file});
          
        }*/
    }
  },
  computed: {
    formats() {
      return this.$store.state.formats.replace(
        new RegExp(/(\w{1,99})/gim),
        ".$1"
      );
    },
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
    //через .stop.prevent реализовать потом: https://ru.vuejs.org/v2/api/index.html#v-on
    let prevent = e => {
      e.preventDefault();
      e.stopPropagation();
    };
    if (this.dragAndDropCapable) {
      "drag,dragstart,dragend,dragover,dragenter,dragleave,drop"
        .split(",")
        .forEach(evt =>
          this.$refs.fileform.addEventListener(evt, prevent, false)
        );
      this.$refs.fileform.addEventListener("drop", this.selectFilesHandler);
    }

    let drop = document.querySelector("#file-drag-drop");
    function highlight(e) {
      drop.classList.add("isActive");
    }
    function unhighlight(e) {
      drop.classList.remove("isActive");
    }
    let highlightEvents = ["dragenter", "dragover"];
    let unhighlightEvents = ["dragleave", "drop"];
    [...highlightEvents, ...highlightEvents].forEach(ev => {
      drop.addEventListener(ev, prevent, false);
    });
    highlightEvents.forEach(ev => {
      drop.addEventListener(ev, highlight, false);
    });
    unhighlightEvents.forEach(ev => {
      drop.addEventListener(ev, unhighlight, false);
    });
  }
};
</script>
 
<style scoped lang="scss">
form#file-drag-drop {
  display: block;
  height: 400px;
  width: 400px;
  background: #ccc;
  margin: auto;
  margin-top: 40px;
  text-align: center;
  line-height: 400px;
  border-radius: 4px;
}
#file-drag-drop {
  border: 2px dashed #999;
  border-radius: 10px;
  width: 400px;
  margin: 50px auto;
  padding: 20px;
}

#file-drag-drop.isActive {
  border-color: #74b9ff;
  width:100%; 
background: -webkit-radial-gradient(red, yellow, green); /* Safari 5.1-6.0 */
background: -o-radial-gradient(red, yellow, green); /* Opera 11.6-12.0 */
background: -moz-radial-gradient(red, yellow, green); /* Firefox 3.6-15 */
background: radial-gradient(red, yellow, green); /* Стандартный синтаксис */
background: -webkit-radial-gradient(60% 55%, farthest-side, red, yellow, black); /* Safari 5.1-6.0 */
background: -o-radial-gradient(60% 55%, farthest-side, red, yellow, black); /* Opera 11.6-12.0 */ 
background: -moz-radial-gradient(60% 55%, farthest-side, red, yellow, black); /* Firefox 3.6-15 */
background: radial-gradient(farthest-side at 60% 55%, red, yellow, black); /* Стандартный синтаксис */
}

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
