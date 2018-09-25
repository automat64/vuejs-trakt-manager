<template>
    <ul id="right-click-menu" tabindex="-1"  v-if="viewMenu" v-on:blur="closeMenu"  v-bind:style="{top:top, left:left}">
        <li><a v-on:click="addToWatchlist">Add to Watchlist</a></li>
        <li><a v-on:click="removeFromWatchlist">Remove from Watchlist</a></li>
        <li><a v-on:click="addToCollection">Add to Collection</a></li>
        <li><a v-on:click="removeFromCollection">Remove from Collection</a></li>
    </ul>
</template>

<script>

    import services from "../services.js";
    import settings from "../settings.js";
    import Vue from "vue";
    export default {
        name: 'ListMenu',
        props: ['show'],
        data: function () {
            return {
                viewMenu: false,
                top: '0px',
                left: '0px'
            }
        },
        created: function () {
            let that=this;
            this.$store.watch(
                function (state) {
                    return state.count;
                    console.log("store state change");
                },
                function () {
                    //do something on data change
                    //debugger;
                    that.viewMenu = false; 
                    console.log("store data change");
                    
                },
                {
                    deep: true //add this if u need to watch object properties change etc.
                }
            );
        },
        methods: {
            setMenu: function(top, left) {
             
                this.top = top  + 'px';
                this.left = left + 30 + 'px';
                if (left>(window.innerWidth-150)) this.left = left - 260 + 'px';
            },
            closeMenu: function() {
                this.viewMenu = false;  
                //this.$store.commit('increment');
            },
            clickMenu: function(e) {
                
               // debugger;
                (this.viewMenu ? this.closeMenu() : this.openMenu(e));        
            },
            openMenu: function(e) {
                this.$store.commit('increment');
                let that=this;
                setTimeout(function(){ 
                    //console.log(e.target.getBoundingClientRect());
                    let bounds = e.target.getBoundingClientRect()
                    that.viewMenu = true;

                    that.setMenu(bounds.top, bounds.left,)
                }, 20);
                
                e.preventDefault();
            },
            addToWatchlist: function () {
                let that=this;
                services.axios_trakt({
                    method: 'post',
                    url: 'sync/watchlist',
                    data: {
                        shows: [this.show],
                    }
                }).then(function (response) {
                    console.log(response.data)
                    if (response.data.added.shows==1) {
                        that.$notify({
                            group: 'notifications',
                            type: 'success',
                            title: 'Trakt Watchlist',
                            text: 'Item added succesfully'
                        });
                    }
                    else if (response.data.existing.shows==1) {
                        that.$notify({
                            group: 'notifications',
                            type: 'information',
                            title: 'Trakt Watchlist',
                            text: 'Item already exists in Watchlist'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    that.$notify({
                        group: 'notifications',
                        type: 'error',
                        title: 'Trakt error',
                        text: 'Could not complete action'
                    });
                });
            },
            removeFromWatchlist: function () {
                console.log(this.show)
                let that=this;
                services.axios_trakt({
                    method: 'post',
                    url: 'sync/watchlist/remove',
                    data: {
                        shows: [this.show],
                    }
                }).then(function (response) {
                    console.log(response);
                    if (response.data.deleted.shows==1) {
                        that.$notify({
                            group: 'notifications',
                            type: 'success',
                            title: 'Trakt Watchlist',
                            text: 'Item deleted succesfully'
                        });
                    }
                    else if (response.data.not_found.shows==1) {
                        that.$notify({
                            group: 'notifications',
                            type: 'error',
                            title: 'Trakt Watchlist',
                            text: 'Item does not exist'
                        });
                    }
                    else {
                        that.$notify({
                            group: 'notifications',
                            type: 'information',
                            title: 'Trakt Watchlist',
                            text: 'Item does not exist in Watchlist'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    that.$notify({
                        group: 'notifications',
                        type: 'error',
                        title: 'Trakt error',
                        text: 'Could not complete action'
                    });
                });
            },
            addToCollection: function () {
                let that=this;
                services.axios_trakt({
                    method: 'post',
                    url: 'sync/collection',
                    data: {
                        shows: [this.show],
                    }
                }).then(function (response) {
                    console.log(response);
                    if (response.data.added.episodes>0) {
                        that.$notify({
                            group: 'notifications',
                            type: 'success',
                            title: 'Trakt Collection',
                            text: 'Item added succesfully'
                        });
                    }
                    if (response.data.updated.episodes>0) {
                        that.$notify({
                            group: 'notifications',
                            type: 'success',
                            title: 'Trakt Collection',
                            text: 'Item updated succesfully'
                        });
                    }
                    else if (response.data.existing.episodes>0) {
                        that.$notify({
                            group: 'notifications',
                            type: 'information',
                            title: 'Trakt Collection',
                            text: 'Item already exists in Collection'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            removeFromCollection: function () {
                let that=this;
                services.axios_trakt({
                    method: 'post',
                    url: 'sync/collection/remove',
                    data: {
                        shows: [this.show],
                    }
                }).then(function (response) {
                    console.log(response);
                    if (response.data.deleted.episodes>0) {
                        that.$notify({
                            group: 'notifications',
                            type: 'success',
                            title: 'Trakt Collection',
                            text: 'Item deleted succesfully'
                        });
                    }
                    else if (response.data.not_found.shows==1) {
                        that.$notify({
                            group: 'notifications',
                            type: 'error',
                            title: 'Trakt Collection',
                            text: 'Item does not exist'
                        });
                    }
                    else {
                        that.$notify({
                            group: 'notifications',
                            type: 'information',
                            title: 'Trakt Collection',
                            text: 'Item does not exist in Collection'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
        }
    }
</script>

<style lang="scss">
    #right-click-menu{
        background: #FAFAFA;
        border: 1px solid #BDBDBD;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
        display: block;
        list-style: none;
        margin: 0;
        padding: 0;
        position: fixed;
        width: 250px;
        z-index: 999999;
    }

    #right-click-menu li {
        border-bottom: 1px solid #E0E0E0;
        margin: 0;
        padding: 5px 35px;
    }

    #right-click-menu li:last-child {
        border-bottom: none;
    }

    #right-click-menu li:hover {
        background: #1E88E5;
        color: #FAFAFA;
    }
</style>