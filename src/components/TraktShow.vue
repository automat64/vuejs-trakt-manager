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
            this.imdb_link="http://www.imdb.com/title/"+this.show.ids.imdb+"/"; 
            services.axios_fanart({
                method: 'get',
                url: 'tv/'+this.show.ids.tvdb+'?api_key=3e53bdae664d5e570691c6c95becc11e&client_key=a90da1673943ed58d466f207e12668cd',
                retryCondition: (response) => {  // custom
                    debugger;
                    return axiosRetry.isNetworkError(response) || response.config.method === 'GET'
                },
            }).then(function (response) {
                that.photo=response.data.hdtvlogo[0].url;
                
                that.show.photo = that.photo;
                that.show.poster = response.data.tvposter[0].url;
                that.show.background = response.data.showbackground[0].url;
                //console.log("tvbanner art found for "+that.show.title);
            })
            .catch(function (error) {
                that.photo="/no-banner.png";
                that.show.photo = that.photo;
                //console.log("tvbanner art not found for "+that.show.title);
            });
        },
        mounted: function () {
            
        },
        methods: {
            listMenu: function (e) {
                //let that = this;
                this.$refs.menu.clickMenu(e);
                
            },
            showModal: function (e) {
                //let that = this;
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