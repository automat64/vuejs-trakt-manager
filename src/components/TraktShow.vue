<template>
    <div id="trakt-show">
        <div class="columns show-container">
            <list-menu ref="menu" v-bind:show="show"></list-menu>
            <a v-on:click="listMenu" class="button">
                <span class="icon is-small">
                  <i class="fa fa-bars"></i>
                </span>
            </a>
            <div class="column ">
                <img v-bind:src="photo">
            </div>
            <div class="column ">
            <div class="">{{ show.title }}</div>
            <div class="imdb-link"><a v-bind:href="imdb_link" target="_blank">IMDB</a> <a  v:if="show.trailer" v-bind:href="show.trailer" target="_blank">Trailer</a></div>
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
        props: ['show'],
        data: function () {
            return {
              photo:'',
              imdb_link:'#',
            };
        },
        created: function () {
            
        },
        mounted: function () {
            let that = this;
            this.imdb_link="http://www.imdb.com/title/"+this.show.ids.imdb+"/"; 
            services.axios_fanart({
                method: 'get',
                url: 'tv/'+this.show.ids.tvdb+'?api_key=3e53bdae664d5e570691c6c95becc11e&client_key=a90da1673943ed58d466f207e12668cd',
            }).then(function (response) {
                that.photo=response.data.hdtvlogo[0].url;
                console.log(response.data.hdtvlogo[0].url)
            })
            .catch(function (error) {
                console.log("tvbanner art not found for "+that.show.title);
            });
        },
        methods: {
            listMenu: function (e) {
                //let that = this;
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