<template>
  <header class="header-content sticky-header">
    <transition name="slide">
      <div class="bg-dark" v-if="isShown & show_menu">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4 menu-sections">
              <h4 class="text-white">
                {{ $t("Header_vue.About") }}
              </h4>
              <p class="text-muted">
                {{ $t("Header_vue.About_article") }}
              </p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4 menu-sections">
              <h4 class="text-white">
                {{ $t("Header_vue.Help") }}
              </h4>
              <div class="offset-md-4">
                <ul class="list-unstyled text-left help-menu">
                  <li>
                    <a @click.prevent="soonAlert" href="#" class="text-white">
                      <i class="fas fa-question-circle"></i>
                      {{ $t("Header_vue.How-To-Use") }}
                    </a>
                  </li>
                  <li>
                    <a @click.prevent="soonAlert" href="#" class="text-white">
                      <i class="fas fa-wrench"></i>
                      {{ $t("Header_vue.Settings") }}
                    </a>
                  </li>
                  <li>
                    <a @click.prevent="soonAlert" href="#" class="text-white">
                      <i class="far fa-comments"></i>
                      {{ $t("Header_vue.Feedback") }}
                    </a>
                  </li>
                  <li class="language">
                    <Language />
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
          href="#"
          @click.prevent
          v-b-tooltip
          :title="$t('Header_vue.Brand_title')"
          class="navbar-brand d-flex align-items-center"
        >
          <font-awesome-icon :icon="['fab', 'youtube']" class="logotip" />
          <!--<i class="fab fa-youtube logotip"></i>-->
          <strong>{{ $t("Header_vue.Brand") }}</strong>
        </a>
        <template v-if="show_menu">
          <button
            class="navbar-toggler back-to-size-btn"
            type="button"
            v-b-tooltip.hover
            :title="$t('Header_vue.Back-to-site_title')"
            @click="closeWindow($event)"
          >
            <span class="navbar-toggler-close">
              <font-awesome-icon icon="angle-double-left" />
              <!--<i class="fas fa-angle-double-left"></i>-->
              {{ $t("Header_vue.Back-to-site") }}
              <font-awesome-icon icon="times" />
              <!--<i class="fas fa-times"></i>-->
            </span>
          </button>
          <button
            class="navbar-toggler"
            @click="isShown = !isShown"
            type="button"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </template>
      </div>
    </div>
    <Tabs />
  </header>
</template>

<script>
import { mapState } from "vuex";

const Language = () => import("./Language");
const Tabs = () => import("./Tabs");

export default {
  name: "my-header",
  components: { Language, Tabs },
  data() {
    return {
      isShown: 0
    };
  },
  methods: {
    closeWindow() {
      try {
        window.close();
        setTimeout(
          () => this.$toast.error(this.$t("Header_vue['cant-close-window']")),
          1000
        );
        //var customWindow = window.open("https://2ip.ru", "_blank", "");
        //setTimeout(() => customWindow.close(), 1110);
      } catch (e) {
        console.log("ERRR!!1111..1.1.");
        this.$toast.info(e);
      }
    },
    soonAlert() {
      this.$toast.info(this.$t("The feature was implemented soon"));
    }
  },
  computed: {
    ...mapState(["show_menu"])
  }
};
</script>

<style scoped lang="scss">
ul.help-menu > li:not(.language) {
  transition: 0.3s;

  &:hover {
    color: red !important;
    text-decoration: line-through;
    transform: scale(1.1) translateY(1px) !important;
  }
}

.logotip {
  color: #dc3545;
  font-size: 30px;
  padding: 2px;
  &:active {
    transform: scale(0.8);
  }
}
.sticky-header {
  z-index: 1000;
  position: sticky;
  top: 0;
}
@media (max-width: 767px) {
  .back-to-size-btn {
    font-size: 0.99em;
  }
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

.menu-sections {
  padding-bottom: 0px !important;
}

@media (max-width: 573px) {
  .menu-sections {
    padding: 10px 0 0 0 !important;
    &:last-of-type {
      padding: 0 !important;
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
