<template>
  <button class="btn btn-warning" @click="load">
    <i :class="btn_class" class="fa" aria-hidden="true"/>
    {{!shown?'Show':'Refresh'}} list
  </button>
</template>

<script>
export default {
  name: "Uploaded-Refresh-Btn",
  props: {
    shown: Boolean
  },
  data() {
    return { 
      status: 0 //0-init,1-refreshed,2-loading,3-normal,4-error,5-success
    }
  },
  computed: { 
    btn_class() {
      let s = this.status;
      return  s==0?'fa-cloud-download-alt':
              s==1?'fa-sync-alt':
              s==2?'fa-splotch fa-spin':
              s==3?'fa-splotch':
              s==4?'fa-skull-crossbones':
              'fa-smile-wink'
    }
  },
  methods: {
    tmp_change_btn( { now = 1, after = 3 } ) {
        this.status = now;
        setTimeout(() => this.status = after, 1000)
    },
    async load() {
      if ( this.status==2 ) return;
      this.status = 2;
      let list = await this.$store.dispatch("getVideoList");
      this.tmp_change_btn(list?{now:5}:{now:4}); 
      this.$emit('updated');
    }
  }
};
</script>
 
<style scoped lang="scss">
</style>
