<template> 
<div>
   <progressBar v-if="typeof percentCompleted === 'number'" :percent="+percentCompleted"/>

  
      <table v-if="isLoadedList && alreadyUploaded.length" class="table" align="center" width="1200px" border="0" cellpadding="10" cellspacing="10">
      <thead>
        <tr>
          <th width="22">#</th>
          <th align="center" scope="col">Preview</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Comment</th>
        </tr>
      </thead>  
      <tbody>
        <tr align="center" v-for="(file2, index2) in alreadyUploaded" :index="index2" :key="file2.VidUID" >
          <td>{{index2+1}}</td>
          <td width="200px">
            <video width="200px" controls>
              <source
                :src="(file2.status==2)?ConvertedVideoDir+file2.VidUID+'.mp4':RealVideoDir+file2.OrigFileName"
                :poster="(file2.status==2)?PreviewDir+file2.VidUID+'.gif':''"
                :type="(file2.status==2)?'video/mp4':'video/'+file2.OrigFileName.split('.')[1]" >
            </video>
          </td>
          <td align="center"> <b>{{file2.Status|status}}</b> </td>
          <td align="center"> <b>{{file2.Date}}</b> </td>
          <td align="center"> <span>{{file2.Comments}} </span> </td>
        </tr>

      </tbody>
    </table>  
    <h1 v-else-if="isLoadedList && !alreadyUploaded.length">Your video-list is empty! Please, try load you video again or convert it to another format!</h1>
    <p v-else>Click the button to get the list with uploaded videos!</p>
</div>
</template>

<script>

import { mapState } from "vuex";
export default {
  name: "Uploaded-Videos",
  props: {},
  filters: {
    status(e) {
        return e==0?"[0] - In queue":e==1?"[1] - Converting...":e==2?"[2] - Converted!":e==3?"[3] - Error":"N/A"
      } 
  },
  computed: {
    ...mapState([
      'isLoadedList',
      'percentCompleted'
    ]),
    otvetjson() { return this.$store.state.otvetjson },
    ConvertedVideoDir() { return this.$store.state.ConvertedVideoDir },
    RealVideoDir() { return this.$store.state.RealVideoDir },
    alreadyUploaded() { return this.$store.state.alreadyUploaded},
  }
};
</script>
 
<style scoped lang="scss"> </style>
