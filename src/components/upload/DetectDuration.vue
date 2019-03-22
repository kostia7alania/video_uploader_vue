<template>
  <div v-if="duration" class="duration">
    {{ duration_comp(duration) }}
  </div>
</template>

<script>
import { duration_comp_mixin } from "@/mixins.js";

export default {
  name: "Detect-Duration",
  props: { duration: [String, Number] },
  mixins: [duration_comp_mixin],
  data() {
    return {};
  },
  computed: {},
  mounted() {
    //MEDIA:  // ЗАШИЛИ в функцию добавления в список предпросмотра (+мб запись в базу, или через заголовки передавать)
    //console.log('FILEEE duration => ', this.duration)
    /* if(this.file) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        let d = video.duration;
        if(!d) return ''; 
        let sec = d.toFixed(0);;
        var h = sec/3600 ^ 0 ;
        var m = (sec-h*3600)/60 ^ 0 ;
        var s = sec-h*3600-m*60 ;
        this.duration = `${h<10?"0"+h:h}:${m<10?"0"+m:m}:${s<10?"0"+s:s}`;
      }
      video.src = URL.createObjectURL( this.file );
    }*/
    /*
    if(this.player) { //VIDEO.JS:
      this.player.one("loadedmetadata", () => this.duration = this.player.duration() );
    }
*/
  }
};
</script>

<style lang="scss" scoped>
.duration {
  /*
    background: rgba(0,0,0,.4);
    color: #fff;
    padding: 0px 4px 0px 4px;
    border-radius: 7px;*/

  /**
    VK video player styles :-) =>
    **/
  position: absolute;
  z-index: 2;
  bottom: 0;
  right: 0;
  margin: 8px;
  padding: 0 7px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 12.5px;
  line-height: 23px;
  height: 23px;
  white-space: nowrap;
  -o-transition: visibility 0.2s, opacity 0.2s;
  transition: visibility 0.2s, opacity 0.2s;
}
</style>
