<template>
  <button class="btn btn-primary progress_btn" @click="sendHandler">{{sendAllText}}</button>
</template>

<script>
export default {
  name: "Action-Btns",
  props: {
    file: File,
    index: String|Number,
    sizeCheck: Boolean,
    typeCheck: Boolean
  },
  methods: { 
    sendHandler() {
      let s = this.sizeCheck;
      let t = this.typeCheck;
      if(!s | !t) {
        alert(s)
      }
      console.log('sendHandler', this.index)
    },
    deleteHandler() {
      this.$store.commit('deleteEntry', {prop: 'selectedVideos', index: this.index})
    }
  }, 
  computed: {
    sendAllText(){
      return 'SEND'
    },
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
