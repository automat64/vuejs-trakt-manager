//import "babel-polyfill";
import 'bulma/css/bulma.css'

import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import Notifications from 'vue-notification'

import App from './components/App.vue';
import TraktAuthorize from './components/TraktAuthorize.vue';
import TraktApp from './components/TraktApp.vue';
import AppInit from './components/AppInit.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Notifications)

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
const store = new Vuex.Store({
    state: {
      count: 2
    },
    mutations: {
      increment (state) {
        state.count++;
      }
    }
  })

new Vue({
    el: '#app',
    router,
    store,
    data : {
        router,
    },
    render: h => h(App),
});
