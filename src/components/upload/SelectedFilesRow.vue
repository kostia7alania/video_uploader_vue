<template>  
      <tr @click="rowClick(index,$event)" 
        v-b-tooltip.hover :title="rowTooltipText"
        class="list-item" :class="rowClass" >
          <td cols="1">{{index+1}}</td>
          <td cols="3">
              <span  v-if="obj.fileData.file.type === 'video/mp4'" >  <VideoPlayer :file="obj.fileData.file"/></span>
              <span v-else v-b-tooltip.hover title="The video preview is unavailable"> <i class="fas fa-ban"/> N/A  </span>
          </td>
          <td cols="2">  <b :class="{'alreadyUplName': isAlreadyUploaded}">{{obj.fileData.file.name}}</b>   </td>
          <td cols="2"> <InfoCol :obj="obj" :file="obj.fileData.file"/></td>
          <td cols="2"> <textarea @click.stop type="text" @input="comment($event, index)"></textarea> </td>
          <td cols="1">  <ActionBtns @click.stop :obj="{index, ...obj.fileData, ...obj.userData}"/> </td>
     </tr> 
</template>

<script>
import ActionBtns from "./ActionBtns";
import VideoPlayer from "./VideoPlayer";
import checkMixins from '@/mixins.js'

import InfoCol from "./Info_col";

import { mapMutations, mapState } from 'vuex'; 

export default {
  name: "Selected-Videos-Row",
  mixins: [checkMixins],
  components: { ActionBtns, VideoPlayer, InfoCol },
  props: { selectedVideos:Array, obj:Object, index:Number },
  data() { 
    return {
      hightlight_class: '' // 4 pulse => bg-warning
    };
  },
  methods: {
    ...mapMutations([
      'changeUserData',
      'toogleSelectRow'
    ]),
    pulseHandler() {
      console.log('pulseHandler');
      [ {time:0, class:'bg-danger'},
        {time:500, class:''},
        {time:1000, class:'bg-warning'},
        {time:1500, class:''}, 
        {time:2000, class:'bg-warning'},
        {time:2500, class:''},
        {time:3000, class:'bg-warning'},
        {time:3500, class:''},
        {time:4000, class:'bg-warning'},
        {time:4500, class:''},
      ].forEach(e=>setTimeout(()=>this.hightlight_class = e.class, e.time)); //bg-warning 
    },
    rowClick(index,e) {
      console.log(e)
      this.toogleSelectRow( { index } )
    },
    comment(ev, index) {
      this.changeUserData( {
        prop: "comment",
        index,
        val:   ev.target.value
      });
    },
  },
  watch: {
    pulse(neww, old) {
      console.log('pulse [neww] ->', neww,'; [old]=>',old)
      if(neww === 'pulse') this.pulseHandler()
    }
  },
  computed: {
    ...mapState([
      'maxSize'
    ]),
    rowTooltipText() {
      let res = '';
      if(this.isAlreadyUploaded) res = 'It seems you have already uploaded this file to the server'
      let fd = this.obj.fileData;
      if (!fd.sizeOK) res += `${res?' and m':' M'}ax size (<${this.maxSize/1000/1000/1000} GB) exceeded`
      if (!fd.typeOK) res += `${res?' and f':' F'}ormat not supported`
      return res;
    },

    isAlreadyUploaded() {
      let upds = this.$store.state.alreadyUploaded;
      for (e in upds) {
        if(upds[e].Hash === this.obj.fileData.hash) return true;
      }
      return false;
    },

    pulse() {
       return this.obj.userData.class;
    },

    rowClass() {
      let cls = '';
      if(this.obj.userData.selected) cls = ' selected_row '
      cls += this.hightlight_class
      if(this.rowTooltipText) cls += ' rowWithErrors'
      return cls
    }
  }
};
</script>
 
<style lang="scss">

.alreadyUplName {
 
  text-decoration: line-through;
  &:after {
    content: ' !!!!!! '
  }
}

.list-item {
  cursor: pointer;
  &:hover{
    background: rgba(0, 0, 0, 0.13)
   }
}
.selected_row {
  td { //чеб и выделение было видно и наведение;
    background-color: #0062cc73 !important;
  }
}


.rowWithErrors {
    background: #72626617;
    &:hover {
      background: #72626642;
    }
}

</style>
