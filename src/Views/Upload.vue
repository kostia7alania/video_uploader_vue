<template>
  <div id="#appVideoUploader"> 
      <DragDropZone/>
      <SelectedVideos v-if="filess.lenght"/>
      <button v-if="filess[0]" class="btn btn-primary progress_btn" @click="sendHandler">{{btnsend}}</button>
      <ProgressBar/> 
  </div>
</template>


<script>
import SelectedVideos from "../components/upload/SelectedVideos";
import DragDropZone from "../components/upload/DragDropZone";
import ProgressBar from "../components/upload/ProgressBar";

import axios from "axios";

export default {
  name: "Upload",
  components: {
    SelectedVideos,
    DragDropZone,
    ProgressBar
  },
  props: { msg: String },
  data() {
    return {
      uploadPercentage: 0,
      filess: [], 
      btnsend: "SEND",
      updbtn: "Update this list",
      btnalreadyuploaded: "Load already uploaded videos"
    };
  },
  methods: {



    sendHandler(ev) {
      let btnTMPsendName = this.btnsend;
      let btnTMPname = this.btnalreadyuploaded;

      this.btnalreadyuploaded = this.btnsend = "Loading...";

      this.$store.commit("changeProp", { prop: "transferStatus", state: "" });
      
      let formData = new FormData();
      formData.append("def_uid", this.params.def_uid);
      formData.append("insp_uid", this.params.insp_uid);
      let f = this.filess;
      for (let i = 0; i < f.length; i++) {
        formData.append("file_" + i, f[i].fileSelf);
        formData.append("comment_" + i, f[i].comment);
        console.log(f[i].fileSelf);
      }
      const url = this.$store.state.url_api;
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/octet-stream"
        },
        //onUploadProgress: e =>(this.uploadPercentage = Math.round((e.loaded * 100) / e.total))
      };
      axios
        .post(url+'?action=savevid&break=1&', formData, config)
        .then(res => {
          console.log("SUCCESS=>", res);
          this.filess = [];
          this.transferStatus = `Your Files Uploaded Successively!`;
          this.btnalreadyuploaded = btnTMPname;
          this.btnsend = btnTMPsendName;
          this.load();
        })
        .catch(err => {
          console.log("err=>", err);
          this.transferStatus = `<b>Error => </b> ${err.response}!`;
        })
        .then(() => {
          this.btnalreadyuploaded = btnTMPname;
          this.btnsend = btnTMPsendName;
        });
    }
  },
  computed: {

  }
};
</script>
 
<style scoped lang="scss">
 
.progress_btn {
  width: 100%;
  cursor: pointer;
}
</style>
