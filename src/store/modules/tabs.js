const state = {
    traktListsTab: 'trending',
    userListsTab: 'collection'  
}

const mutations = {
    switchTraktListsTab (state, newTab) {
        state.traktListsTab=newTab;
    },
    switchUserListsTab (state, newTab) {
        state.userListsTab=newTab;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}