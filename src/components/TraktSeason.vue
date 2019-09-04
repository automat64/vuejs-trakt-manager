<template>
        <article class="message"  id="trakt-season">
            <div class="message-header">
                <p>
                    <a v-bind:href="'#collapsible-message-accordion-'+season.number" data-action="collapse">
                        Season {{season.number}} 
                    </a>
                </p>
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
            
            };
        },
        created: function () {
            let that = this;
            this.$root.trakt.history("seasons", that.season.ids.trakt).then(function (response) {
                //console.log(response);
                for (let item of response) {
                    console.log(that.season.episodes[1]);
                    that.season.episodes[1].watched="WATCHED1";
                    console.log(item.episode.ids.trakt);
                    that.$refs.watched[item.episode.ids.trakt].epWatched = YES ;
                    
                }
               // that.seasonData=response;
            }).catch(function (error) {
                console.log(error);
            });
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