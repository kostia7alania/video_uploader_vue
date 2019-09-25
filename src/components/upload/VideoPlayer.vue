<template>
  <div @click.stop="startShow = true" class="video-player-div">
    <div
      v-if="!isAvailabled"
      class="video-unavailable"
      v-b-tooltip.hover
      :title="$t('The video preview is unavailable')"
    >
      <div class="video-unavailable--message">
        <font-awesome-icon
          :icon="['fas', 'video-slash']"
          class="fa-x"
        /><!--<i class="fas fa-video-slash fa-x"></i>-->
        <span> &nbsp; N/A </span>
      </div>
    </div>

    <VideoPlayerPlaceholder
      v-else-if="(!startShow && file) || (VidUID && !startShow)"
      @letsgo="startShow = true"
      :VidUID="VidUID"
    />

    <video-player
      v-else-if="startShow && isAvailabled"
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
      @canplay="canplay($event)"
      @canplaythrough="canplaythrough($event)"
      @statechanged="statechanged($event)"
      @ready="ready($event)"
    />

    <div class="status--message" v-if="showStatus && duration">
      <DetectDuration :duration="duration" />
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import "video.js/dist/video-js.css";
import { videojs,videoPlayer } from "vue-video-player";
import VideoPlayerPlaceholder from './VideoPlayerPlaceholder'
import DetectDuration from "./DetectDuration";

import brand from "@/plugins/videojs-brand";

import { mapState } from "vuex";
export default {
  name: "My-VideoPlayer",
  components: { videoPlayer, DetectDuration, VideoPlayerPlaceholder },
  props: { 
    VidUID:null,//загруженные и готовые (в мр4) видосы!
    isAvailabled: { type: Boolean },
    file: File,
    src: String,
    poster: {
      type: String,
      default: () => "http://placehold.jp/300x168.png"
    },

    file_type: {
      type: String,
      default: () => ""
    },
    modal: null,
    duration: [String, Number]
  },
  data() {
    return {
      startShow: false,
      showStatus: true,
      ready_player: null
    };
  },
  mounted() {
    if (this.modal) {
      this.startShow = true; // if modal --> starting playing!!;
      // console.log("this is current player instance object", this.player);
    }
  },
  methods: {
    brandClick() {
      this.$toast.info( this.$t(this.video_brand_click_msg), this.$store.state.getTime() );
    },
    play(e) {
      console.log("play!", e);
      this.showStatus = false;
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
    //timeupdate(e) {console.log("timeupdate", e);},
    canplay(e) {
      console.log("canplay", e);
    },
    canplaythrough(e) {
      e.play();
      this.$emit('refka', e);
      console.log("canplaythrough", e);
    },
    statechanged(e) {
      console.log("statechanged", e);
    },
    ready(player) { 
      console.log("ready", player);
//      if(this.video_brand_img_src) { 
        player.brand({
          video_brand_img_title: this.video_brand_img_title,
          video_brand_img_src: this.video_brand_img_src,
          destination: "#", //"http://www.google.com",
          destinationTarget: "", //"_top"
          brandClick: this.brandClick, //<==сюда пишется из - this.video_brand_click_msg;
        });
   //   }
      player.play();
      this.ready_player = player;
      ///player.one("loadedmetadata", () => this.duration = player.duration() );
    }
  },
  computed: {
    ...mapState([
      "video_brand_img_title",
      "video_brand_img_src",
      "video_brand_click_msg"
      ]),
    player() {
      return (
        this.isAvailabled &&
        this.$refs.videoPlayer &&
        this.$refs.videoPlayer.player
      );
    },
    playerOptions() {
      return {
        // videojs options
        muted: true,
        language: this._i18n && this._i18n.locale || "en",
        playbackRates: [0.5, 1.0, 1.5, 2.0, 5, 16],
        sources: [
          {
            type: this.file_type
              ? this.file_type
              : this.file.type || "video/mp4",
            src: this.src
              ? this.src
              : (URL || window.webkitURL).createObjectURL(this.file) // "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ],
        poster: this.poster
      };
    }
  }
};
</script>

<style lang="scss">
.video-player-div {
  transition: 0.4s;
  &:hover i:not(.fa-tasks) {
    color: red;
    transform: scale(1.2);
  }
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 168px;
  border: dashed 1px black;
  i {
    color: indigo;
  }
}
.video-player-div,
.video-player,
.video-js {
  /*
  height: 200px !important;
  width: 200px !important;
  */
}

// Sass for videojs-brand
.video-js {
  // This class is added to the video.js element by the plugin by default.
  &.vjs-brand {
    display: block;
    width: 300px;
    height: 168px;
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

.video-player-div {
  position: relative;
}

.video-unavailable {
  width: 300px;
  height: 168px;
  border: 1px dashed black;
  display: block;
  position: relative;
  color: black;
  cursor: not-allowed;
}

.video-unavailable--message {
  position: absolute;
  top: 43%;
  left: 42%;
}
.modal .video-unavailable--message {
  top: 48%;
  left: 45%;
}

.status--message {
  position: absolute;
  bottom: 0.2em;
  right: 0.2em;
}
</style>
