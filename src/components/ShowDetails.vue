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
                    <div class="tabs is-centered">
                        <ul>
                            <li :class="{'is-active' : this.showTab == 'about' }"><a v-on:click="switchShowTab('about')">About</a></li>
                            <li :class="{'is-active' : this.showTab == 'episodes' }"><a v-on:click="switchShowTab('episodes')">Episodes</a></li>
                        </ul>
                    </div>
                    <div class="columns show-content about-content" :class="{'hidden' : this.showTab != 'about' }">
                        <div class="column is-half">
                            <img v-bind:src="show.poster">
                        </div>
                        <div class="column is-half">
                            <div class="show-overview">{{show.overview}}</div>
                            <br>
                            <div class="show-details">
                                <p>Genres: {{ readableGenres() }}</p>
                                <p>Certification: {{show.certification}}</p>
                                <p>Network: {{show.network}}</p>
                                <p>Runtime: {{show.runtime}}</p>
                                <p>Aired Episodes: {{show.aired_episodes}}</p>
                                <p>Status: {{show.status}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="columns episodes-content" :class="{'hidden' : this.showTab != 'episodes' }">
                        SEASONS
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
                showTab: 'about',
            }
        },
        methods: {
            switchShowTab (tabname) {
                if (this.showTab!=tabname) {
                    console.log("switching tab to "+tabname);
                    this.showTab = tabname;
                }
            },
            readableGenres: function () {
                return this.show.genres.join(", ");
            },
            openModal: function () {
                this.viewDetails = true;
            },
            closeModal: function () {
                this.viewDetails = false;
            }
        },
        computed: {
            cssProps() { 
                return {
                    'background-image': 'url('+ this.show.background +')',
                    'background-size': 'cover',
                    'opacity' :'1'
                }
            }
        }
    }
</script>

<style lang="scss">
    .hidden {
        display:none;
    }
</style>