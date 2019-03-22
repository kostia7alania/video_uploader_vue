<template>
  <div class="status">
    <span :class="spanClass" v-b-tooltip.hover.left :title="toolTip">
      <i :class="iconComp" /> {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  name: "status",
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
    iconComp() {
      let e = this.status;
      if (e == 0) return "fas fa-tasks";
      if (e == 1) return "fas fa-spinner fa-spin ";
      if (e == 2) return "fas fa-flag-checkered green";
      if (e == 3) return "fas fa-exclamation-triangle";
      return "fas fa-exclamation";
    },
    text() {
      let e = this.status;
      return e == 0
        ? "In queue"
        : e == 1
        ? "Converting..."
        : e == 2
        ? "Converted!"
        : e == 3
        ? "Error"
        : "N/A";
    },
    toolTip() {
      let e = this.status;
      return e == 0
        ? "[0] - The video queued for conversion"
        : e == 1
        ? "[1] - Converting the file..."
        : e == 2
        ? "[2] - Converted!"
        : e == 3
        ? "[3] - Error"
        : "N/A";
    }
  }
};
</script>

<style lang="scss" scoped>
.status {
  span:hover {
    color: red;
  }
}
i {
  transform: scale(1.3);
  transition: 1s;
  &:hover {
    transform: scale(1.6);
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
</style>
