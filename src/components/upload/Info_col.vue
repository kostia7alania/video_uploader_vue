<template>
    <b-col>
      <p :class="'type '+sizeCheck(file.size)" v-b-tooltip.hover :title="sizeTitle">
        <b>Size:</b>
        {{ file.size | sizeFilter }}
      </p>
      <p :class="'type ' + typeCheck(file.type)" v-b-tooltip.hover :title="typeTitle">
        <b>Type:</b>
        {{ file.type | typeFilter}}
      </p>
      <b>Modified:</b>
      {{file.lastModifiedDate | dateFilter }}<br>
      {{file.lastModifiedDate | dateFilterTime }}
    </b-col>
</template>

<script> 


import checkMixins from '@/mixins.js' 
import {filters} from '@/mixins.js' 
  
export default {
  name: "Selected-Videos-Info-Column", 
  mixins: [checkMixins, filters],
  props: { obj:Object, file: File },
  computed: {
    sizeTitle() { return this.obj.fileData.sizeOK ? 'Size is OK' : 'File size exceeded' },
    typeTitle() { return this.obj.fileData.typeOK ? 'Type is OK' : 'The format is not supported' },
  },
  filters: {
    dateFilter: e => new Date(e).toLocaleDateString() ,
    dateFilterTime: e => new Date(e).toLocaleTimeString() ,
    typeFilter: e => (e ? `${e.split("/")[1]} (${e.split("/")[0]})` : "N/A")
  }
};
</script>
 
<style lang="scss" scoped> 
  .size-success { /*color: green*/ }
  .size-error { color: red; }
  .type-success { /*color: green;*/ }
  .type-error { color: red; }
 </style> 