<template>
    <ul id="right-click-menu" tabindex="-1"  v-if="viewMenu" v-on:blur="closeMenu"  v-bind:style="{top:top, left:left}">
        <li><a>Add to Watchlist</a></li>
        <li><a>Add to Collection</a></li>
        <li><a>Remove from Watchlist</a></li>
        <li><a>Remove from Collection</a></li>
    </ul>
</div>
</template>

<script>

    import services from "../services.js";
    import settings from "../settings.js";
    import Vue from "vue";
    export default {
        name: 'ListMenu',
        props: ['movie'],
        data: function () {
            return {
                viewMenu: false,
                top: '0px',
                left: '0px'
            }
        },

        methods: {
            closeMenu: function() {
                this.viewMenu = false;
            },
            clickMenu: function(e) {
                (this.viewMenu ? this.closeMenu() : this.openMenu(e)); 
            },
            openMenu: function(e) {
                console.log(e.target.getBoundingClientRect());
                this.viewMenu = true;
                e.preventDefault();
            }
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
        position: absolute;
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