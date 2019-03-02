<template>
  <table class="table" align="center" width="1200px">
    <thead>
      <tr>
        <th width="22">#</th>
        <th width="150px" align="center">Preview</th>
        <th width="333px">Name</th>
        <th>Info</th>
        <th>Comment</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(obj, index, key) in selectedVideos" :key="obj.hash" :class="obj.class" >
        <td>{{index+1}}</td>
        <td width="200px"> 
              <VideoPlayer :src="obj.file" />
        </td>
        <td align="center">
          <b>{{obj.file.name}}</b>
        </td>
        <td align="left"> 
          <p :class="'type '+sizeCheck(obj.file.size)"><b>Size:</b> {{ obj.file.size | sizeFilter }} </p>
          <p :class="'type '+typeCheck(obj.file.type)"><b>Type:</b> {{ obj.file.type | typeFilter}} </p>
          <b>Modified:</b>
          {{obj.file.lastModifiedDate | dateFilter}}
        </td>
        <td align="center">
          <textarea type="text" @input="comment($event, index)"></textarea>
        </td> 
        <ActionBtns :typeCheck="typeCheck(obj.file.type) === 'type-success'" :sizeCheck="sizeCheck(obj.file.size) === 'size-success'" :index="index" :file="obj.file" />  
      </tr>
    </tbody>
  </table>
</template>

<script>
import ActionBtns from './ActionBtns';
import VideoPlayer from './VideoPlayer';

export default {
  name: "Selected-Videos",
  props: {
    selectedVideos: Array
  },
  components: {ActionBtns,VideoPlayer},
  methods: {
    comment(ev, index) {
      let val = ev.target.value;
      this.$store.commit('changeObj', {obj:'selectedVideos', prop:'comment',index: index, state:val } )
      console.log('comment=> ',arguments) 
    },
    sizeCheck (e) {
      return this.maxSize>e?'size-success':'size-error'
    },
    typeCheck: (e) => e&&e.split('/')[0]=='video'?'type-success':'type-error',
    commentHandler(ee) {
      //this.filess[ee.target.getAttribute("uid")].comment = ee.target.value;
    }
  },
  filters: {
    dateFilter: e => (new Date(e)).toLocaleDateString(),

    sizeFilter: e =>  {
                      let round = d => (d-Math.floor(d)) > 0.1 && (d-Math.floor(d)) < 0.95 ? d.toFixed(1):d.toFixed(0) //убираем дробную часть где она не носит смысловую нагрузку (n.0, где n - число);
                      return (e<1000?e+" B":
                              e<1000000     ? round(e/1000)           +" KB":
                              e<1000000000  ? round(e/1000/1000)      +" MB":
                                              round(e/1000/1000/1000) +" GB")
                    },

    typeFilter: e => e?`${e.split('/')[1]} (${e.split('/')[0]})`:'N/A'
  },
  computed: {
    maxSize() {
      return this.$store.state.maxSize;
    }
  }
};
</script>
 
<style scoped lang="scss">
.size-success {
  /*color: green*/
}
.size-error {
  color: red;
}
.type-success {
  /*color: green;*/
}
.type-error {
  color: red;
}
</style>
