<template>
    <div id="trakt-progress-show" class="columns">
        <div class="progress-show column is-vcentered is-half has-text-centered">{{ this.show.show.title}}&nbsp;<strong>S{{this.season}}E{{this.episode}}</strong></div >
        <div class="progress-title column is-vcentered  has-text-centered">{{ this.show.next_episode.title}}</div >
    </div>
</template>

<script>

    export default {
        name: 'TraktProgressShow',
        props: ['show'],
        data: function () {
            return {
             
            };
        },
        computed: {

            season: function () {
                return (this.show.next_episode.season < 10 ? '0' : '') + this.show.next_episode.season;
            },
            episode () {
                return (this.show.next_episode.season < 10 ? '0' : '') + this.show.next_episode.number;
            }
        },
        created: function () {

            
        },
        mounted: function () {
            
        },
        methods: {
           
        },
        components: {
            
        },
    }
</script>

<style lang="scss">
#trakt-progress-show {
    border-bottom: 1px solid;
    .column {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: flex-start;
        flex-wrap : wrap;
        flex-direction: column;
        align-content: flex-start
    }
    .calendar-date {
        flex-direction: column;
    }
}
</style>