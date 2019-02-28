<template> 
    <table class="table" align="center" width="1200px" border="0" cellpadding="10" cellspacing="10">
      <thead>
        <tr>
          <th width="22">#</th>
          <th align="center" scope="col">Preview</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Comment</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td colspan="5" align="center" v-html="'Summary: <b>Count:</b> ' + alreadyUploaded.length"></td>
        </tr>
      </tfoot>

      <tbody>
        <tr align="center" v-for="(file2, index2) in alreadyUploaded" :index="index2" :key="file2.VidUID" >
          <td>{{index2+1}}</td>
          <td width="200px">
            <video width="200px" controls>
              <source
                :src="(file2.status==2)?ConvertedVideoDir+file2.VidUID+'.mp4':RealVideoDir+file2.FileName"
                :poster="(file2.status==2)?PreviewDir+file2.VidUID+'.gif':''"
                :type="(file2.status==2)?'video/mp4':'video/'+file2.FileName.split('.')[1]" >
            </video>
          </td>
          <td align="center"> <b>{{file2.Status|status}}</b> </td>
          <td align="center"> <b>{{file2.Date}}</b> </td>
          <td align="center"> <span>{{file2.Comments}} </span> </td>
        </tr>

      </tbody>
    </table> 
</template>

<script>
export default {
  name: "Uploaded-Videos",
  props: { alreadyUploaded: Array },
  filters: {
    status(e) {
        return e==0?"[0] - In queue":e==1?"[1] - Converting...":e==2?"[2] - Converted!":e==3?"[3] - Error":"N/A"
      } 
  },
  computed: {
    otvetjson() { return this.$store.state.otvetjson },
    ConvertedVideoDir() { return this.$store.state.ConvertedVideoDir },
    RealVideoDir() { return this.$store.state.RealVideoDir }
  }
};
</script>
 
<style scoped lang="scss"> </style>
