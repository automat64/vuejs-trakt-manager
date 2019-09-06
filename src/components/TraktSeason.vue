<template>
        <article class="message"  id="trakt-season">
            <div class="message-header">
                <p>
                    <a v-bind:href="'#collapsible-message-accordion-'+season.number" data-action="collapse">
                        Season {{season.number}} 
                    </a>
                </p>
                <p>{{seasonWatched}}</p>
                
            </div>
            <div
                v-bind:id="'collapsible-message-accordion-'+season.number"
                class="message-body is-collapsible"
                data-parent="accordion_first"
            >
                <div class="message-body-content">
                    <trakt-episode
                        v-for="item in season.episodes"
                        v-bind:episode="item"
                        v-bind:key="item.ids.trakt">
                    </trakt-episode>
                </div>
            </div>
        </article>
</template>

<script>

    import TraktEpisode from './TraktEpisode.vue';

    export default {
        name: 'TraktSeason',
        props: ['season'],
        data: function () {
            return {
                seasonWatched: "",
            };
        },
        created: function () {
            let that = this;
            let episodeNumbers=[];
            this.$root.trakt.history("seasons", this.season.ids.trakt).then(function (response) {
                // console.log(that.season.episodes);
                // console.log(response);
                
                response.forEach(function (item, i) {
                    //console.log(item);
                    if (episodeNumbers.indexOf(item.episode.ids.trakt)==-1) episodeNumbers[item.episode.ids.trakt]=['watched'];
                });
                
               // that.seasonData=response;
            }).catch(function (error) {
                console.log(error);
            });
            console.log(episodeNumbers.length);
            console.log(that.season.episodes.length);
            if (episodeNumbers.length==this.season.episodes.length) this.seasonWatched="WATCHED";
        },
        methods: {
            // listMenu: function (e) {
            //     this.$refs.menu.clickMenu(e);
                
            // },
            // openModal: function (e) {
            //     this.$refs.details.openModal(e);
                
            // },
            // openVideo: function (e) {
            //     this.$refs.youtube.openModal(e);
                
            // }
        },
        components: {
            TraktEpisode
        },
    }
</script>

<style lang="scss">
    article, #accordion_first {
        width:100%;
    }
</style>