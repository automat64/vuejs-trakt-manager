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
                    <p>
                        <a class=""  v-on:click="deauthorizeTrakt">
                            Revoke Token
                        </a>
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>

    export default {
        name: 'TraktUser',
        props: [],
        data: function () {
            return {
              photo:'https://bulma.io/images/placeholders/128x128.png',
              name:'loading...',
              username:'loading...'
            };
        },
        created: function () {
            let that = this;
            this.$root.trakt.user().then(function (response) {
                that.name=response.data.name;
                that.username=response.data.username;
                that.photo=response.data.images.avatar.full;
            }).catch(function (error) {
                console.log(error);
                //that.$root.router.push("/authorize");
            });
        },
        methods: {
            deauthorizeTrakt: function () {
                let that = this;
                this.$root.trakt.deauthorize().then(function () {
                   that.$root.router.push("/authorize");
                })
            },
        }
    }
</script>

<style lang="scss">
</style>