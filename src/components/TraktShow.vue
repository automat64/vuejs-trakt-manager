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
            <div class="imdb-link"><a v-bind:href="imdb_link" target="_blank">IMDB</a> <a v-bind:href="movie.trailer" target="_blank">Trailer</a></div>
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
            //alert(this.movie.title);  
            services.axios_fanart({
                method: 'get',
                url: 'tv/'+this.movie.ids.tvdb+'?api_key=3e53bdae664d5e570691c6c95becc11e&client_key=a90da1673943ed58d466f207e12668cd',
            }).then(function (response) {
                //console.log(response.data.tvbanner[0].url);
                that.photo=response.data.tvbanner[0].url;
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        methods: {
            listMenu: function (e) {
                //console.log(this.$$);
                this.$refs.menu.clickMenu(e);
                /*var viewportOffset = that.getBoundingClientRect();
                // these are relative to the viewport, i.e. the window
                var top = viewportOffset.top;
                var left = viewportOffset.left;*/
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