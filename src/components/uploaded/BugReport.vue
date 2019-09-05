<template>
  <div id="myContainer">
    <!-- Our triggering (target) element -->
    <b-button
      :class="btnClassComp"
      id="exPopoverReactive1"
      :disabled="popoverShow"
      ref="button"
      size="sm"
      :variant="abusingFile.Report ? 'danger' : 'outline-danger'"
      v-b-tooltip.hover.left :title="tooltipComp"
    >
      <!--<i v-b-tooltip.hover.left :title="sending ? tooltipComp : ''" :class="iconComp"></i>-->
      <font-awesome-icon :icon="sending ? ['fas','stopwatch'] : ['fas','bell']"/>
      </b-button>

    <!-- Our popover title and content render container -->
    <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
    <!-- We specify the same container as the trigger button, so that popover is close to button -->
    <b-popover
      target="exPopoverReactive1"
      triggers="click"
      :show.sync="popoverShow"
      placement="bottomleft"
      container="myContainer"
      ref="popover"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <template slot="title">
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>

      </template>
      <div>
        <b-row>
          <b-col sm="12">
            <b-alert show class="small">
              <strong>{{$t('File name')}}</strong><br />
              {{ abusingFile.OrigFileName }}
            </b-alert>
            <b-form-textarea
              ref="comment"
              size="sm"
              :placeholder="$t('abusing-text-placeholder')"
              v-model.trim="comment"
              :state="commentstate"
              invalid-feedback="This field is required"
            />
          </b-col>
        </b-row>
        <br />
        <b-row v-if="abusingFile.Report">
          <b-col sm="12">
            <b-alert show class="small">
              <strong>{{$t('Last report reason')}}</strong><br />
              <!--<i class="far fa-calendar-alt"></i>-->
              <font-awesome-icon :icon="['fas','calendar-alt']"/>
              {{ new Date(abusingFile.ReportDate).toLocaleString() }}: <br />
              <span class="abusing-field" v-html="abusingFile.Report"></span>
            </b-alert>
          </b-col>
        </b-row>

        <b-button
          @click="onClose"
          size="sm"
          variant="danger"
          v-b-tooltip.hover.bottomleft :title="$t('Cancel-btn-title')"
        >
          <font-awesome-icon :icon="['fas','ban']"/>
          <!--<i class="fas fa-ban"></i>-->
          {{$t('Cancel-btn-text')}}
        </b-button>

        <b-button
          @click="onOk"
          size="sm"
          variant="primary"
          v-b-tooltip.hover.bottomleft :title="$t('Send-btn-title')"
        >
        <font-awesome-icon :icon="['fab','telegram-plane']"/>
          <!--<i class="fab fa-telegram-plane"></i>-->
            {{$t('Send-btn-text')}} </b-button>

        <b-button
          @click="onAllRight"
          size="sm"
          variant="success"
          v-b-tooltip.hover.bottomleft
          :title="$t('All-fine-btn-title')"
          >
          <!--<i class="fas fa-check"></i>-->
          <font-awesome-icon :icon="['fas','check']"/>
          {{$t('All-fine-btn-text')}}
        </b-button>
      </div>
    </b-popover>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: { abusingFile: [Object, Boolean] },
  data() {
    return {
      commentstate: null,
      popoverShow: false,
      comment: null,
      sending: false
    };
  },
  watch: {
    comment(val) {
      if (val) {
        this.commentstate = true;
      }
    }
  },
  computed: {
    tooltipComp() {
      if (this.sending) return $t("Please wait while sending message");
      else return $t("Send bug-report about the video to developers");
    },
    btnClassComp() {
      return this.sending ? "disabled" : false;
    },
    iconComp() {
      if (this.sending) return "fas fa-stopwatch";
      else return "far fa-bell";
    }
  },
  methods: {
    ...mapActions(["sendFeedback", "getVideoList"]),
    onClose() {
      this.popoverShow = false;
    },
    async sendFeedBack(allfine) {
      this.onClose();
      this.sending = true;
      await this.sendFeedback({
        VidUID: this.abusingFile.VidUID,
        comment: allfine ? "" : this.comment
      });
      await this.getVideoList();
      this.sending = false;
    },
    onAllRight() {
      this.sendFeedBack(1);
    },
    onOk() {
      if (!this.comment) this.commentstate = false;
      else this.sendFeedBack();
    },
    onShow() {
      // This is called just before the popover is shown
      // Reset our popover form variables
      this.comment = "";
      this.commentstate = null;
    },
    onShown() {
      // Called just after the popover has been shown
      // Transfer focus to the first input
      this.focusRef(this.$refs.comment);
    },
    onHidden() {
      // Called just after the popover has finished hiding
      // Bring focus back to the button
      this.focusRef(this.$refs.button);
    },
    focusRef(ref) {
      // Some references may be a component, functional component, or plain element
      // This handles that check before focusing, assuming a `focus()` method exists
      // We do this in a double `$nextTick()` to ensure components have
      // updated & popover positioned first
      this.$nextTick(() => {
        this.$nextTick(() => {
          (ref.$el || ref).focus();
        });
      });
    }
  }
};
</script>

<style lang="scss">
button.disabled i:hover {
  color: black !important;
}
button.disabled {
  cursor: not-allowed !important;
}
.modal-header .close {
  padding: 0.5rem 0.5rem;
}

.popover-body {
  text-align: center;
}

.abusing-field {
  overflow: auto;
  max-height: 200px;
  display: block;
}
</style>
