<template>
        <div class="episode"  id="trakt-episode">
            <div class="message-body-content">
                <p>{{episode.title}}</p>
                <!-- <p ref="watched">{{epWatched}}</p>
                <p>{{episode.watched}}</p> -->
            </div>
        </div>

</template>

<script>

    export default {
        name: 'TraktEpisode',
        props: ['episode'],
        data: function () {
            return {
               epWatched:"NO"
            };
        },
        mounted: function () {
            
        },
        watch: {
            'episode': function (val, oldVal) {
                if (val.watched==true) this.epWatched=true;
            },
        },
        methods: {
            // showAsWatched: function () {
            //     this.epWatched=YES;
            // }
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
        
    }
</script>

<style lang="scss">

</style>