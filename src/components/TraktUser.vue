<template>
    <div id="trakt-user">
        <article class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img v-bind:src="photo" alt="Image">
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>{{ name }}</strong> <small>({{ username }})</small>
                    </p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item"  v-on:click="deauthorizeTrakt">
                            Revoke Token
                        </a>
                        
                    </div>
                </nav>
            </div>
        </article>
    </div>
</template>

<script>

    import services from "../services.js";
    import settings from "../settings.js";

    export default {
        name: 'TraktUser',
        props: ['access_token'],
        data: function () {
            return {
              photo:'http://bulma.io/images/placeholders/128x128.png',
              name:'loading...',
              username:'loading...',
            };
        },
        mounted: function () {

        },
        watch : {
            access_token : function (value) {
                let that = this;
                services.axios_trakt({
                    method: 'get',
                    url: 'users/me?extended=full',
                    data: {
                        access_token: this.access_token,
                    }
                })
                .then(function (response) {
                    that.name=response.data.name;
                    that.username=response.data.username;
                    that.photo=response.data.images.avatar.full;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        methods: {
            deauthorizeTrakt: function () {
                let that = this;
                services.axios_trakt({
                    method: 'post',
                    url: 'oauth/revoke',

                    data: {
                        token: this.access_token,
                    }
                })
                .then(function (response) {
                    localStorage.removeItem("access_token");  
                    localStorage.removeItem("refresh_token");   
                    that.$root.router.push("/authorize");
                })
                .catch(function (error) {
                    localStorage.removeItem("access_token");  
                    localStorage.removeItem("refresh_token");   
                    that.$root.router.push("/authorize");
                    console.log(error);
                });
            },
        }
    }
</script>

<style lang="scss">
</style>