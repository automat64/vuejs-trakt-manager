import axios from 'axios';
let trakt_access_token = localStorage.getItem('access_token');
let axios_trakt = axios.create({
    baseURL: 'https://api.trakt.tv',
    timeout: 15000,
    headers: {
        'Content-type': 'application/json',
        'trakt-api-key': 'ca9dff34914b04651bad7540e573ea6ba39c41e6d7e4772522b96119a62606a2',
        'trakt-api-version': 2,
        'Authorization' : 'Bearer '+trakt_access_token
    }
});
let axios_fanart = axios.create({
    baseURL: 'http://webservice.fanart.tv/v3/',
    timeout: 15000,
    headers: {
    }
});

export default {
    axios_trakt: axios_trakt,
    axios_fanart: axios_fanart,
    trakt_access_token: trakt_access_token
}