import Vue from 'vue';
import Vuex from 'vuex';
import tabs from './modules/tabs';
import lists from './modules/lists'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
       
    },
    modules: {
        tabs,
        lists,
    },
    mutations: {
        
    },
   
})