<template>
  <div>
    <p align="center">
      <label class="file-label" for="file">Or browse</label>
      <input type="file" id="file" :accept="formats" @change="videoSelectedBtn" multiple>
    </p>
  </div>
</template>

<script>
export default {
  name: "Drag-Drop-Zone-Button",
  props: {
    formats: String
  },
  computed: {},
  mounted() {},
  methods: {
    videoSelectedBtn(ee) {
      //this.transferStatus = ``;this.uploadPercentage = 0;
      let a = ee.target.files || ee.dataTransfer.files,
        b = "";
      if (!a.length) {
        return;
      }
      for (let i = 0; i < a.length; i++) {
        let aa = a[i].name.split(".");
        let fileType = "." + aa[aa.length - 1];
        if (this.formats.includes(fileType)) {
          this.filess.push({
            name: a[i].name,
            size: a[i].size,
            type: a[i].type,
            url: window.URL.createObjectURL(a[i]),
            lastModifiedDate: a[i].lastModifiedDate.toLocaleString(),
            comment: "",
            fileSelf: a[i]
          });
        } else {
          alert(
            `The video-format using in ${
              a[i].name
            } is not supported! Please, convert it to another format!`
          );
        }
      }
    }
  }
};
</script>
 
<style scoped lang="scss">
form#file-drag-drop {
  display: block;
  height: 400px;
  width: 400px;
  background: #ccc;
  margin: auto;
  margin-top: 40px;
  text-align: center;
  line-height: 400px;
  border-radius: 4px;
}
#file-drag-drop {
  border: 2px dashed #999;
  border-radius: 10px;
  width: 400px;
  margin: 50px auto;
  padding: 20px;
}

.file-label {
  display: inline-block;
  padding: 10px 15px;
  border: 1px solid #74b9ff;
  color: #74b9ff;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
}
.file-label:hover {
  color: #fff;
  background-color: #74b9ff;
}
#file {
  display: none;
}
</style>
