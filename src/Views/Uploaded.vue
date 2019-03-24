<template>
  <div>
    <b-jumbotron
      :header="$t('Uploaded_vue.Uploaded')"
      :lead="$t(`Uploaded_vue.Already`)"
    >
      <b-container class="bv-example-row">
        <b-row align-h="center" align-v="center">
          <div><UploadedRefreshBtn /></div>
          <transition
            name="fade"
            :duration="{ enter: 250, leave: 500 }"
            appear
            mode="out-in"
          >
            <div class="statistics" v-if="showStatistics">
              <div v-if="durationTotal">
                <b>{{ $t("Uploaded_vue['Total duration']") }} </b
                >{{ duration_comp(durationTotal) }}
              </div>
              <div v-if="alreadyUploaded.length">
                <b>{{ $t("Uploaded_vue['Number of videos']") }} </b
                >{{ alreadyUploaded.length }}
              </div>
            </div>
          </transition>
        </b-row>
      </b-container>
    </b-jumbotron>

    <UploadedVideos />
  </div>
</template>

<script>
import UploadedRefreshBtn from "../components/uploaded/UploadedRefreshBtn";
import UploadedVideos from "@/components/uploaded/UploadedVideos";
import { duration_comp_mixin } from "@/mixins.js";

import { mapState } from "vuex";
export default {
  name: "Uploaded",
  mixins: [duration_comp_mixin],
  components: { UploadedRefreshBtn, UploadedVideos },
  computed: {
    ...mapState(["alreadyUploaded"]),
    showStatistics() {
      return this.durationTotal || this.alreadyUploaded.length;
    },
    durationTotal() {
      let out = this.alreadyUploaded.reduce(
        (sum, e) => (isNaN(+e.Duration) ? 0 : +e.Duration + sum),
        0
      );
      return !out || isNaN(out) ? 0 : Math.round(out);
    }
  }
};
</script>

<style lang="scss" scoped>
.fade {
  &-enter,
  &-leave-to {
  }

  &-leave,
  &-enter-to {
  }

  &-enter,
  &-leave-to {
    transform: translateX(10px);
    opacity: 0.5;
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 200ms ease-in-out;
  }

  &-enter-active {
    transition-delay: 100ms;
    transition: all 0.5s ease;
    animation: bounce-in 0.5s;
  }

  &-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.statistics {
  text-align: left;
  padding-left: 1em;
}
</style>
