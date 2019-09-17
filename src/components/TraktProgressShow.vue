<template>
    <div id="trakt-progress-show" class="columns is-multiline">
        <div class="progress-show column is-vcentered   has-text-centered">{{ this.show.show.title}}&nbsp;<strong>S{{this.season}}E{{this.episode}}</strong></div >
        <div class="progress-title column is-vcentered   has-text-centered">{{ this.show.next_episode.title}}</div >
        <div class="column is-narrow is-vcentered has-text-centered">
            <a v-on:click="markWatched" class="button mark-watched" title="Mark as watched">
                <span class="icon is-small">
                    <i class="fas fa-eye"></i>
                </span>
                
                <p>Mark watched</p>
                
            </a>
        </div>
    </div>
</template>

<script>
    import markAsWatched from "../mixins/MarkAsWatched.js";
    export default {
        name: 'TraktProgressShow',
        props: ['show'],
        mixins: [markAsWatched],
        data: function () {
            return {
                
            };
        },
        computed: {

            season: function () {
                return (this.show.next_episode.season < 10 ? '0' : '') + this.show.next_episode.season;
            },
            episode () {
                return (this.show.next_episode.number < 10 ? '0' : '') + this.show.next_episode.number;
            }
        },
        created: function () {

        },
        mounted: function () {
            
        },
        methods: {
            async markWatched() {
                console.log("watch "+this.show.show.ids.trakt);
                let that = this;
            
                this.scrobble(this.show.show.ids.trakt,this.show.next_episode.season, this.show.next_episode.number)
                .then(function (response) {
                    that.$emit('watched', that.show.show.ids.trakt)
                    that.$notify({
                        group: 'notifications',
                        type: 'success',
                        title: 'Marked as watched',
                    });
                })
                .catch(function (error) {
                    that.$notify({
                        group: 'notifications',
                        type: 'error',
                        title: 'Scrobble error',  
                    });
                });

            }
        },
        components: {
            
        },
    }
</script>

<style lang="scss">
#trakt-progress-show {
    border-bottom: 1px solid;
    .mark-watched p {
        font-size: 11px;
    }
    .column {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        flex-wrap : wrap;
        flex-direction: column;
    }
    .calendar-date {
        flex-direction: column;
    }
}
</style>