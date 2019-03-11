<template>

  <header class=header-content>
    
    <transition name="slide">
      <div class="bg-dark" v-show="isShown">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">About</h4>
              <p class="text-muted">
                We - developers of APCIS Video Uploader Service!</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Help</h4>
              <ul class="list-unstyled">
                <li><a href="#" class="text-white">How-To-Use</a></li>
                <li><a href="#" class="text-white">Feedback</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="mr-2" viewBox="0 0 24 24" focusable="false"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            <strong>APCIS Video Uploader</strong>
          </a>
          <button class="navbar-toggler" @click="closeWindow($event)" type="button">
            <span class="navbar-toggler-close"> < Back to site</span>
          </button>
          <button class="navbar-toggler" @click="isShown = !isShown" type="button">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
  
  </header>
</template>

<script>
  export default {
    name: "my-header",
    data() {
      return {
        isShown: 0
      }
    },
    methods: {
      closeWindow(e) {
        window.close()
      }
    }
  };
</script>
 
<style scoped lang="scss">
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  

.list-enter { /* 1) перед вставкой элемента и удаляется */
  opacity: 0;
}
.list-enter-active {/* 1-2) Общее состояние 1-2 - для плавности, длительности или задержки */
  transition: all .8s ease;
}
.list-enter-to { /* 2) анимация добавления завершена */
  opacity: 1;
}

/* при УДАЛЕНИИ, применяются 3 класса: */
.list-leave { /* 1) начало анимации исчезновения эл-та */
  opacity: 1;
}
.list-leave-active {  /* 2) общее состояние исчезнования */
    transition: all .8s cubic-bezier(1, 0.5, 0.8, 1);
}
.list-leave-to {/* .list-leave-active до версии 2.1.8 
                  3) завершение анимации */
  opacity: 0;
  transform: translateY(-100px);
}


/*** A N I M A T I O N ***/

.v-enter-active, .v-leave-active {
  transition-property: opacity; /*выбор св эл,необходимого для изменения*/
  transition-duration: 0.8s;
  /*transition-timing-function - скорость перехода от 1 знач к другому
  transition-delay - задержка перед началом перехода*/
}
.v-enter, .v-leave-to { /*начало и конец-одинаковое*/
  opacity: 0;
}


.slide-enter-active {
   transition-duration: 0.3s;
   transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 100px;
  overflow: hidden;/*скрыть потраха(то,что внутри анимируемого дива), которые палятся при анимации!*/
}

.slide-enter, .slide-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>
