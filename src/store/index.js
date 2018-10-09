import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      count: 2
    },
    mutations: {
      increment (state) {
        state.count++;
      }
    },
    access_token: 0,
    traktListsTab: 'trending',
    userListsTab: 'collection'  
})