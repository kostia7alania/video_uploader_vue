<i18n>
{
  "en": { 
   },
  "ru": { 
   }
}
</i18n>

<template>
  <!-- Modal Component -->
  <b-modal v-model="shown" id="modal-center" centered scrollable size="lg" lazy>
    <div class="my-4 modal--video-wrapper">
      <VideoPlayer
        modal="true"
        :isAvailabled="
          parseInfo(modalActiveFileGetter.Info).type == 'video/mp4'
        "
        :src="
          srcHandler(
            modalActiveFileGetter.VidUID,
            modalActiveFileGetter.OrigFileName,
            modalActiveFileGetter.Status
          )
        "
        :poster="`${gif_url + modalActiveFileGetter.VidUID}.gif`"
        :file_type="
          modalActiveFileGetter.Status == 2
            ? 'video/mp4'
            : parseInfo(modalActiveFileGetter.Info).type
        "
        :status="modalActiveFileGetter.Status"
      />
    </div>

    <div slot="modal-title">
      <div class="float-left">
        {{
          `[ ${modalActiveIndex + 1} ] —  ${new Date(
            modalActiveFileGetter.Date
          ).toLocaleString()}    `
        }}
      </div>
      <BugReport class="float-right" :abusingFile="modalActiveFileGetter" />
    </div>

    <b-container fluid class="modal-description">
      <b-row>
        <b-col sm="2">
          <label for="textarea-small">{{ $t("Comment") }}:</label>
        </b-col>
        <b-col sm="10">
          <span v-html="modalActiveFileGetter.Comments"></span>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="2">
          <label for="textarea-small">{{ $t("File name") }}:</label>
        </b-col>
        <b-col sm="10">
          {{ modalActiveFileGetter.OrigFileName }}
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="2">
          <label for="textarea-small">{{ $t("Info") }}:</label>
        </b-col>
        <b-col sm="10">
          <InfoCol
            :file="parseInfo(modalActiveFileGetter.Info)"
            :skipVerify="true"
            :inRow="true"
            :duration="modalActiveFileGetter.Duration"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="2">
          <label>{{ $t("Status") }}:</label>
        </b-col>
        <b-col sm="10" class="modal-status">
          <Status :status="modalActiveFileGetter.Status" />
        </b-col>
      </b-row>
    </b-container>
    <div slot="modal-footer" class="w-100">
      <b-button
        size="sm"
        class="float-left"
        :class="{ disabled: prevAllow }"
        variant="primary"
        @click="changeModal(false)"
      >
        <i class="fa fa-angle-left"></i> {{ $t("Prev") }}</b-button
      >
      <b-button
        size="sm"
        class="float-right"
        :class="{ disabled: nextAllow }"
        variant="primary"
        @click="changeModal(true)"
        >{{ $t("Next") }} <i class="fa fa-angle-right"></i
      ></b-button>
    </div>
  </b-modal>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import VideoPlayer from "../upload/VideoPlayer";
import InfoCol from "@/components/Common/Info_col";
import BugReport from "./BugReport";
import Status from "./Status";
import { /*withHooks,*/ useState, useEffect } from "vue-hooks";
//import {useData,useComputed,useWatch,useMounted,useUpdated,useDestroyed} from "vue-hooks";

export default {
  name: "My-Modal",
  props: {
    modalShow: null,
    parseInfo: Function
  },
  data() {
    return {
      shown: false
    };
  },
  components: { VideoPlayer, InfoCol, BugReport, Status },
  mounted() {
    this.ready = true;
  },

  hooks() {
    const [высота, изменитьВысоту] = useState(window.innerWidth); //срабатывает при инициализации
    const handleResize = () => {
      window.store.commit("changeProp", {
        prop: "height",
        state: window.innerHeight
      });
      console.warn("Resize!!");
      изменитьВысоту(window.innerHeight);
    }; //срабатывает при изменении
    useEffect(() => {
      console.log("widthEFFECT happening...");
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });

    return высота;
  },

  watch: {
    height(neww, old) {
      console.log("WATCH height", neww, old);
      let a = document.querySelectorAll(".modal .vjs-brand");
      if (a.length) a[0].style.height = neww;
    },
    shown(neww) {
      console.log("WATCH shown->", neww);
      if (!neww) this.$emit("close");
    },
    modalShow(neww) {
      console.log("WATCH modalShow->", neww);
      if (neww) this.shown = true;
    }
  },
  methods: {
    ...mapMutations(["changeProp"]),
    changeModal(act) {
      if ((!act && this.prevAllow) || (act && this.nextAllow)) {
        return;
      }
      let len = this.uploadedList.length;
      let cur = this.modalActiveIndex;
      cur = act ? cur + 1 : cur - 1;
      //this.uploadedList[]
      let index = act && cur == len ? 0 : !act && cur < 0 ? len - 1 : cur;
      this.changeProp({ prop: "modalActiveIndex", state: index });
    },
    srcHandler(VidUID, OrigFileName, status) {
      if (!OrigFileName) return;
      const spl = OrigFileName.split(".");

      let out = this.watch_url;
      if (status == 2) out += VidUID + ".mp4";
      //2-значит готово и надо искать в папке CONVERTED
      else out += VidUID + spl[spl.length - 1];
      return `${out}&status=${status}`;
    }
  },
  computed: {
    ...mapGetters(["uploadedList", "modalActiveFileGetter"]),
    ...mapState([
      "uploadedListSort",
      "uploadedListSortType",
      "watch_url",
      "gif_url",
      "height",
      "modalActiveIndex"
    ]),
    prevAllow() {
      let cur = this.modalActiveIndex;
      return cur == 0;
    },
    nextAllow() {
      let len = this.uploadedList.length;
      let cur = this.modalActiveIndex;
      return len - 1 == cur;
    }
  }
};
</script>

<style lang="scss">
.modal--video-wrapper {
  height: 19em;
  background: black;
}

.modal-status {
  padding-top: 2px;
}
.modal-body {
  .video-unavailable,
  .video-js.vjs-brand {
    width: auto;
    height: 30em;
    background: black;
    color: white;
  }
  .video-unavailable {
    height: 19em;
  }
}

.modal-description .row {
  border-top: 1px solid #dee2e6;
  label {
    margin: 0.1rem;
  }
  .info-column.col {
    padding-left: 0px;
  }
  .col-sm-10 {
    text-align: left;
  }
}

.modal-title {
  width: 100%;
}
</style>
