import axios from 'axios';

export default class Fanart {
    constructor() {
        this.axiosFanart = axios.create({
            method: 'get',
            crossdomain: true,
            baseURL: 'https://webservice.fanart.tv/v3/',
            timeout: 15000,
            headers: {
            }
        });
    }

    async query(tvbId) {
        return this.axiosFanart({
            url: 'tv/'+tvbId+'?api_key=3e53bdae664d5e570691c6c95becc11e&client_key=a90da1673943ed58d466f207e12668cd'
        }).then(function (response) {
            return response;
        })
        .catch(function () {
            return false;
        });
    }
}