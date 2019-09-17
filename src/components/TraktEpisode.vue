<template>
        <div class="episode"  id="trakt-episode">
            <div class="message-body-content columns ">
                <div class="column is-two-thirds">{{episode.title}}</div>
                <div class="column is-one-third" v-if="epWatched==true">WATCHED</div>
                <div class="column is-one-third" v-if="epWatched!=true">
                    <a v-on:click="markWatched" class="button mark-watched" title="Mark as watched">
                        <span class="icon is-small">
                            <i class="fas fa-eye"></i>
                        </span>
                        
                        <p>Mark as watched</p>
                        
                    </a>
                </div>
                
            </div>
        </div>

</template>

<script>
    import markAsWatched from "../mixins/MarkAsWatched.js";
    export default {
        name: 'TraktEpisode',
        props: ['episode'],
        mixins: [markAsWatched],
        data: function () {
            return {
                epWatched:this.episode.watched
            };
        },
        mounted: function () {
            
        },
        watch: {
            'episode': function (val, oldVal) {
                console.log("ep changed");
                console.log(val);
                if (val.watched) this.epWatched="YES";
            },
        },
        methods: {
            async markWatched() {
                console.log("watch "+this.$parent.show.ids.trakt);
                console.log("watch "+this.episode.season);
                console.log("watch "+this.episode.number);
                let that = this;
            
                this.scrobble(this.$parent.show.ids.trakt,this.episode.season, this.episode.number)
                .then(function (response) {
                    that.$emit('watched', that.$parent.show.ids.trakt)
                    that.$notify({
                        group: 'notifications',
                        type: 'success',
                        title: 'Marked as watched',
                    });
                    that.epWatched=true;
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
        
    }
</script>

<style lang="scss">
    #trakt-episode {
        .columns{
            margin-left:0;
            margin-right:0;
        }
    }
</style>