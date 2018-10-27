import axios from 'axios';

export default class Trakt {
    
    constructor() {
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
            },
            headers: {
                'Authorization' : 'Bearer '+this.traktAccessToken
            }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}