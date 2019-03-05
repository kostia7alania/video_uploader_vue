import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [{
            name: 'Home',
            path: "/",
            ///component: () => import("@/views/uploaded"),
        },
        {
            name: "uploaded",
            path: "/uploaded",
            component: () => import("@/components/uploaded/UploadedVideos")
        }
    ]
});