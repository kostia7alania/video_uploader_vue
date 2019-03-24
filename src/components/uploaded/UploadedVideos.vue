<i18n>
{
  "en": {
    "The video list is empty":"The video list is empty", 
    "Click the button": "Click the button to get the list with uploaded videos"
  },
  "ru": {
    "The video list is empty":"Список пуст",
    "Click the button": "Для получения списка видео нажмите на кнопку"
   }
}
</i18n>

<template>
  <div>
    <b-container fluid class="table-responsive">
      <table
        v-if="isLoadedList && uploadedList.length"
        class="table table-striped"
        align="center"
        width="1200px"
        border="0"
        cellpadding="10"
        cellspacing="10"
      >
        <thead class="sticky table-dark">
          <UploadedVideosHead />
        </thead>

        <transition-group mode="in-out" tag="tbody" name="table-row">
          <tr
            @click="videoRowClickHandler(index2)"
            class="list-item"
            v-for="(file2, index2) in uploadedList"
            :index="index2"
            :key="file2.VidUID"
          >
            <td>{{ index2 + 1 }}</td>
            <!-- <source
                  :src="srcHandler(file2.VidUID, file2.OrigFileName, file2.Status)"
                  :poster="(file2.status==2)?PreviewDir+file2.VidUID+'.gif':''"
                  :type="(file2.status==2)?'video/mp4':'video/'+file2.OrigFileName.split('.')[1]" >
              </video>-->
            <td cols="2" class="text-center width200">
              <VideoPlayer
                :isAvailabled="
                  file2.status == 2 || parseInfo(file2.Info).type == 'video/mp4'
                "
                :src="
                  srcHandler(file2.VidUID, file2.OrigFileName, file2.Status)
                "
                :poster="`${gif_url + file2.VidUID}.gif`"
                :file_type="
                  file2.status == 2 ? 'video/mp4' : parseInfo(file2.Info).type
                "
                :status="file2.Status"
                :duration="file2.Duration"
              />
            </td>
            <td>
              <Status :status="file2.Status" />
            </td>
            <td>
              <b>{{ new Date(file2.Date).toLocaleString() }}</b>
            </td>

            <td cols="3" class="info-column">
              <InfoCol
                :file="parseInfo(file2.Info)"
                :duration="file2.Duration"
                :skipVerify="true"
              />
            </td>

            <td class="comments">
              <span v-html="file2.Comments"></span>
            </td>
          </tr>
        </transition-group>

        <tfoot class="sticky table-dark">
          <UploadedVideosHead />
        </tfoot>
      </table>
      <h1 v-else-if="isLoadedList && !uploadedList.length" class="table">
        {{ $t("The video list is empty") }}
      </h1>
      <p v-else>{{ $t("Click the button") }}</p>
    </b-container>

    <modal
      @close="onCloseModal"
      :modalShow="modalShow"
      :parseInfo="parseInfo"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import InfoCol from "@/components/Common/Info_col";
import VideoPlayer from "../upload/VideoPlayer";
import Modal from "./Modal";
import Status from "./Status";

import UploadedVideosHead from "./UploadedVideosHead";

export default {
  name: "Uploaded-Videos",
  props: {},
  data() {
    return {
      modalShow: false
    };
  },
  components: { InfoCol, VideoPlayer, Modal, Status, UploadedVideosHead },
  methods: {
    onCloseModal() {
      this.modalShow = false;
      this.changeProp({ prop: "modalActiveIndex", state: false });
    },
    videoRowClickHandler(index) {
      this.changeProp({ prop: "modalActiveIndex", state: index });
      this.modalShow = true;
    },
    srcHandler(VidUID, OrigFileName, status) {
      let out = this.watch_url;
      if (status == 2) out += VidUID + ".mp4";
      //2-значит готово и надо искать в папке CONVERTED
      else {
        out +=
          VidUID +
          "." +
          OrigFileName.split(".")[OrigFileName.split(".").length - 1]; //оригинальное расширение + новое имя
      }
      return `${out}&status=${status}`;
    },

    ...mapMutations(["changeProp"]),
    parseInfo(e) {
      let j;
      try {
        j = JSON.parse(e);
      } catch (e) {
        j = { type: "", duration: "", size: "", lastModified: "" };
      }
      return j;
    }
  },
  computed: {
    ...mapGetters(["uploadedList"]),
    ...mapState(["isLoadedList", "percentCompleted", "watch_url", "gif_url"])
  }
};
</script>

<style scoped lang="scss"></style>
