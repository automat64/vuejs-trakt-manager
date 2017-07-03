import axios from 'axios';

const axios_trakt = axios.create({
    baseURL: 'https://api.trakt.tv',
    timeout: 15000,
    headers: {
        'Content-type': 'application/json',
        'trakt-api-key': 'ca9dff34914b04651bad7540e573ea6ba39c41e6d7e4772522b96119a62606a2',
        'trakt-api-version': 2
    }
});
const axios_fanart = axios.create({
    baseURL: 'http://webservice.fanart.tv/v3/',
    timeout: 15000,
    headers: {
    }
});

export default {
    axios_trakt: axios_trakt,
    axios_fanart: axios_fanart,
}