import axios from 'axios';

export default class Trakt {
    
    constructor() {
        
        this.traktAccessToken = localStorage.getItem('access_token');
        this.traktRefreshToken = localStorage.getItem('refresh_token');
        this.redirectUri = location.protocol+"//"+location.hostname+(location.port ? ':'+location.port: '')+"/authorize";
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

        console.log("trakt is constructing " + this.traktAccessToken);
    }

    async authorize(code) {
        let that=this;
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
            that.traktAccessToken = localStorage.getItem('access_token');
            that.traktRefreshToken = localStorage.getItem('refresh_token');
            return true;
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });
    }

    async deauthorize() {
        let that=this;
        this.axiosTrakt.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
        return this.axiosTrakt({
            method: 'post',
            url: 'oauth/revoke',
            crossdomain: true,
            data: {
                token: this.traktAccessToken,
                client_id: process.env.VUE_APP_CLIENT_ID,
                client_secret: process.env.VUE_APP_CLIENT_SECRET,
            }
        })
        .then(function (response) {
            localStorage.removeItem("access_token");  
            localStorage.removeItem("refresh_token");   
            that.traktAccessToken = null;
            that.traktRefreshToken = null;
        })
        .catch(function (error) {
            console.log(error);
            localStorage.removeItem("access_token");  
            localStorage.removeItem("refresh_token");   
            that.traktAccessToken = null;
            that.traktRefreshToken = null;
            return false;
        });
    }

    async refresh() {
        let that = this;
        return this.axiosTrakt({
            method: 'post',
            url: 'oauth/token',
            data: {
                refresh_token: this.traktRefreshToken,
                client_id: process.env.VUE_APP_CLIENT_ID,
                client_secret: process.env.VUE_APP_CLIENT_SECRET,
                redirect_uri: this.redirectUri,
                grant_type: "refresh_token"

          }
        }).then(function (response) {
            localStorage.setItem('access_token', response['data']['access_token']);
            localStorage.setItem('refresh_token', response['data']['refresh_token']);
            that.traktAccessToken = localStorage.getItem('access_token');
            that.traktRefreshToken = localStorage.getItem('refresh_token');
            that.axiosTrakt.defaults.headers['Authorization'] = 'Bearer '+ that.traktAccessToken;
            return true;
        })
        .catch(function (error) {
            return error;
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

    async getCalendar() {
        return this.axiosTrakt({
            method: 'get',
            url: 'calendars/my/shows/',
            data: {
            }
        }).then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return false;
        });
    }

    async progress(show) {
        return this.axiosTrakt({
            method: 'get',
            url: 'shows/'+show.ids.trakt+'/progress/watched?hidden=false&specials=false&count_specials=false',
            data: {
            }
        }).then(function (response) {
            if (response.data!="") {
                return response;
            }
            else return false;
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async sync() {
        return this.axiosTrakt({
            method: 'get',
            url: '/sync/watched/shows',
            data: {
            }
        }).then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
    }

    async userList(listName) {
        return this.axiosTrakt({
            method: 'get',
            url: 'users/me/'+listName+'/shows?extended=full',
            data: {
            }
        }).then(function (response) {
            let list = [];
            for (let item of response.data) {
                list.push(item.show);
            }
            return list;
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async traktList(listName) {
        return this.axiosTrakt({
            method: 'get',
            url: 'shows/'+listName+'?extended=full',
            data: {
            }
        }).then(function (response) {
            if (typeof(response.data[0].show) != "undefined") {
                let list = [];
                for (let item of response.data) {
                    list.push(item.show);
                }
                return list;
            }
            else return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async recommendations() {
        return this.axiosTrakt({
            method: 'get',
            url: 'recommendations/shows?extended=full',
            data: {       
            }
        }).then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    async scrobble(show) {
        return this.axiosTrakt({
            method: 'post',
            url: 'scrobble/stop',
            data: {  
                "show":{
                    "title":show.show.title
                },
                "episode":{
                    "season":show.next_episode.season,
                    "number":show.next_episode.number,
                    "tilte":show.next_episode.title
                },
                "progress": 100
            }
        }).then(function (response) {
            if (response.data) {
                return response;
            }
            else if (response.data.existing.episodes>0) {
                return false;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}