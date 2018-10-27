<template>
    <div id="trakt-authorize">
        <div v-if="code" class="modal is-active"><div class="modal-background"></div></div>
        <div v-else class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <article class="message">
                    <div class="message-header">
                        <p><span class="icon"><i class="fa fa-user-o"></i></span>Hello You</p>
                    </div>
                        <div class="message-body">
                            <p>Before you continue you need to authorize your Trakt account.</p>
                            <div class="block has-text-centered">
                                <a class="button is-primary" :href="traktUrl">Well ok then...</a>
                            </div>
                        </div>
                </article>
            </div>
        </div>
        
    </div>
</template>

<script>

    import Trakt from "../services/trakt.js";

    export default {
        name: 'TraktAuthorize',
        data: function() {
            return {
                traktUrl: "https://trakt.tv/oauth/authorize",
                code: 0
            };
        },
        created: function () {

            let that=this;
            const trakt = new Trakt();
            this.traktUrl = trakt.traktUrl;
            if (this.$route.query.code) {
                this.code = this.$route.query.code;
                trakt.authorize(this.code).then(function (response) {
                    that.$root.router.push("/");
                }).catch(function (error) {
                    console.log(error);
                    that.$root.router.push("/authorize");
                });
            }

        },
    }
</script>

<style lang="scss">
    #trakt-authorize {
        a {
            text-decoration: none;
        }
    }
</style>