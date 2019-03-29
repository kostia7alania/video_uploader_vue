<i18n>
{
  "en": {
    "In queue":"In queue",
    "Converting":"Converting..",
    "Converted":"Converted!",
    "Error":"Error",
    "N/A":"N/A",
    "The video queued for conversion":"The video queued for conversion",
    "Converting the file":"Converting the file"
  },
  "ru": {
    "In queue":"В очереди",
    "Converting":"Конвертация..",
    "Converted":"Сконвертировано",
    "Error":"Ошибка",
    "N/A":"Н/И",

    "The video queued for conversion":"Данное видео поставлено в очередь на конвертацию",
    "Converting the file":"В данный момент происходит конвертация видео в общий формат (mp4)"
  }
}
</i18n>

<template>
  <div class="video-status">
    <span :class="spanClass" v-b-tooltip.hover.left :title="toolTip">
      <!--<i :class="iconComp" />-->
      <font-awesome-icon :icon="iconComp_vue_awesome.obj" :style="iconComp_vue_awesome.style" :spin="iconComp_vue_awesome.spin"/>
       <span class="status-text">{{ text }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "video-status",
  props: {
    status: [Number, String]
  },
  computed: {
    spanClass() {
      let e = this.status;
      if (e == 0) return "inWait";
      if (e == 1) return "inProgress";
      if (e == 2) return "";
      if (e == 3) return "inBlock";
      return "inHelp ";
    },
    iconComp_vue_awesome(){
      let e = this.status;
      if (e == 0) return {obj:["fas","tasks"],style:"",spin:false};
      if (e == 1) return {obj:["fas","spinner"],style:"",spin:true};
      if (e == 2) return  {obj:["fas","flag-checkered"],style:"color:green",spin:false};
      if (e == 3) return {obj:["fas","exclamation-triangle"],style:"",spin:false};
      return {obj:["fas","exclamation"],style:"",spin:false};
    },
  /* iconComp() {
      let e = this.status;
      if (e == 0) return "fas fa-tasks";
      if (e == 1) return "fas fa-spinner fa-spin ";
      if (e == 2) return "fas fa-flag-checkered green";
      if (e == 3) return "fas fa-exclamation-triangle";
      return "fas fa-exclamation";
    },*/
    text() {
      let e = this.status;
      return e == 0
        ? this.$t("In queue")
        : e == 1
        ? this.$t("Converting")
        : e == 2
        ? this.$t("Converted")
        : e == 3
        ? this.$t("Error")
        : this.$t("N/A");
    },
    toolTip() {
      let e = this.status;
      return e == 0
        ? `[0] - ${this.$t("The video queued for conversion")}`
        : e == 1
        ? `[1] - ${this.$t("Converting the file")}`
        : e == 2
        ? `[2] - ${this.$t("Converted")}`
        : e == 3
        ? `[3] - ${this.$t("Error")}`
        : this.$t("N/A");
    }
  }
};
</script>

<style lang="scss" scoped>

.video-status {
  span:hover {
    color: red;
  }
}
i {
  padding-right: 2px;
  font-size: 20px;
  transition: 1s;
  &:hover {
    transform: scale(1.1);
  }
}
.inProgress {
  cursor: progress;
}
.inWait {
  cursor: wait;
}
.inHelp {
  cursor: help;
}
.inBlock {
  cursor: not-allowed;
}
.status-text {
  display: inline-block;
  min-width: 5em;
  margin-left: .5em;
}
</style>
