export default {
    created: function () {

    },
    methods: {
        scrobble: async function (showTraktId,season, number) {
            this.$root.trakt.scrobble(showTraktId,season, number).then(function (response) {
                if (typeof(response) != "undefined") {
                    return true;
                }
                else {
                    return false;
                }
            })
        }
    }
}
