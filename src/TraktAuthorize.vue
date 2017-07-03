<template>
    <div id="trakt-authorize">
        <a :href="traktUrl">Authorize??</a>
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
            };
        },
        created: function () {
            let that=this;
            let code = this.$route.query.code;
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
</style>