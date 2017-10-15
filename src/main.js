import "babel-polyfill";
import 'bulma/css/bulma.css'

import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import Notifications from 'vue-notification'

import App from './components/App.vue';
import TraktAuthorize from './components/TraktAuthorize.vue';
import TraktApp from './components/TraktApp.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Notifications)

const router = new VueRouter({
    mode: 'history',
    base: "/",
    routes: [
        {path: '/authorize', component: TraktAuthorize, props: true},
        {path: '/authorize/:code', component: TraktAuthorize, props: true},
        {name:'main_app' ,path: '/', component: TraktApp, props: true},
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
    router: router,
    store,
    data : {
        router: router,
    },
    render: h => h(App),
});
