<template>
  <div class="flag-wrapper container">
    <b-row class="fade-wrapper">
      <transition-group
        tag="div"
        name="fade"
        mode="out-in"
        class="flag russian"
        v-b-tooltip.hover.bottom
        :title="ruTitle"
      >
        <ruActive
          v-if="activeLocale == 'ru'"
          @click="changeLocale('ru')"
          class="active"
          :key="1"
        />
        <ru v-else :key="2" @click="changeLocale('ru')" />
      </transition-group>
      <transition-group
        tag="div"
        name="fade"
        mode="out-in"
        class="flag english"
        v-b-tooltip.hover.bottom
        :title="enTitle"
      >
        <enActive
          v-if="activeLocale == 'en'"
          @click="changeLocale('en')"
          class="active"
          :key="1"
        />
        <en v-else @click="changeLocale('en')" :key="2" />
      </transition-group>
    </b-row>
  </div>
</template>
<script>
import ru from "../assets/images/ru.svg";
import en from "../assets/images/en.svg";
import ruActive from "../assets/images/ru-active.svg";
import enActive from "../assets/images/en-active.svg";

export default {
  name: "Language",
  components: { ru, en, ruActive, enActive },
  data() {
    return {
      activeLocale: ""
    };
  },
  mounted() {
    this.activeLocale = this.$i18n.locale;
  },
  methods: {
    changeLocale(locale) {
      this.activeLocale = locale;
      this.$i18n.locale = locale;
    }
  },
  computed: {
    ruTitle() {
      return this.$t(
        this.activeLocale == "ru"
          ? "Header_vue.already-ru"
          : "Header_vue.choose-ru-lang"
      );
    },
    enTitle() {
      return this.$t(
        this.activeLocale == "en"
          ? "Header_vue.already-en"
          : "Header_vue.choose-en-lang"
      );
    }
  }
};
</script>

<style scoped lang="scss">
.flag-wrapper {
  text-align: center;
  height: 46px;
}

.flag {
  display: inline-block;
  width: 38px;
  padding-top: 8px;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 50%;
  vertical-align: middle;

  &:hover {
    transform: scale(1.3) translateY(-7px) !important;
  }
  &:hover {
    &.active {
      /*border: 2px solid white;*/
    }
  }
  &.active {
    /*border: 1px solid white;*/
  }
}

.russian {
  margin-right: 10px;
}
.english {
  .active {
  }
}
.fade-wrapper {
  display: inline-block;
  margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
  width: 38px;
  height: 38px;
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-to {
  transform: scale(1) translateY(-38px);
  &:hover {
    pointer-events: none;
  }
}
</style>
