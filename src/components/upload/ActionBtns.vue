<template>
  <td align="center">
    <button class="btn" @click="sendHandler" :class="sendClass" v-b-tooltip.hover :title="send_btn_tooltip">
      <i class="far fa-share-square"></i>
    </button>
    <button class="btn" @click="deleteHandler" v-b-tooltip.hover title="Delete the file">
      <i class="far fa-trash-alt"></i>
    </button>
  </td>
</template>

<script>


import checkMixins from '@/mixins.js'
import {localCheckers} from '@/mixins.js'

  
export default {
  name: "Action-Btns",
  mixins: [checkMixins, localCheckers],
  props: { obj: Object }, 
  methods: { 
    sendHandler() {
      let s = this.obj.sizeOK;
      let t = this.obj.typeOK;
      let res;
      if(!s) res = 'size exceeded'
      if(!t) res = res?'and format not supported' : 'format not supported'
      if(res) {this.$toast.warning(res, this.$store.state.getTime()); return; }
      else this.$store.dispatch( 'upload', this.$store.state.selectedVideos[this.obj.index] )
    },
    deleteHandler() {
      this.$store.commit('deleteEntry', {prop: 'selectedVideos', index: this.obj.index})
    }
  }, 
  mounted(){
    console.log('OBJ.>>>',this.obj)
  },
  computed: { 
    sendClass() { return (!this.obj.sizeOK || !this.obj.typeOK) ? 'block' : '' },
    send_btn_tooltip() {
      return !this.obj.sizeOK || !this.obj.typeOK ? 'You cannot send this file' : 'Send the file';
    }
  }
};
</script>
 
<style scoped lang="scss">
.block {
  cursor: not-allowed;
  color: gray;
  &:hover {
    background: gray;
    color:black;
  }
}
button {
  transition: 0.5s;
  margin: 3px;
  padding: 2px 6px 2px 6px;
  &:hover {
    background: orangered;
    transform: scale(1.1);
    color: white;
  }
}
</style>
