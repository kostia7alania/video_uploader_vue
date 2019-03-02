<template>
  <video-player
    class="video-player-box"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    customEventName="customstatechangedeventname"
    @play="play($event)"
    @pause="pause($event)"
    @ended="ended($event)"
    @waiting="waiting($event)"
    @playing="playing($event)"
    @loadeddata="loadeddata($event)"
    @timeupdate="timeupdate($event)"
    @canplay="canplay($event)"
    @canplaythrough="canplaythrough($event)"
    @statechanged="statechanged($event)"
    @ready="ready($event)"
  />
  <!---<source :src="createVideoSrc(obj.file)" type="video/mp4">-->
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";

export default {
  name: "VideoPlayer",
  components: { videoPlayer },
  props: {
    src: File
  },
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        language: "en",
        playbackRates: [0.5, 1.0, 1.5, 2.0, 5, 16],
        sources: [
          {
            type: "video/mp4",
            src:
              "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ],
        poster: "/static/images/author.jpg"
      }
    };
  },
  mounted() {
    console.log("this is current player instance object", this.player);
  },
  methods: {
    createVideoSrc: file => window.URL.createObjectURL(file),
    play(e) {console.log('play!', e)},
    pause(e) {  console.log('pause!', e) },
    ended(e) {console.log('ended=>', e)},
    waiting(e) {console.log('waiting', e)},
    playing(e) {console.log("playing", e);},
    loadeddata(e) {console.log("loadeddata", e);},
    timeupdate(e) {//console.log("timeupdate", e);
    },
    canplay(e) {console.log("canplay", e);},
    canplaythrough(e) {console.log("canplaythrough", e);},
    statechanged(e) {console.log("statechanged", e);},
    ready(e) {console.log("ready", e);}
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>
 
<style lang="scss">
.video-player,.video-js {
  height: 200px !important;
  width: 200px!important;;
}
</style>
