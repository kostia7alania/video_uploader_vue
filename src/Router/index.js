import Vue from "vue";
import Router from "vue-router";

//import a from '@/components/uploaded/UploadedVideos'

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "Home",
      path: "/",
      component: () => import("@/Views/Upload")
    },
    {
      name: "uploaded",
      path: "/uploaded",
      // a//,
      component: () => import("@/Views/Uploaded")
    }
  ]
});

/*
|  Building for production...
  When setting `useBuiltIns: 'usage'`, polyfills are automatically imported when needed.
  Please remove the `import '@babel/polyfill'` call or use `useBuiltIns: 'entry'` instead.
\  Building for production...*/
