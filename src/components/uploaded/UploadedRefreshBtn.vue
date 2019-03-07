<template>
  <div>

  <b-button-group>
    <b-button :class="btn_class" class="btn" @click="load">
      <i :class="btn_icon_class" class="fa"/>
      {{btn_text}} 
    </b-button> 
    <b-dropdown v-if="shown" right text="Menu">
      <b-dropdown-item @click="hide"><i class="far fa-eye-slash"></i> Hide list</b-dropdown-item>
      <!--<b-dropdown-divider />-->
    </b-dropdown>
  </b-button-group>
    
  </div>
</template>

<script>
import axios from 'axios';

import { mapState, mapActions } from "vuex";
export default {
  name: "Uploaded-Refresh-Btn",
  props: {},
  data() {
    return {
      status: 0
    } //0-init,1-refreshed,2-loading,3-normal,4-error,5-success,6-cancelled
  },
  mounted() {
    window.e = this;
    this.getVideoList() //for getting HASH -- for prevent(alerting) upload DUPLICATES videos;
  },
  computed: {
    shown() {return this.$route.name === 'uploaded';},
    ...mapState([
      'isLoadedList',
      'source'
    ]),
    btn_class() {
      let s = this.status;
      if(s === 6) return 'btn-danger'
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
              s==6?'fa-skull-crossbones':
              'fa-smile-wink'
    },
    btn_text() {
      let status = this.status;
      let shown = this.shown;
      if(status==6) return 'Cancelled';
      if(status==2) return 'Loading...';
      if(!shown) return 'Show list';
      if(status==4) return 'Error';
      if(status==5) return 'Success';
      if(shown) return 'Refresh list'
    }
  },
  methods: {
    ...mapActions([
      'getVideoList'
    ]),
    hide(){
      this.$router.push({ name: 'Home', params: { userId: 123 }})
    },
    cancel() {
      this.source.cancel('Operation canceled by the user.');
      this.tmp_change_btn( {now: 6} );
    },
    tmp_change_btn( { now = 1, after = 3 } ) {
        this.status = now;
        setTimeout( () => this.status = after, 1500)
    },

    async load() {
      this.$router.push('uploaded')
      let s = this.status;
      if ( s === 2 ) return this.cancel(); 
      this.status = 2;
      let list = await this.getVideoList();
      if(typeof list === "string" )  {console.log('exit!!!->',list);return ;}
      this.tmp_change_btn( list ? {now: 5} : {now: 4} );
      if(list instanceof Array && list.lenght===0) this._vm.$toast.warning( 'The list is empty', state.getTime() )
    }
  },
};
</script>
 
<style scoped lang="scss"> 
.loading { cursor: progress; }
</style>
