<template>
  <div @click.stop class="video-player-div">
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
  </div>
  <!---<source :src="createVideoSrc(obj.file)" type="video/mp4">-->
</template>

<script>
import "video.js/dist/video-js.css";
import { videojs, videoPlayer } from "vue-video-player";
import brand from "@/plugins/videojs-brand";

export default {
  name: "VideoPlayer",
  components: { videoPlayer },
  props: {
    file: File
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
            type: this.file.type || "video/mp4",
            src: window.URL.createObjectURL(this.file) // "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
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
    brandClick() {
      console.log("brandClick");
      this.$toast.info(
        "You are welcomed by the APCIS development team. Have a nice day!",
        this.$store.state.getTime()
      );
    },
    play(e) {
      console.log("play!", e);
    },
    pause(e) {
      console.log("pause!", e);
    },
    ended(e) {
      console.log("ended=>", e);
    },
    waiting(e) {
      console.log("waiting", e);
    },
    playing(e) {
      console.log("playing", e);
    },
    loadeddata(e) {
      console.log("loadeddata", e);
    },
    timeupdate(e) {
      /*console.log("timeupdate", e);*/
    },
    canplay(e) {
      console.log("canplay", e);
    },
    canplaythrough(e) {
      console.log("canplaythrough", e);
    },
    statechanged(e) {
      console.log("statechanged", e);
    },
    ready(player) {
      console.log("ready", player);
      player.brand({
        image: "https://apcis.tmou.org/img/tmou.gif",
        title: "by APCIS Dev Team",
        destination: "#", //"http://www.google.com",
        destinationTarget: "", //"_top"
        brandClick: this.brandClick
      });
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>
 
<style lang="scss">
.video-player-div,
.video-player,
.video-js {
  height: 200px !important;
  width: 200px !important;
}

// Sass for videojs-brand
.video-js {
  // This class is added to the video.js element by the plugin by default.
  &.vjs-brand {
    display: block;
    width: 300px !important;
    height: 200px !important;
  }
}

.vjs-fullscreen-control {
  transition: 0.3s !important;
  &:hover {
    transform: scale(1.3);
    color: white;
    padding: 1px;
  }
}

div.vjs-brand-container {
  & > img.vjs-brand-container-link {
    position: relative;
    text-align: center;
    margin: 0;
    padding: 0;
    height: 98%;
    width: 4em;
    vertical-align: middle;
    cursor: pointer;
    transition: 0.1s;

    &:hover {
      transform: scale(1.1);
      background: white;
      padding: 1px;
    }
  }
}

.vjs-error .vjs-error-display:before {
  content: "preview unavailable";
}
.vjs-modal-dialog-content {
  display: none;
}
</style>
