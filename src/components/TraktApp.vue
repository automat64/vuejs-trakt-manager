<template>
    <div id="trakt-app">
        <notifications group="notifications" />
        <nav class="navbar  is-transparent" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a v-on:click="toggleMenu" role="button" class="navbar-burger burger" v-bind:class="{ 'is-active' : navMenu  }" aria-label="menu" aria-expanded="{navMenu}" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{ 'is-active' : navMenu  }">
            <div class="navbar-start">
                <a class="navbar-item" v-on:click="switchMobilePage('traktLists')">
                    Trakt Lists
                </a>
                <a class="navbar-item" v-on:click="switchMobilePage('userLists')">
                    User Lists
                </a>
                <a class="navbar-item" v-on:click="switchMobilePage('otherLists')">
                    Calendar / Progression
                </a>
                <a class="navbar-item" v-on:click="switchMobilePage('search')">
                    Search / Account
                </a>
            </div>

        </div>
        </nav>
        <div class="columns" v-bind:class="{ 'has-menu' : navMenu  }">
            <div class="column list-column" v-if="viewMode == 'desktop' || (viewMode == 'mobile' && this.$store.state.tabs.currentPage=='traktLists')">
                <div class="tabs is-centered is-boxed">
                    <ul>
                        <li :class="{'is-active' : this.$store.state.tabs.traktListsTab == 'trending' }">
                            <a v-on:click="switchTraktListTab('trending')">
                                <span>Trending</span>
                            </a>
                        </li>
                        <li :class="{'is-active' : this.$store.state.tabs.traktListsTab == 'popular' }">
                            <a v-on:click="switchTraktListTab('popular')">
                                <span>Popular</span>
                            </a>
                        </li>
                        <li :class="{'is-active' : this.$store.state.tabs.traktListsTab == 'recommended' }">
                            <a v-on:click="switchTraktListTab('recommended')">
                                <span>Recommended</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="trending" :class="{'hidden' : this.$store.state.tabs.traktListsTab != 'trending' }">
                    <div class="box">
                        <div class="title has-text-centered">TRENDING</div>
                        <trakt-show 
                            v-for="item in this.$store.state.lists.traktLists['trendingList']"
                            v-bind:show="item"
                            v-bind:key="item.ids.imdb">
                        </trakt-show>
                    </div>
                </div>
                <div class="popular" :class="{'hidden' : this.$store.state.tabs.traktListsTab != 'popular' }">
                    <div class="box">
                        <div class="title has-text-centered">POPULAR</div>
                        <trakt-show 
                            v-for="item in this.$store.state.lists.traktLists['popularList']"
                            v-bind:show="item"
                            v-bind:key="item.ids.imdb">
                        </trakt-show>
                    </div>
                </div>
                <div class="recommended" :class="{'hidden' : this.$store.state.tabs.traktListsTab != 'recommended' }">
                    <div class="box">
                        <div class="title has-text-centered">RECOMMENDED</div>
                        <trakt-show 
                            v-for="item in this.$store.state.lists.traktLists['recommendedList']"
                            v-bind:show="item" 
                            v-bind:key="item.ids.imdb">
                        </trakt-show>
                    </div>
                </div>
                
            </div>
            <div class="column list-column" v-if="viewMode == 'desktop' || (viewMode == 'mobile' && this.$store.state.tabs.currentPage=='userLists')">
                <div class="tabs is-centered is-boxed">
                    <ul>
                        <li :class="{'is-active' : this.$store.state.tabs.userListsTab == 'collection' }">
                            <a v-on:click="switchUserListTab('collection')">
                                <span>Collection</span>
                            </a>
                        </li>
                        <li :class="{'is-active' : this.$store.state.tabs.userListsTab == 'watchlist' }">
                            <a v-on:click="switchUserListTab('watchlist')">
                                <span>Watchlist</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="collection" :class="{'hidden' : this.$store.state.tabs.userListsTab != 'collection' }">
                    <div class="box">
                        <div class="title has-text-centered">COLLECTION</div>
                        <trakt-show
                            v-for="item in this.$store.state.lists.traktLists['collectionList']"
                            v-bind:show="item"
                            v-bind:key="item.ids.imdb">
                        </trakt-show>
                    </div>
                </div>
                <div class="watchlist" :class="{'hidden' : this.$store.state.tabs.userListsTab != 'watchlist' }">
                    <div class="box">
                        <div class="title has-text-centered">WATCHLIST</div>
                        <trakt-show
                            v-for="item in this.$store.state.lists.traktLists['watchList']"
                            v-bind:show="item"
                            v-bind:key="item.ids.imdb">
                        </trakt-show>
                    </div>
                </div>
            </div>
            <div class="column list-column" v-if="viewMode == 'desktop' || (viewMode == 'mobile' && this.$store.state.tabs.currentPage=='otherLists')">
                <div class="tile is-ancestor ">
 
                    <div class="tile is-parent is-vertical my-tiles">
                        <div class="tile is-child box">
                            <p class="title has-text-centered">CALENDAR</p>
                            <trakt-calendar-show 
                                v-for="item in calendarList"
                                v-bind:show="item"
                                v-bind:key="item.ids.trakt">
                            </trakt-calendar-show>
                        </div>
                        <div class="tile is-child box">
                            <p class="title has-text-centered">PROGRESS</p>
                            <trakt-progress-show 
                                v-for="item in progressList"
                                v-bind:show="item"
                                v-bind:key="item.next_episode.ids.trakt" 
                                v-on:watched="onWatched()">
                            </trakt-progress-show>
                        </div>
                    </div>

                </div>
            </div>
            <div class="column list-column" v-if="viewMode == 'desktop' || (viewMode == 'mobile' && this.$store.state.tabs.currentPage=='search')">
                <div class="box">
                    <trakt-user></trakt-user>
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

    import TraktShow from './TraktShow.vue';
    import TraktUser from './TraktUser.vue';
    import TraktCalendarShow from './TraktCalendarShow.vue';
    import TraktProgressShow from './TraktProgressShow.vue';
    //import { page } from 'vue-analytics';

    export default {
        name: 'TraktApp',
        template: '#trakt-app-template',
        props: ['traktUrl'],
        data: function () {
            return {
                progressList: [
                ],
                calendarList: [
                ],
                searchResults: [],
                showInfo: [],
                searchString: '',
                searching: false,
                viewMode: 'desktop',
                hasMenu: false,
                navMenu: false,
            };
        },
        watch: {
            '$mq.resize': 'sreenRes'
        },
        methods: {
            onWatched () {
                this.getProgress();
            },
            sreenRes () {
                if (this.$mq.above(768)) {
                    this.viewMode="desktop";
                    this.hasMenu=false;
                    console.log("desktop mode");
                }
                else {
                    console.log("mobile mode");
                    this.viewMode="mobile";
                    this.hasMenu=true;
                }
            },
            toggleMenu () {
                this.navMenu = !this.navMenu;
            },
            switchMobilePage (pagename) {
                if (this.$store.state.tabs.currentPage!=pagename) {
                    console.log("switching page to "+pagename);
                    this.$store.commit('tabs/switchMobilePage', pagename);
                }
                this.navMenu = false;
            },
            switchTraktListTab (tabname) {
                if (this.$store.state.tabs.traktListsTab!=tabname) {
                    console.log("switching tab to "+tabname);
                    this.$store.commit('tabs/switchTraktListsTab', tabname);
                }
            },
            switchUserListTab (tabname) {
                 if (this.$store.state.tabs.userListsTab!=tabname) {
                    console.log("switching tab to "+tabname);
                    this.$store.commit('tabs/switchUserListsTab', tabname);
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
                    this.$root.trakt.search(this.searchString).then(function(response) {
                        that.searchResults=response;
                        that.searching=false;
                    })
                    .catch(function () {
                        that.searching=false;
                    });
                }
            },
            getCalendar: function() {
                let that = this;
                
                this.$root.trakt.getCalendar().then(function (response) {
                    let list = [];
                    for (let item of response.data) {
                        let episode = item['episode'];
                        episode['aired']=item['first_aired'];
                        episode['show']=item['show'];
                        list.push(episode);
                    }
                    that.calendarList=list;
                    console.log("calendar list updated");
                })
                .catch(function () {
                    that.searching=false;
                });
            },
            getProgress: function () {
                let that = this;

                this.$root.trakt.sync().then( function (response) {
                    let list = [];
                    var i = 0;
                    for (i=0;i<10;i++) {
                        let show = response.data[i].show;
                    
                        that.$root.trakt.progress(show).then(function (response) {
                            if (response) {
                                let next_episode=response.data.next_episode;
                                if (next_episode) {
                                    let progress_item = {
                                        show,
                                        next_episode
                                    }
                                    list.push(progress_item);
                                }
                            }
                            else {
                                //nothing
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    }
                    that.progressList=list;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }, 
        components: {
            TraktShow, TraktUser, TraktCalendarShow, TraktProgressShow
        },
        created: function () {
            this.sreenRes();
            let that = this;
            this.$store.watch(
                function (state) {
                    return state.lists.traktLists['watchList'];
                    
                },
                function () {
                    console.log("list changed");
                    that.getCalendar();
                    that.getProgress();
                },
                {
                    deep: false
                }
            );
            this.$store.watch(
                function (state) {
                    return state.lists.traktLists['collectionList'];
                    
                },
                function () {
                    console.log("list changed");
                    that.getCalendar();
                    that.getProgress();
                },
                {
                    deep: false
                }
            );

        },
        mounted: function () {
            
            console.log("main template loaded");  
            let that = this;
            
            this.$root.trakt.traktList('trending').then( function (response) {
                that.$store.commit('lists/updateList',['trendingList',response]);
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });

            this.$root.trakt.traktList('popular').then( function (response) {
                that.$store.commit('lists/updateList',['popularList',response]);
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });

            this.$root.trakt.userList('collection').then( function (response) {
                that.$store.commit('lists/updateList',['collectionList',response]);
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });

            this.$root.trakt.userList('watchlist').then( function (response) {
                that.$store.commit('lists/updateList',['watchList',response]);
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });

            this.$root.trakt.recommendations().then( function (response) {
                that.$store.commit('lists/updateList',['recommendedList',response.data]);
            })
            .catch(function (error) {
                console.log(error);
                that.initApp();
            });
        },
    }
</script>

<style lang="scss">
    @media screen and (min-width: 768px) {
        .navbar-burger {
            display: none;
        }
        .navbar-menu, nav {
            display: none !important;
        }
    }

    .list-column {
        max-height: 100vh;
        overflow-y: auto;
    }
    .columns.has-menu .list-column {
        max-height: 90vh;
    }
    .hidden {
        display:none;
    }
    .vue-notification {
        font-size: 18px;
    }
    .my-tiles {
        .is-child {
            overflow-y: scroll;
            min-height: 47.5vh;
        }
    }
</style>