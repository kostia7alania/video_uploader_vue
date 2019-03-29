<template>
  
    <div @click="$emit('letsgo')" class="image-placeholder">
 
      <picture v-if="VidUID && isAlreadyUploaded_status == 2">
        <source type="image/webp" loop :srcset="webp">
        <source type="image/gif" :srcset="gif">
        <img :src="img" alt="Preview">
      </picture>
      <i class="ytb-icon" v-else>
        <font-awesome-icon :icon="['fab','youtube']"/>
      </i>
    </div>
 
</template>

<script>
/*eslint-disable*/  
import { mapState } from 'vuex' 
export default {
  name: "My-VideoPlayer-Placeholder",
  components: {  },
  props: {
    VidUID:null 
  },
  data() {
    return {  
    };
  },
  mounted() { 
  },
  methods: { 
  },
  computed: {
    ...mapState([
      'alreadyUploaded',
      'gif_url',
      'webp_url',
      'img_url'
    ]), 
    isAlreadyUploaded_status() {
      if(!this.VidUID) return;
      return this.alreadyUploaded.filter(e=>e.VidUID==this.VidUID)[0].Status;
    },
    gif() {
      return this.gif_url+this.VidUID+'.gif&status=2';
    },
    webp() {
      return this.webp_url+this.VidUID+'.webp&status=2';
    },
    img() {
      return this.img_url+this.VidUID+'.jpg&status=2';
    }
  }
};
</script>

<style lang="scss" scoped> 

.image-placeholder {
  background: black;
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

img {
    max-height: 167px;
    max-width: 300px;
}
.ytb-icon>svg {
  color: red;
    height: 167px;
     width: 300px;
}
.ytb-icon {
  transition: .5s;
  transform: scale (.9);
  &:active {
    transition: .1s;
    transform: scale (.7) !important;
  }
  &:hover {
    transform: scale (1.1);
  }
}
</style>
