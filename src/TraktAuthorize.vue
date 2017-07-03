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

    import services from "./services.js";
    import settings from "./settings.js";

    export default {
        name: 'TraktAuthorize',
        data: function() {
            return {
                traktUrl: "https://trakt.tv/oauth/authorize?response_type=code&client_id="+settings.client_id+"&redirect_uri="+settings.redirect_uri,
                code: 0
            };
        },
        created: function () {
            let that=this;
            let code = this.$route.query.code;
            this.code=code;
            if (code) {
                services.axios_trakt({
                    method: 'post',
                    url: 'oauth/token',
                    data: {
                        code: code,
                        client_id: settings.client_id,
                        client_secret: settings.client_secret,
                        redirect_uri: settings.redirect_uri,
                        grant_type: "authorization_code"

                  }
                }).then(function (response) {
                    localStorage.setItem('access_token', response['data']['access_token']);
                    localStorage.setItem('refresh_token', response['data']['refresh_token']);
                    that.$root.router.push("/");
                })
                .catch(function (error) {
                    console.log(that);
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