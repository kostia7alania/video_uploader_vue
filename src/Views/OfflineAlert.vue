<template>
  <span>  </span>
  <!--
    <div id="status" :class="status">
    {{status}}
  </div>
  -->
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "OfflineAlert",
  props: { },
  data(){return {} },
  mounted() {
      window.addEventListener('online',  this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
  },
  watch: {
    status(neww,old) {
      if(neww!=old) {
        this.toast();
      }
    }
  },
  methods: {
    ...mapMutations([
      "changeProp"
    ]),
    updateOnlineStatus(event) {
        const status = navigator.onLine ? "online" : "offline";
        if(this.status !== status) this.changeProp( { prop:'status', state: status } )
    },
    toast() {
      let  res;
      if(this.status=='online') res = $t("online alert");
      if(this.status=='offline') res = $t("offline alert");;
      if(res) this.$toast.show(res,  this.$store.state.getTime(), this.toastsConfig);

    },

  },
  computed: {
    ...mapState([
      "status"
    ]),

          toastsConfig() {
            return {
            timeout: 10000,
            close: false,
            theme: "light",
            color: this.status=="online"?"green":"red", // blue, red, green, yellow
            displayMode: "replace", // once, replace
            overlay: true,
            icon: "icon-person",
            position: "topCenter",
            progressBarColor: "rgb(0, 255, 184)",
            buttons: [
              [
                "<button>X</button>",
                function(instance, toast) {
                  instance.hide(
                    {
                      transitionOut: "fadeOutUp",
                      onClosing: function(instance, toast, closedBy) {
                        console.info("closedBy: " + closedBy);
                      }
                    },
                    toast, "buttonName"
                  );
                }
              ]
            ],
            onOpening: function(instance, toast) {
              console.info("callback abriu!");
            },
            onClosing: function(instance, toast, closedBy) {
              console.info("closedBy: " + closedBy);
            }
          }
        },
   }
};
</script>

<style lang="scss" scoped>
#status {
  position: fixed;
  width: 100%;
  font: bold 1em sans-serif;
  color: #fff;
  padding: 0.5em;
}
.online {
  background: green;
}

.offline {
  background: red;
}
</style>
