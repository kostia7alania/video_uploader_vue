<template>
  <div>
    <div>
      <button class="btn btn-primary progress_btn" v-if="all_selected_count && all_bad_selected_count === 0 " @click="sendHandler">{{sendSelected}} {{all_valid_selected_size | sizeFilter}} </button>
      <button class="btn btn-danger progress_btn" v-if="all_selected_count" @click="sendHandler">{{delSelected}} ({{all_selected_count}})</button>
    </div>
    <div v-if="all_valid_count">
      <button class="btn btn-warning progress_btn" v-b-tooltip.hover title="without invalid" @click="sendHandler">{{sendAllText}} ({{ all_valid_size | sizeFilter }})</button>
    </div>
  </div>
</template>

<script>
import {filters} from '@/mixins.js' 

export default {
  name: "Action-Btns",
  mixins: [filters],
  data() {
    return { 
      sendSelected: 'Upload selected',
      delSelected: 'Remove selected',

    }
  },
  props: {
    file: File,
    index: String | Number,
    sizeCheck: Boolean,
    typeCheck: Boolean
  },
  methods: {
    sendHandler() {
      let s = this.sizeCheck;
      let t = this.typeCheck;
      if (!s | !t) {
        alert(s);
      }
      console.log("sendHandler", this.index);
    },
    deleteHandler() {
      this.$store.commit("deleteEntry", {
        prop: "selectedVideos",
        index: this.index
      });
    }
  },
  computed: { 
    sendAllText(){return `Send all ${this.all_bad_count?'valid':''} ${this.all_valid_count} `},

    all() { return this.$store.state.selectedVideos },
    all_count() {return this.all.length },
    all_size() {  return this.all.reduce((sum,cur)=>cur.fileData.file.size+sum,0)},

    all_selected(){ return this.all.filter( e => e.userData.selected ) },
    all_selected_count() {return this.all_selected.length },
    all_selected_size() {  return this.all_selected.reduce((sum,cur)=>cur.fileData.file.size+sum,0)},


    all_valid() { return this.all.filter( e=> e.fileData.sizeOK && e.fileData.typeOK) },
    all_valid_count() {return this.all_valid.length },
    all_valid_size() {  return this.all_valid.reduce((sum,cur)=>cur.fileData.file.size+sum,0)},
   

    all_valid_selected() { return this.all_valid.filter( e => e.userData.selected ) },
    all_valid_selected_count() {return this.all_valid_selected.length },
    all_valid_selected_size() {  return this.all_valid_selected.reduce((sum,cur)=>cur.fileData.file.size+sum,0)},
    

    all_bad() { return this.all.filter( e=> !e.fileData.sizeOK || !e.fileData.typeOK) },
    all_bad_count(){return this.all_bad.length },
    all_bad_size() {return this.all_bad.reduce((sum,cur)=>cur.fileData.file.size+sum,0)},


    all_bad_selected() { return this.all_bad.filter( e=> e.userData.selected ) },
    all_bad_selected_count(){return this.all_bad_selected.length },
    all_bad_selected_size() {return this.all_bad_selected.reduce((sum,cur)=>cur.fileData.file.size+sum,0)},

 

    send_btn_tooltip() {
      /// if(!this.sizeCheck || !this.typeCheck) return 'You cannot send this file'; return 'Send the file';
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
    color: black;
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
