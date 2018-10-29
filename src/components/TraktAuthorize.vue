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
                                <a class="button is-primary" :href="this.$root.trakt.traktUrl">Well ok then...</a>
                            </div>
                        </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'TraktAuthorize',
        data: function() {
            return {
                code: this.$route.query.code
            };
        },
        created: function () {

            let that=this;
            this.traktUrl = this.$root.trakt.traktUrl;
            if (this.code) {
                this.$root.trakt.authorize(this.code).then(function () {
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