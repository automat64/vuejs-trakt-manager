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
                            <p>{{ appStatus }}</p>
                        </div>
                </article>
            </div>
        </div>    
    </div>
</template>

<script>

    export default {
        name: 'AppInit',
        data: function() {
            return {
                appStatus : "Initializing App. Stand By..."
            };
        },
        mounted: function () {
            
            let that = this;
            console.log("app init template loaded");  
            this.appStatus = "Checking refresh token";
            if (this.$root.trakt.traktRefreshToken==null) {
                this.appStatus = "Refresh token not found, redirecting.";
                this.$root.router.push("/authorize");
            }
            else {
                this.appStatus = "Refresh token found. Refreshing...";
                this.$root.trakt.refresh().then(function () {
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