<template>
    <div id="trakt-show">
        <div class="columns show-container">
            <list-menu ref="menu" v-bind:movie="movie"></list-menu>
            <a v-on:click="listMenu" class="button">
                <span class="icon is-small">
                  <i class="fa fa-bars"></i>
                </span>
            </a>
            <div class="column ">
                <img v-bind:src="photo">
            </div>
            <div class="column ">
            <div class="">{{ movie.title }}</div>
            <div class="imdb-link"><a v-bind:href="imdb_link" target="_blank">IMDB</a> <a  v:if="movie.trailer" v-bind:href="movie.trailer" target="_blank">Trailer</a></div>
            </div>
        </div>
    </div>
</template>

<script>

    import services from "../services.js";
    import settings from "../settings.js";
    import ListMenu from './ListMenu.vue';

    export default {
        name: 'TraktShow',
        props: ['movie'],
        data: function () {
            return {
              photo:'',
              imdb_link:'#',
            };
        },
        mounted: function () {
            var that = this;
            this.imdb_link="http://www.imdb.com/title/"+this.movie.ids.imdb+"/"; 
            services.axios_fanart({
                method: 'get',
                url: 'tv/'+this.movie.ids.tvdb+'?api_key=3e53bdae664d5e570691c6c95becc11e&client_key=a90da1673943ed58d466f207e12668cd',
            }).then(function (response) {
                that.photo=response.data.tvbanner[0].url;
            })
            .catch(function (error) {
                console.log("tvbanner art not found for "+that.movie.title);
            });
        },
        methods: {
            listMenu: function (e) {
                this.$refs.menu.clickMenu(e);
            },
        },
        components: {
            ListMenu
        },
    }
</script>

<style lang="scss">
    .show-container {
        position: relative;
        .button {
            position: absolute;
            right:0;
            top:0;
            border: none;
            background: transparent;
        }
    }
</style>