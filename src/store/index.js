import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      count: 2,
      traktListsTab: 'trending',
      userListsTab: 'collection'  
    },
    mutations: {
      increment (state) {
        state.count++;
      },
      switchTraktListsTab (state, newTab) {
        state.traktListsTab=newTab;
      },
      switchUserListsTab (state, newTab) {
        state.userListsTab=newTab;
      }
    },
   
})