import Vue from 'vue';
import Vuex from 'vuex';
import tabs from './modules/tabs'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      count: 2
    },
    modules: {
      tabs
    },
    mutations: {
      increment (state) {
        state.count++;
      }
    },
   
})