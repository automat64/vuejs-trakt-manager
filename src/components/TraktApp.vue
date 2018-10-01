<template>
    <div id="trakt-app">
        <notifications group="notifications" />
        <div class="columns">
            <div class="column list-column">
                <div class="tabs is-centered is-boxed">
                    <ul>
                        <li :class="{'is-active' : traktListsTab == 'trending' }">
                            <a v-on:click="switchTraktListTab('trending')">
                                <span>Trending</span>
                            </a>
                        </li>
                        <li :class="{'is-active' : traktListsTab == 'popular' }">
                            <a v-on:click="switchTraktListTab('popular')">
                                <span>Popular</span>
                            </a>
                        </li>
                        <li :class="{'is-active' : traktListsTab == 'recommended' }">
                            <a v-on:click="switchTraktListTab('recommended')">
                                <span>Recommended</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="trending" :class="{'hidden' : traktListsTab != 'trending' }">
                    <div class="box">
                        <div class="title has-text-centered">TRENDING</div>
                        <trakt-show  v-on:event_child="eventChild" 
                            v-for="item in trendingList"
                            v-bind:show="item"
                            v-bind:key="item.ids.imdb">
                        </trakt-show>
                    </div>
                </div>
                <div class="popular" :class="{'hidden' : traktListsTab != 'popular' }">
                    <div class="box">
                        <div class="title has-text-centered">POPULAR</div>
                        <trakt-show  v-on:event_child="eventChild" 
                            v-for="item in popularList"
                            v-bind:show="item"
                            v-bind:key="item.ids.imdb">
                        </trakt-show>
                    </div>
                </div>
                <div class="recommended" :class="{'hidden' : traktListsTab != 'recommended' }">
                    <div class="box">
                        <div class="title has-text-centered">RECOMMENDED</div>
                        <trakt-show  v-on:event_child="eventChild" 
                            v-for="item in recommendedList"
                            v-bind:show="item" 
                            v-bind:key="item.ids.imdb">
                        </trakt-show>
                    </div>
                </div>
                
            </div>
            <div class="column list-column">
                <div class="tabs is-centered is-boxed">
                    <ul>
                        <li :class="{'is-active' : userListsTab == 'collection' }">
                            <a v-on:click="switchUserListTab('collection')">
                                <span>Collection</span>
                            </a>
                        </li>
                        <li :class="{'is-active' : userListsTab == 'watchlist' }">
                            <a v-on:click="switchUserListTab('watchlist')">
                                <span>Watchlist</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="collection" :class="{'hidden' : userListsTab != 'collection' }">
                    <div class="box">
                        <div class="title has-text-centered">COLLECTION</div>
                        <trakt-show
                            v-for="item in collectionList"
                            v-bind:show="item"
                            v-bind:key="item.ids.imdb">
                        </trakt-show>
                    </div>
                </div>
                <div class="watchlist" :class="{'hidden' : userListsTab != 'watchlist' }">
                    <div class="box">
                        <div class="title has-text-centered">WATCHLIST</div>
                        <trakt-show
                            v-for="item in watchList"
                            v-bind:show="item"
                            v-bind:key="item.ids.imdb">
                        </trakt-show>
                    </div>
                </div>
            </div>
            <div class="column list-column">
                <div class="tile is-ancestor">
                    <div class="tile is-12 is-vertical is-parent">
                        <div class="tile is-child box">
                            <p class="title">Upcoming shows</p>
                            <trakt-calendar-show 
                                v-for="item in calendarList"
                                v-bind:show="item"
                                v-bind:key="item.ids.imdb">
                            </trakt-calendar-show>
                        </div>
                        <div class="tile is-child box">
                        <p class="title">Progress</p>
                        <p>soon</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column list-column">
                <div class="box">
                    <trakt-user v-bind:access_token="access_token"></trakt-user>
                </div>
                <div class="field has-addons">
                    <p class="control is-expanded has-icons-left has-icons-right">
                        <input class="input" v-model="searchString" v-on:keyup.enter="searchTrakt" placeholder="Enter text">
                        <span class="icon is-left">
                            <i class="fa fa-search"></i>
                        </span>
                        <span v-if="searching" class="icon is-right">
                            <i class="fa fa-hourglass"></i>
                        </span>
                    </p>
                    <p class="control">
                        <a class="button is-info" v-on:click="searchTrakt">Search</a>
                    </p>
                </div>
                <div class="box">
                    <div class="title has-text-centered">RESULTS</div>
                    <trakt-show
                        v-for="item in searchResults"
                        v-bind:show="item"
                        v-bind:key="item.ids.imdb">
                    </trakt-show>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import services from "../services.js";
    import TraktShow from './TraktShow.vue';
    import TraktUser from './TraktUser.vue';
    import TraktCalendarShow from './TraktCalendarShow.vue';
    import { page } from 'vue-analytics';
    export default {
        name: 'TraktApp',
        template: '#trakt-app-template',
        props: ['traktUrl'],
        data: function () {
            return {
                access_token: 0,
                greeting: 'Welcome to your Vue.js app!',
                popularList: [
                ],
                trendingList: [
                ],
                recommendedList: [
                ],
                collectionList: [
                ],
                watchList: [
                ],
                progressList: [
                ],
                calendarList: [
                ],
                searchResults: [],
                showInfo: [],
                searchString: '',
                searching: false,
                traktListsTab: 'trending',
                userListsTab: 'collection'
            };
        },
        methods: {
            switchTraktListTab (tabname) {
                if (this.traktListsTab!=tabname) {
                    console.log("switching tab to "+tabname);
                    this.traktListsTab = tabname;
                }
            },
            switchUserListTab (tabname) {
                if (this.userListsTab!=tabname) {
                    console.log("switching tab to "+tabname);
                    this.userListsTab = tabname;
                }
            },
            track () {
                this.$ga.page('/shows')
            },
            initApp: function () {
                this.$root.router.push("/");
            },
            searchTrakt: function () {
                let that = this;


                if (this.searchString.length<3) {
                    this.searchResults = [];
                }
                else {
                    this.searching=true;
                    services.axios_trakt({
                        method: 'get',
                        url: 'search/show?extended=full&query='+this.searchString+"",
                        data: {

                        }
                    })
                    .then(function (response) {
                        let list = [];

                        for (let item of response.data) {
                            list.push(item.show);
                        }
                        
                        that.searchResults=list;
                        that.searching=false;

                    })
                    .catch(function (error) {
                        console.log(error);
                        that.searching=false;
                    });
                }
            },
            eventChild: function(id) {
                console.log('Event from new child component emitted', id)
            },
        }, 
        components: {
            TraktShow, TraktUser, TraktCalendarShow
        },
        mounted: function () {
            
            let that = this;
            console.log("main template loaded");  
            this.access_token = localStorage.getItem('refresh_token'),
            services.axios_trakt({
                method: 'get',
                url: 'shows/popular?extended=full',
                data: {

                }
            }).then(function (response) {
                that.popularList=response.data;
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });

            services.axios_trakt({
                method: 'get',
                url: 'shows/trending?extended=full',
                data: {

                }
            }).then(function (response) {
                let list = [];

                for (let item of response.data) {
                    list.push(item.show);
                }
                that.trendingList=list;
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });

            services.axios_trakt({
                method: 'get',
                url: 'shows/popular?extended=full',
                data: {

                }
            }).then(function (response) {
                let list = [];

                for (let item of response.data) {
                    list.push(item.show);
                }
                that.popularList=response.data;
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });

            services.axios_trakt({
                method: 'get',
                url: 'users/me/collection/shows?extended=full',
                data: {
                    token: this.access_token,
                }
            }).then(function (response) {
                let list = [];

                for (let item of response.data) {
                    list.push(item.show);
                }
                that.collectionList=list;
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });

            services.axios_trakt({
                method: 'get',
                url: 'users/me/watchlist/shows?extended=full',
                data: {
                    token: this.access_token,
                }
            }).then(function (response) {
                let list = [];

                for (let item of response.data) {
                    list.push(item.show);
                }
                that.watchList=list;
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });

            services.axios_trakt({
                method: 'get',
                url: 'recommendations/shows?extended=full',
                data: {
                    token: this.access_token,
                }
            }).then(function (response) {
                let list = [];

                // for (let item of response.data) {
                //     list.push(item.show);
                // }
                //that.popularList=list;
                that.recommendedList=response.data;
            })
            .catch(function (error) {
                console.log(error);
                //that.initApp();
            });

            services.axios_trakt({
                method: 'get',
                url: 'calendars/my/shows/',
                data: {
                    token: this.access_token,
                }
            }).then(function (response) {
                let list = [];

                for (let item of response.data) {
                    let episode = item['episode'];
                    episode['aired']=item['first_aired'];
                    episode['show']=item['show'];
                    list.push(episode);
                }
                that.calendarList=list;
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });
    
        },
    }
</script>

<style lang="scss">
    .list-column {
        max-height: 100vh;
        overflow-y: auto;
    }
    .hidden {
        display:none;
    }
    .vue-notification {
        font-size: 18px;
    }
</style>