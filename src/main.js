//import "babel-polyfill";
import 'bulma/css/bulma.css'
import Vue from 'vue';
import VueRouter from 'vue-router';
import Notifications from 'vue-notification'
import vMediaQuery from 'v-media-query'
import App from './components/App.vue';
import store from './store'
import TraktAuthorize from './components/TraktAuthorize.vue';
import TraktApp from './components/TraktApp.vue';
import AppInit from './components/AppInit.vue';
import VueAnalytics from 'vue-analytics'

Vue.use(VueRouter);
Vue.use(Notifications)
Vue.use(vMediaQuery)

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
    },
    render: h => h(App),
});
