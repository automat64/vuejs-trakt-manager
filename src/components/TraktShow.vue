<template>
    <div id="trakt-show">
        <div class="columns is-multiline is-mobile show-container">
            <list-menu ref="menu" v-bind:show="show"></list-menu>
            <show-details ref="details" v-bind:show="show"></show-details>
            <a v-on:click="listMenu" class="button">
                <span class="icon is-small">
                  <i class="fa fa-bars"></i>
                </span>
            </a>
            <div class="column is-half-widescreen is-four-fifths-tablet is-two-fifths-mobile">
                <a v-on:click="showModal"><img v-bind:src="photo"></a>
            </div>
            <div class="column is-half-widescreen is-full-tablet is-half-mobile">
            <div class=""><a v-on:click="showModal"><h5>{{ show.title }}</h5></a></div>
            <div class="imdb-link"><a v-bind:href="imdb_link" target="_blank">IMDB</a> <a  v:if="show.trailer" v-bind:href="show.trailer" target="_blank">Trailer</a></div>
            </div>
        </div>
    </div>
</template>

<script>

    import services from "../services.js";
    import settings from "../settings.js";
    import ListMenu from './ListMenu.vue';
    import ShowDetails from './ShowDetails.vue';

    import Fanart from "../services/fanart.js";

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
            let that = this;
            const fanart = new Fanart();
            this.imdb_link="http://www.imdb.com/title/"+this.show.ids.imdb+"/"; 
            fanart.query(this.show.ids.tvdb).then(function (response) {
                if (response.data) {
                    that.photo=response.data.hdtvlogo[0].url;
                    that.show.photo = that.photo;
                    if (response.data.tvposter) that.show.poster = response.data.tvposter[0].url;
                    if (response.data.showbackground) that.show.background = response.data.showbackground[0].url;
                }
            }).catch(function (error) {
                that.photo="/no-banner.png";
                that.show.photo = that.photo;
            });
        },
        mounted: function () {
            
        },
        methods: {
            listMenu: function (e) {
                this.$refs.menu.clickMenu(e);
                
            },
            showModal: function (e) {
                this.$refs.details.showModal(e);
                
            },
        },
        components: {
            ListMenu, ShowDetails
        },
    }
</script>

<style lang="scss">
#trakt-show {
    display:flex;
    flex-shrink: 0;
    .show-container {
        position: relative;
        h5 {
            color:#222;
        }
        .button {
            position: absolute;
            right:0;
            top:0;
            border: none;
            background: transparent;
        }
        .imdb-link a:first-of-type {
            margin-right: 10px;
        }
    }
}
</style>