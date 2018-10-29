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
    //import Trakt from "../services/trakt.js";

    //const trakt = new Trakt();

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
            this.app_status = "Checking refresh token";
            if (!this.$root.trakt.traktRefreshToken) {
                this.app_status = "Refresh token not found, redirecting.";
                this.$root.router.push("/authorize");
            }
            else {
                this.app_status = "Refresh token found. Refreshing...";
                this.$root.trakt.refresh().then(function (response) {
                    that.$notify({
                        group: 'notifications',
                        type: 'success',
                        title: 'Trakt authorization successful',
                        
                    });
                    that.$root.router.push("/shows");
                })
                .catch(function (error) {
                    console.log(error);
                     that.$root.router.push("/authorize");
                }); 
            }
        },
    }
</script>

<style lang="scss">

</style>