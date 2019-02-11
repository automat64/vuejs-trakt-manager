<template>
    <div id="youtube-modal">
        <div class="is-active" v-bind:class="{modal : viewVideo }" v-if="viewVideo">
            <div class="modal-background" v-on:click="closeModal"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">{{show.title}}</p>
                <button v-on:click="closeModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="columns">
                        <div class="column is-full video-wrapper">
                            <iframe width="100%" height="" v-bind:src="this.embedUrl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </section>
            </div>
            </div>
    </div>
</template>

<script>

    export default {
        name: 'YoutubeModal',
        props: ['show'],
        data: function () {
            return {
                viewVideo: false
            }
        },
        methods: {
            openModal: function () {
                this.viewVideo = true;
            },
            closeModal: function () {
                this.viewVideo = false;
            }
        },
        computed: {
           embedUrl: function () {
               let videoId = this.show.trailer.split("=");
               return 'https://www.youtube.com/embed/'+videoId[1];
           }
        }
    }
</script>

<style lang="scss">
    #youtube-modal {
        .video-wrapper {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
        }
        .video-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>