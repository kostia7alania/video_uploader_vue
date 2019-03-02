<template>
  <button :class="btn_class" class="btn" @click="load">
    <i :class="btn_icon_class" class="fa" aria-hidden="true"/>
    {{btn_text}} 
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
      if(s === 5) return 'btn-success'
      if(s === 4) return 'btn-danger'
      if(s === 2) return 'btn-dark loading'
      return 'btn-warning'
    },
    btn_icon_class() {
      let s = this.status;
      return  s==0?'fa-cloud-download-alt':
              s==1?'fa-sync-alt':
              s==2?'fa-splotch fa-spin':
              s==3?'fa-splotch':
              s==4?'fa-skull-crossbones':
              'fa-smile-wink'
    },
    btn_text() {
      let status = this.status;
      let shown = this.shown;
      if(status==2) return 'Loading...';
      if(!shown) return 'Show list';
      if(status==4) return 'Error';
      if(status==5) return 'Success';
      if(shown) return 'Refresh list'
    }
  },
  methods: {
    tmp_change_btn( { now = 1, after = 3 } ) {
        this.status = now;
        setTimeout(() => this.status = after, 1000)
    },
    async load() {
      let s = this.status; 
      if ( !(s === 0 || s === 3) ) return;
      this.status = 2;
      let list = await this.$store.dispatch("getVideoList");
      this.tmp_change_btn( list ? {now: 5} : {now: 4} );
      console.log('list', list)
      if(list) this.$emit('updated'); //если ошибка, то не сообщаем, что данные получены
    }
  }
};
</script>
 
<style scoped lang="scss">

.loading {
  cursor: progress;
}
</style>
