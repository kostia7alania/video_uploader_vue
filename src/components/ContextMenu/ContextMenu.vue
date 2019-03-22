<template>
  <div
    class="context-menu"
    ref="popper"
    v-show="isVisible"
    tabindex="-1"
    v-click-outside="close"
    @contextmenu.capture.prevent
  >
    <ul>
      <slot :contextData="contextData" />
    </ul>
  </div>
</template>

<script>
import Popper from "popper.js";
import ClickOutside from "vue-click-outside"; 

import { mapMutations, mapState } from 'vuex'
export default {
  name: "Context-Menu",
  props: {
    boundariesElement: {
      type: String,
      default: "body"
    }
  },
  components: {
    Popper
  },
  data() {
    return {
      opened: false,
      contextData: {}, 
    };
  },
  directives: {
    ClickOutside
  },
  computed: {
    ...mapState([
      'selectedActiveContextRowHash'
    ]),
    isVisible() {
      return this.opened;
    }
  },
  methods: {
    ...mapMutations([
      'changeProp'
    ]),
    open(evt, contextData) {
      const h = contextData.fileData.hash
      if(this.selectedActiveContextRowHash != h) this.changeProp({prop: 'selectedActiveContextRowHash', state: h})
      this.opened = true;
      this.contextData = contextData;
      if (this.popper) this.popper.destroy();
      this.popper = new Popper(this.referenceObject(evt), this.$refs.popper, {
        placement: "right-start",
        modifiers: {
          preventOverflow: {
            boundariesElement: document.querySelector(this.boundariesElement)
          }
        }
      });
      // Recalculate position
      this.$nextTick(() => this.popper.scheduleUpdate());
    },
    close() {
      if(this.selectedActiveContextRowHash != null) this.changeProp({prop: 'selectedActiveContextRowHash', state:null})    
      if (this.popper !== undefined) {
        this.opened = false;
        this.contextData = null;
      }
    },
    referenceObject(evt) {
      const left = evt.clientX;
      const top = evt.clientY;
      const right = left + 1;
      const bottom = top + 1;
      const clientWidth = 1;
      const clientHeight = 1;
      function getBoundingClientRect() {
        return { left, top, right, bottom };
      }
      const obj = {
        getBoundingClientRect,
        clientWidth,
        clientHeight
      };
      return obj;
    }
  },
  beforeDestroy() {
      if(this.selectedActiveContextRowHash != null) this.changeProp({prop: 'selectedActiveContextRowHash', state:null})    
      if (this.popper !== undefined) {
      this.popper.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  z-index: 999;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 #eee;

  &:focus {
    outline: none;
  }

  ul {
    padding: 0px;
    margin: 0px;
  }
}
</style>
