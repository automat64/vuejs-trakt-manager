const state = {
    traktListsTab: 'trending',
    userListsTab: 'collection',
    currentPage: 'traktLists'
}

const mutations = {
    switchTraktListsTab (state, newTab) {
        state.traktListsTab=newTab;
    },
    switchUserListsTab (state, newTab) {
        state.userListsTab=newTab;
    },
    switchMobilePage (state, newPage) {
        state.currentPage = newPage;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}