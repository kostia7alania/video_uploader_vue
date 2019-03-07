<template>
  <div align="center">

    <button class="btn" v-if="!isInProgress" @click.stop="sendHandler" :class="sendClass" v-b-tooltip.hover :title="send_btn_tooltip">
      <i class="far fa-share-square"></i>
    </button>

    <button class="btn" v-if="!isInProgress" @click.stop="deleteHandler" v-b-tooltip.hover title="Delete the file">
      <i class="far fa-trash-alt"></i>
    </button>

    <button class="btn" v-if="isInProgress" @click.stop="stopHandler" v-b-tooltip.hover title="Stop">
      <i class="far fa-stop-circle"></i>
    </button>
 
   <progressBar v-if="isInProgress" :percent="+obj.percentCompleted"/>

</div>

 
</template>

<script>


import checkMixins from '@/mixins.js'
import {localCheckers} from '@/mixins.js'
import progressBar from './ProgressBar'

import { mapMutations, mapActions, mapState } from 'vuex'; 

export default {
  name: "Action-Btns",
  components: {progressBar},
  mixins: [checkMixins, localCheckers],
  props: { obj: Object },
  data() {
    return {
    }
  },
  methods: {

    ...mapActions([
      'upload'
    ]),

    ...mapMutations([
      // mapMutations также поддерживает нагрузку:
      'deleteEntry' // `this.incrementBy(amount)` будет вызывать `this.$store.commit('incrementBy', amount)`
    ]),

    async sendHandler() {
      await this.upload ({ index: this.obj.index, data: this.selectedVideos[this.obj.index] } )
    },

    deleteHandler() {
      this.deleteEntry({prop: 'selectedVideos', index: this.obj.index})
    },

    stopHandler() {
     this.selectedVideos[this.obj.index].userData.source.cancel('Cancelled by user!')
    },
  }, 
  mounted(){
    console.log('OBJ.>>>',this.obj)
  },
  computed: {

    ...mapState([
      'selectedVideos',
      'getTime'
    ]),

    isInProgress() {
      return !isNaN(parseInt(this.obj.percentCompleted))
    },
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
