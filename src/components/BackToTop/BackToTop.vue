<template>
  <a
    v-show="!modalActiveIndex"
    class="cd-top js-cd-top"
    ref="js-cd-top"
    @click.prevent="backToTopClickHandler"
    href="#0"
  >
    Back to top
  </a>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "BackToTop",
  props: {},
  data() {
    return {
      scrollDuration: 700,
      offset: 300, // browser window scroll (in pixels) after which the "back to top" link is shown
      offsetOpacity: 1200, //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
      scrolling: false
    };
  },
  computed: {
    ...mapState(["modalActiveIndex"])
  },
  methods: {
    backToTopClickHandler() {
      //smooth scroll to top
      !window.requestAnimationFrame
        ? window.scrollTo(0, 0)
        : this.scrollTop(this.scrollDuration);
    },

    scrollTop(duration) {
      let start = window.scrollY || document.documentElement.scrollTop,
        currentTime = null;
      let animateScroll = timestamp => {
        if (!currentTime) currentTime = timestamp;
        let progress = timestamp - currentTime;
        let val = Math.max(
          Math.easeInOutQuad(progress, start, -start, duration),
          0
        );
        window.scrollTo(0, val);
        if (progress < duration) window.requestAnimationFrame(animateScroll);
      };
      window.requestAnimationFrame(animateScroll);
    },

    removeClass: (el, className) => {
      let classList = className.split(" ");
      if (el.classList) el.classList.remove(classList[0]);
      else if (this.hasClass(el, classList[0])) {
        let reg = new RegExp("(\\s|^)" + classList[0] + "(\\s|$)");
        el.className = el.className.replace(reg, " ");
      }
      if (classList.length > 1)
        this.removeClass(el, classList.slice(1).join(" "));
    },

    addClass: (el, className) => {
      let classList = className.split(" ");
      if (el.classList) el.classList.add(classList[0]);
      else if (!this.hasClass(el, classList[0]))
        el.className += " " + classList[0];
      if (classList.length > 1) this.addClass(el, classList.slice(1).join(" "));
    },

    hasClass: (el, className) => {
      //class manipulations - needed if classList is not supported
      if (el.classList) return el.classList.contains(className);
      else
        return !!el.className.match(
          new RegExp("(\\s|^)" + className + "(\\s|$)")
        );
    },

    checkBackToTop() {
      const backTop = this.$refs["js-cd-top"];
      var windowTop = window.scrollY || document.documentElement.scrollTop;
      windowTop > this.offset
        ? this.addClass(backTop, "cd-top--show")
        : this.removeClass(backTop, "cd-top--show", "cd-top--fade-out");
      windowTop > this.offsetOpacity &&
        this.addClass(backTop, "cd-top--fade-out");
      this.scrolling = false;
    }
  },

  mounted() {
    window.addEventListener("scroll", e => {
      //update back to top visibility on scrolling
      if (!this.scrolling) {
        this.scrolling = true;
        !window.requestAnimationFrame
          ? setTimeout(this.checkBackToTop, 250)
          : window.requestAnimationFrame(this.checkBackToTop);
      }
    });
    Math.easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
  }
};
</script>

<style scoped lang="scss">
.cd-top {
  display: inline-block;
  height: 40px;
  width: 40px;
  position: fixed;
  bottom: 40px;
  right: 10px;
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  /* image replacement properties */
  overflow: hidden;
  text-indent: 100%;
  white-space: nowrap;
  background: rgba(232, 98, 86, 0.8) url(./cd-top-arrow.svg) no-repeat center
    50%;
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.3s 0s, visibility 0s 0.3s,
    background-color 0.3s 0s;
  transition: opacity 0.3s 0s, visibility 0s 0.3s, background-color 0.3s 0s;
}

.cd-top.cd-top--show,
.cd-top.cd-top--fade-out,
.cd-top:hover {
  -webkit-transition: opacity 0.3s 0s, visibility 0s 0s,
    background-color 0.3s 0s;
  transition: opacity 0.3s 0s, visibility 0s 0s, background-color 0.3s 0s;
}

.cd-top.cd-top--show {
  /* the button becomes visible */
  visibility: visible;
  opacity: 1;
}

.cd-top.cd-top--fade-out {
  /* if the user keeps scrolling down, the button is out of focus and becomes less visible */
  opacity: 0.5;
}

.cd-top:hover {
  background-color: #e86256;
  opacity: 1;
}

@media only screen and (min-width: 768px) {
  .cd-top {
    right: 20px;
    bottom: 20px;
  }
}

@media only screen and (min-width: 1024px) {
  .cd-top {
    height: 60px;
    width: 60px;
    right: 30px;
    bottom: 30px;
  }
}
</style>
