<template>
    <ul id="right-click-menu" tabindex="-1" v-click-outside="closeMenu" v-if="viewMenu" v-on:blur="closeMenu"  v-bind:style="{top:top, left:left}">
        <li v-if="inWatchlist == false"><a v-on:click="addToWatchlist">Add to Watchlist</a></li>
        <li v-if="inWatchlist == true"><a v-on:click="removeFromWatchlist">Remove from Watchlist</a></li>
        <li v-if="inCollection == false"><a v-on:click="addToCollection">Add to Collection</a></li>
        <li v-if="inCollection == true"><a v-on:click="removeFromCollection">Remove from Collection</a></li>
    </ul>
</template>

<script>

    import Trakt from "../services/trakt.js";
    import vClickOutside from 'v-click-outside';

    const trakt = new Trakt();

    export default {
        name: 'ListMenu',
        props: ['show'],
        directives: {
        clickOutside: vClickOutside.directive
        },
        data: function () {
            return {
                viewMenu: false,
                top: '0px',
                left: '0px'
            }
        },
        computed: {
            inWatchlist () {
                return (this.$store.state.lists.traktLists['watchList'].indexOf(this.show) > -1) ? true : false;   
            },
            inCollection: function () {
                return (this.$store.state.lists.traktLists['collectionList'].indexOf(this.show) > -1) ? true : false; 
            }
        },
        created: function () {

        },
        methods: {
            setMenu: function(top, left) {
                this.top = top  + 'px';
                this.left = left + 30 + 'px';
                if (left>(window.innerWidth-150)) this.left = left - 260 + 'px';
            },
            closeMenu: function() {
                this.viewMenu = false;  
            },
            clickMenu: function(e) {

                (this.viewMenu ? this.closeMenu() : this.openMenu(e));        
            },
            openMenu: function(e) {
                let that=this;
                setTimeout(function(){ 
                    let bounds = e.target.getBoundingClientRect()
                    that.viewMenu = true;

                    that.setMenu(bounds.top, bounds.left,)
                }, 20);
                
                e.preventDefault();
            },
            addToWatchlist: function () {
                let that=this;

                trakt.addToWatchlist(this.show).then(function (response) {
                    if (response) {
                        that.$notify({
                            group: 'notifications',
                            type: 'success',
                            title: 'Trakt Watchlist',
                            text: 'Item added succesfully'
                        });
                        that.$store.commit('lists/insertItem',['watchList',that.show]);
                    }
                    else {
                        that.$notify({
                            group: 'notifications',
                            type: 'information',
                            title: 'Trakt Watchlist',
                            text: 'Item already exists in Watchlist'
                        });
                    }
                }).catch(function (error) {
                    that.$notify({
                        group: 'notifications',
                        type: 'error',
                        title: 'Trakt error',
                        text: 'Could not complete action'
                    });
                });

                this.viewMenu = false; 
            },
            removeFromWatchlist: function () {
                let that=this;

                trakt.removeFromWatchlist(this.show).then(function (response) {
                    if (response) {
                        that.$store.commit('lists/removeItem',['watchList',that.show]);
                        that.$notify({
                            group: 'notifications',
                            type: 'success',
                            title: 'Trakt Watchlist',
                            text: 'Item removed succesfully'
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
                }).catch(function (error) {
                    that.$notify({
                        group: 'notifications',
                        type: 'error',
                        title: 'Trakt error',
                        text: 'Could not complete action'
                    });
                });

                this.viewMenu = false; 
            },
            addToCollection: function () {
                let that=this;

                trakt.addToCollection(this.show).then(function (response) {
                    if (response) {
                        that.$store.commit('lists/insertItem',['collectionList',that.show]);
                        that.$notify({
                            group: 'notifications',
                            type: 'success',
                            title: 'Trakt Collection',
                            text: 'Item added succesfully'
                        });
                    }
                    else {
                        that.$notify({
                            group: 'notifications',
                            type: 'information',
                            title: 'Trakt Collection',
                            text: 'Item already exists in Collection'
                        });
                    }
                }).catch(function (error) {
                    that.$notify({
                        group: 'notifications',
                        type: 'error',
                        title: 'Trakt error',
                        text: 'Could not complete action'
                    });
                });

                this.viewMenu = false; 
            },
            removeFromCollection: function () {
                let that=this;

                trakt.removeFromCollection(this.show).then(function (response) {
                    if (response) {
                        that.$store.commit('lists/removeItem',['collectionList',that.show]);
                        that.$notify({
                            group: 'notifications',
                            type: 'success',
                            title: 'Trakt Collection',
                            text: 'Item removed succesfully'
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
                }).catch(function (error) {
                    that.$notify({
                        group: 'notifications',
                        type: 'error',
                        title: 'Trakt error',
                        text: 'Could not complete action'
                    });
                });

                this .viewMenu = false; 
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