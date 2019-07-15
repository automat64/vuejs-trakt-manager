//import "babel-polyfill";
import 'bulma/css/bulma.css'
import Vue from 'vue';
import VueRouter from 'vue-router';
import Notifications from 'vue-notification'
import vMediaQuery from 'v-media-query'
import VueAnalytics from 'vue-analytics'
import { VLazyImagePlugin } from "v-lazy-image"
import App from './components/App.vue';
import TraktAuthorize from './components/TraktAuthorize.vue';
import TraktApp from './components/TraktApp.vue';
import AppInit from './components/AppInit.vue';
import store from './store'
import Trakt from "./services/trakt.js";
import Fanart from "./services/fanart.js";

Vue.use(VueRouter);
Vue.use(Notifications)
Vue.use(vMediaQuery)
Vue.use(VLazyImagePlugin);

const router = new VueRouter({
    mode: 'history',
    base: "/",
    routes: [
        {path: '/authorize', component: TraktAuthorize, props: true},
        {path: '/authorize/:code', component: TraktAuthorize, props: true},
        {name:'main_app' ,path: '/shows', component: TraktApp, props: true},
        {name:'init' ,path: '/', component: AppInit, props: true},
    ]
});

const trakt = new Trakt();
const fanart = new Fanart();

Vue.use(VueAnalytics, {
    id: 'UA-113864962-1',
    router
})

new Vue({
    el: '#app',
    router,
    store,
    vMediaQuery,
    data : {
        router,
        trakt,
        fanart,
    },
    render: h => h(App),
});
