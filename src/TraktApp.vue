<template>
    <div id="trakt-app">
        <div class="columns">
            <div class="column">
                <div class="box">
                    <div class="title has-text-centered">POPULAR</div>
                    <trakt-show
                        v-for="item in popularList"
                        v-bind:movie="item"
                        v-bind:key="item.ids.imdb">
                    </trakt-show>
                </div>
            </div>
            <div class="column">
                <div class="box">
                    <div class="title has-text-centered">TRENDING</div>
                    <trakt-show
                        v-for="item in trendingList"
                        v-bind:movie="item"
                        v-bind:key="item.ids.imdb">
                    </trakt-show>
                    </div>
                </div>
            <div class="column">
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
                        v-bind:movie="item"
                        v-bind:key="item.ids.imdb">
                    </trakt-show>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import services from "./services.js";
    import settings from "./settings.js";
    import TraktShow from './TraktShow.vue';

    export default {
        name: 'TraktApp',
        template: '#trakt-app-template',
        props: ['traktUrl'],
        data: function () {
            return {
                greeting: 'Welcome to your Vue.js app!',
                popularList: [
                ],
                trendingList: [
                ],
                searchResults: [],
                showInfo: [],
                searchString: '',
                searching: false,
            };
        },
        methods: {
            searchTrakt: function () {
                let that = this;
                if (this.searchString.length<3) {
                    this.searchResults = [];
                }
                else {
                    this.searching=true;
                    services.axios_trakt({
                        method: 'get',
                        url: 'search/show?query='+this.searchString,
                        data: {

                        }
                    }).then(function (response) {
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
            }
        }, 
        components: {
            TraktShow,
        },
        created: function () {
            let that = this;
            console.log("main template loaded");  
            let access_token = localStorage.getItem('access_token');
            let refresh_token = localStorage.getItem('refresh_token');
            if (!refresh_token) {
                that.$root.router.push("/authorize");
            }
            else {
                services.axios_trakt({
                  method: 'post',
                  url: 'oauth/token',
                  data: {
                        refresh_token: refresh_token,
                        client_id: settings.client_id,
                        client_secret: settings.client_secret,
                        redirect_uri: settings.redirect_uri,
                        grant_type: "refresh_token"

                  }
                }).then(function (response) {
                  console.log(response['data']);
                  localStorage.setItem('access_token', response['data']['access_token']);
                  localStorage.setItem('refresh_token', response['data']['refresh_token']);
                  
                })
                .catch(function (error) {
                  that.$root.router.push("/authorize");
                }); 
            }
            let q = this.$route.params.code;
            console.log(q);  

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
            });
        },
    }
</script>

<style lang="scss">
</style>