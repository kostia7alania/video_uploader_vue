<template>
  <div @click.stop>
    <b-form-textarea
      @contextmenu.stop
      id="textarea-state"
      v-model.trim="commentHandler"
      :placeholder="$t('type-your-comment')"
      rows="5"
    />

    <div v-if="lengthMaxPercent">
      <b-progress
        v-b-tooltip.hover
        :title="commentLimitTooltip"
        :max="maxLen"
        height="2rem"
        :variant="variant"
      >
        <b-progress-bar :value="len">
          {{ commentLimitText }}: {{ lengthMaxPercent }}%:
          <strong>{{ len }} / {{ maxLen }}</strong>
        </b-progress-bar>
      </b-progress>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Row-text-area",
  props: {
    hash: {
      type: String,
      required: true
    },
    comment: null
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["changeSelectedVideos"])
  },
  watch: {},
  computed: {
    len() {
      return this.comment ? this.comment.length : 0;
    },
    maxLen() {
      return +this.commentMaxLength;
    },
    commentLimitTooltip() {
      if (this.len > this.maxLen)
        return this.$t("Comments need to be reduced", { maxLen: this.maxLen });
      else return this.$t("The comment max size is", { maxLen: this.maxLen });
    },
    commentLimitText() {
      return this.len > this.maxLen
        ? this.$t("Size has been exceeded")
        : this.$t("Limit size");
    },
    variant() {
      return this.lengthMaxPercent < 85
        ? "success"
        : this.len > this.maxLen
        ? "danger"
        : "warning";
    },
    lengthMaxPercent() {
      const per = Math.round((this.len / this.maxLen) * 100);
      return per > 50 ? per : 0;
    },
    commentHandler: {
      //@input="commentHandler($event.target.value.trim())"
      get() {
        return this.comment;
      },
      set(val) {
        let c = this.comment;
        val = val.trim();
        val = val.replace(/ {3}/gim, " ");
        val = val.replace(/\n\n/gim, "\n");
        val = val.replace(/\r/gim, "\r");
        console.log(val, c);
        if (c == null || c.trim() !== val.trim())
          this.changeSelectedVideos({
            prop: "comment",
            hash: this.hash,
            val: val
          });
      }
    },
    ...mapState(["commentMaxLength"])
  }
};
</script>

<style lang="scss" scoped>
.progress {
  background-color: #8395a77a;
}
</style>
