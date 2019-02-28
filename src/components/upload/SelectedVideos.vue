<template>
  <table class="table" align="center" width="1200px">
    <thead>
      <tr>
        <th width="22" scope="col">#</th>
        <th width="150px" align="center" scope="col">Preview</th>
        <th scope="col" width="333px">Name</th>
        <th scope="col">Info</th>
        <th scope="col">Comment</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tfoot>
      <td
        colspan="6"
        align="center"
        v-html="'Summary:  <b>Count:</b> '+sumVideos[0].length+' '+ sumVideos[0].size"
      ></td>
    </tfoot>
    <tbody>
      <tr
        align="center"
        v-for="(file,index) in filess"
        :file="file"
        :index="index"
        :key="file.lastModifiedDate"
      >
        <td>{{index+1}}</td>
        <td width="200px">
          <video width="200px" controls>
            <source v-bind:src="file.url" type="video/mp4">
          </video>
        </td>
        <td align="center">
          <b>{{file.name}}</b>
        </td>
        <td align="left">
          <b>Size:</b>
          {{(file.size/1000/1000).toFixed(1)}} Mb
          <br>
          <b>Type:</b>
          {{file.type}}
          <br>
          <b>Modified:</b>
          {{file.lastModifiedDate}}
        </td>
        <td align="center">
          <textarea :uid="index" type="text" @keyup="commentHandler"></textarea>
        </td>
        <td align="center">
          <button :uid="index" class="btn btn-warning btn-delete" @click="deleteHandler">x</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Selected-Videos",
  props: {
    filess: Array
  },
  methods: {
    commentHandler(ee) {
      this.filess[ee.target.getAttribute("uid")].comment = ee.target.value;
    },
    deleteHandler(ev) {
      let id = ev.target.getAttribute("uid");
      this.filess.splice(id, 1);
    }
  },
  computed: {
    sumVideos() {
      let sumArr = [];
      let fil = 0;
      this.filess.forEach(file => (fil += file.size));
      let size0 = (fil / 1000 / 1000).toFixed(1);
      let size1 =
        size0 > 1000
          ? `<b style='color:red'>${size0}</b>`
          : `<span style='color:green'>${size0}</span>`;
      let size = "<b>Size:</b> " + size1 + " Mbytes";
      sumArr.push({ length: this.filess.length, size: size });
      return sumArr;
    }
  }
};
</script>
 
<style scoped lang="scss">
</style>
