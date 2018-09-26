<template>
    <div id="app-init">
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <article class="message">
                    <div class="message-header">
                        <p><span class="icon"><i class="fa fa-user-o"></i></span>Hello You</p>
                    </div>
                        <div class="message-body">
                            <p>{{ app_status }}</p>
                        </div>
                </article>
            </div>
        </div>    
    </div>
</template>

<script>

    import services from "../services.js";
    import settings from "../settings.js";

    export default {
        name: 'AppInit',
        data: function() {
            return {
                refresh_token : localStorage.getItem('refresh_token'),
                app_status : "Initializing App. Stand By..."
            };
        },
        mounted: function () {
            
            let that = this;
            console.log("app init template loaded");  
            let refresh_token = localStorage.getItem('refresh_token');
            this.app_status = "Checking refresh token";
            if (!this.refresh_token) {
                this.app_status = "Refresh token not found, redirecting.";
                this.$root.router.push("/authorize");
            }
            else {
                this.app_status = "Refresh token found. Refreshing...";
                console.log(this.refresh_token);
                services.axios_trakt({
                    method: 'post',
                    url: 'oauth/token',
                    data: {
                        refresh_token: this.refresh_token,
                        client_id: settings.client_id,
                        client_secret: settings.client_secret,
                        redirect_uri: settings.redirect_uri,
                        grant_type: "refresh_token"

                  }
                }).then(function (response) {
                    localStorage.setItem('access_token', response['data']['access_token']);
                    localStorage.setItem('refresh_token', response['data']['refresh_token']);
                    services.axios_trakt.defaults.headers['Authorization'] = 'Bearer '+ response['data']['access_token'];
                    that.access_token=response['data']['access_token'];
                    that.$root.router.push("/shows");
                    that.$notify({
                        group: 'notifications',
                        type: 'success',
                        title: 'Trakt authorization successful',
                        
                    });
                })
                .catch(function (error) {
                    that.$root.router.push("/authorize");
                }); 
            }
            
    
        },
    }
</script>

<style lang="scss">

</style>