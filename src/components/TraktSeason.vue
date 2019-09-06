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
                        v-for="item in this.updSeason.episodes"
                        v-bind:episode="item"
                        v-bind:key="item.ids.trakt">
                    </trakt-episode>
                </div>
            </div>
        </article>
</template>

<script>
    import Vue from 'vue';
    import TraktEpisode from './TraktEpisode.vue';

    export default {
        name: 'TraktSeason',
        props: ['season'],
        data: function () {
            return {
                seasonWatched: "",
                updSeason:[],
            };
        },
        created: function () {
            let that = this;
            let episodeNumbers=[];
            this.$root.trakt.history("seasons", this.season.ids.trakt).then(function (response) {
                for (let item of response) {
                    if (episodeNumbers.indexOf(item.episode.ids.trakt)==-1) episodeNumbers.push(item.episode.ids.trakt);
                    let getEpisode = that.season.episodes.find(episode => episode.ids.trakt === item.episode.ids.trakt);
                    if (typeof(getEpisode)!='undefined') {
                        Vue.set(getEpisode, 'watched', true)
                    }  
                }
                that.updSeason=that.season;
                if (episodeNumbers.length==that.season.episodes.length) that.seasonWatched="WATCHED";
                that.$parent.attachCollapsibles();
            }).catch(function (error) {
                console.log(error);
            });
            
        },
        methods: {
           
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