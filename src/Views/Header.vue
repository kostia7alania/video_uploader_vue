<template>
  <header class="header-content sticky-header">
    <transition name="slide">
      <div class="bg-dark" v-show="isShown">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4 menu-sections">
              <h4 class="text-white">About</h4>
              <p class="text-muted">
                Information Coordination Center of State Port Control
              </p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4 menu-sections">
              <h4 class="text-white">Help</h4>
              <div class="offset-md-4">
                <ul class="list-unstyled text-left help-menu">
                  <li>
                    <a @click.prevent="soonAlert" href="#" class="text-white">
                      <i class="fas fa-question-circle"></i>
                      How-To-Use</a
                    >
                  </li>
                  <li>
                    <a @click.prevent="soonAlert" href="#" class="text-white">
                      <i class="fas fa-wrench"></i>
                      Settings</a
                    >
                  </li>
                  <li>
                    <a @click.prevent="soonAlert" href="#" class="text-white">
                      <i class="far fa-comments"></i>
                      Feedback</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container d-flex justify-content-between">
        <a
          @click.prevent
          href="#"
          class="navbar-brand d-flex align-items-center"
        >
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="mr-2" viewBox="0 0 24 24" focusable="false"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>-->
          <i class="fab fa-youtube logotip"></i>
          <strong>APCIS Video Uploader</strong>
        </a>
        <button
          class="navbar-toggler back-to-size-btn"
          v-b-tooltip.hover
          title="Close this tab"
          @click="closeWindow($event)"
          type="button"
        >
          <span class="navbar-toggler-close">
            <i class="fas fa-angle-double-left"></i>
            Back to site
            <i class="fas fa-times"></i>
          </span>
        </button>
        <button
          class="navbar-toggler"
          @click="isShown = !isShown"
          type="button"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  components: {},
  name: "my-header",
  data() {
    return {
      isShown: 0
    };
  },
  methods: {
    closeWindow(e) {
      try {
        var customWindow = window.open("https://2ip.ru", "_blank", "");

        setTimeout(e => customWindow.close(), 1110);
      } catch (e) {
        console.log("ERRR!!1111..1.1.");
        this.$toast.info(e);
      }
    },
    soonAlert() {
      this.$toast.info("The feature was implemented soon..");
    }
  }
};
</script>

<style scoped lang="scss">
.logotip {
  color: #dc3545;
  font-size: 30px;
  padding: 10px;
}
.sticky-header {
  z-index: 1000;
  position: sticky;
  top: 0;
}

.back-to-size-btn {
  transition: 0.5s;
  &:hover {
    color: red;
    transform: scale(1.1);
  }
  .fa-times {
    vertical-align: middle;
    font-size: 17px;
  }
}
button.navbar-toggler:hover {
  background: rgba(255, 255, 255, 0.1);
}

.navbar-brand:hover {
  color: rgb(214, 180, 180) !important;
}

@media(max-width:573px) {
  .menu-sections {
    padding: 10px 0 0 0 !important;
        &:last-of-type {
          padding: 0  !important;
        }
    ul.help-menu {
      text-align: center !important;
      li {
        display: inline-block;
        margin: 0 10px;
        &:first-of-type {
              margin-left: 0;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
