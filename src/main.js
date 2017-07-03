import "babel-polyfill";
import 'bulma/css/bulma.css'

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import TraktAuthorize from './TraktAuthorize.vue';
import TraktApp from './TraktApp.vue';

const router = new VueRouter({
    mode: 'history',
    base: "/",
    routes: [
        {path: '/authorize', component: TraktAuthorize, props: true},
        {path: '/authorize/:code', component: TraktAuthorize, props: true},
        {name:'main_app' ,path: '/', component: TraktApp, props: true},
    ]
});

Vue.use(VueRouter);
new Vue({
    el: '#app',
    router: router,
    data : {
        router: router,
    },
    render: h => h(App),
});
