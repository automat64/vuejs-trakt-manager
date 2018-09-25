<template>
    <div id="show-details">
        <div class="is-active" v-bind:class="{modal : viewDetails }" v-if="viewDetails">
            <div class="modal-background" v-on:click="closeModal" v-bind:style="cssProps"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">{{show.title}}</p>
                <button v-on:click="closeModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="show-overview">{{show.overview}}</div>
                    <img v-bind:src="show.poster">
                    <div class="show-details">
                        <p>Genres: {{show.genres}}</p>
                        <p>Certification: {{show.certification}}</p>
                        <p>Network: {{show.network}}</p>
                        <p>Runtime: {{show.runtime}}</p>
                        <p>Aired Episodes: {{show.aired_episodes}}</p>
                        <p>Status: {{show.status}}</p>
                    </div>
                </section>
            </div>
            </div>
    </div>
</template>

<script>

    export default {
        name: 'ShowDetails',
        props: ['show','photo'],
        data: function () {
            return {
                viewDetails: false,
            }
        },
        methods: {
            showModal: function () {
                console.log("show me");
                this.viewDetails = true;
            },
            closeModal: function () {
                console.log("hide me");
                this.viewDetails = false;
            }
        },
        computed: {
            cssProps() { return {
                'background-image': 'url('+ this.show.background +')',
                'background-size': 'cover',
                'opacity' :'0.8'
            }
        }
	}
        
    }
</script>

<style lang="scss">
    
</style>