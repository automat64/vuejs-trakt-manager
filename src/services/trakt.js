import axios from 'axios';

export default class Trakt {
    
    constructor() {
        console.log("trakt is constructing");
        this.traktAccessToken = localStorage.getItem('access_token');
        this.redirectUri = "http://"+location.hostname+(location.port ? ':'+location.port: '')+"/authorize";
        this.traktUrl = "https://trakt.tv/oauth/authorize?response_type=code&client_id="+process.env.VUE_APP_CLIENT_ID+"&redirect_uri="+this.redirectUri,
        this.axiosTrakt = axios.create({
            baseURL: 'https://api.trakt.tv',
            crossdomain: true,
            timeout: 15000,
            headers: {
                'Content-type': 'application/json',
                'trakt-api-key': process.env.VUE_APP_CLIENT_ID,
                'trakt-api-version': 2,
                'Authorization' : 'Bearer '+this.traktAccessToken
            }
        });
    }

    async authorize(code) {
        let that = this;
        return this.axiosTrakt({
            method: 'post',
            url: 'oauth/token',
            data: {
                code: code,
                client_id: process.env.VUE_APP_CLIENT_ID,
                client_secret: process.env.VUE_APP_CLIENT_SECRET,
                redirect_uri: this.redirectUri,
                grant_type: "authorization_code"
            }
        }).then(function (response) {
            localStorage.setItem('access_token', response['data']['access_token']);
            localStorage.setItem('refresh_token', response['data']['refresh_token']);
            //that.traktAccessToken = response['data']['access_token'];
            return true;
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });
    }

    async deauthorize() {
        return this.axiosTrakt({
            method: 'post',
            url: 'oauth/revoke',
            data: {
                token: this.traktAccessToken,
            }
        })
        .then(function (response) {
            localStorage.removeItem("access_token");  
            localStorage.removeItem("refresh_token");   
            return true;
        })
        .catch(function (error) {
            localStorage.removeItem("access_token");  
            localStorage.removeItem("refresh_token");   
            console.log(error);
            return false;
        });
    }

    async user() {
        return this.axiosTrakt({
            method: 'get',
            url: 'users/me?extended=full',
            data: {
                access_token: this.traktAccessToken,
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async addToWatchlist(show) {
        return this.axiosTrakt({
            method: 'post',
            url: 'sync/watchlist',
            data: {
                shows: [show],
            }
        }).then(function (response) {
            if (response.data.added.shows==1) {
                return true;
            }
            else if (response.data.existing.shows==1) {
                return false;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async removeFromWatchlist(show) {
        return this.axiosTrakt({
            method: 'post',
            url: 'sync/watchlist/remove',
            data: {
                shows: [show],
            }
        }).then(function (response) {
            if (response.data.deleted.shows==1) {
                return true;
            }
            else {
                return false;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async addToCollection(show) {
        return this.axiosTrakt({
            method: 'post',
            url: 'sync/collection',
            data: {
                shows: [show],
            }
        }).then(function (response) {
            if (response.data.added.episodes>0 || response.data.updated.episodes>0) {
                return true;
            }
            else if (response.data.existing.episodes>0) {
                return false;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async removeFromCollection(show) {
        return this.axiosTrakt({
            method: 'post',
            url: 'sync/collection/remove',
            data: {
                shows: [show],
            }
        }).then(function (response) {
            if (response.data.deleted.episodes>0) {
                return true;
            }
            else {
                return false;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async search(query) {
        return this.axiosTrakt({
            method: 'get',
            url: 'search/show?extended=full&query='+query+"",
            data: {
            }
        })
        .then(function (response) {
            let list = [];
            for (let item of response.data) {
                list.push(item.show);
            }
            return list;

        })
        .catch(function (error) {
            console.log(error);
            return false;
        });
    }
}