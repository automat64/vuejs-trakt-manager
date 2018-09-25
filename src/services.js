import axios from 'axios';
import axiosRetry from 'axios-retry';
//axiosRetry(axios, { retries: 3 });

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
let axios_tvdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    timeout: 15000,
    // headers: {
    //   'api_key': "33384ca5a5f607463d331459320cfc81",
    // }
});


axiosRetry(axios_trakt, { 
    retries: 5,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (response) => {  // custom
        console.log("retry TRAKT");
        return true;
        //return true;//response.config.method === 'POST';
        //debugger;
        let result = (axiosRetry.isRetryableError(response) || response.config.method === 'GET')
        debugger;
        return result
    },
});

axiosRetry(axios_fanart, { 
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (response) => {  // custom
        console.log("retry FANART");
        return true;
        //return true;//response.config.method === 'POST';
       // debugger;
        let result = (axiosRetry.isRetryableError(response) || response.config.method === 'GET')
        debugger;
        return result
    },
});

export default {
    axios_trakt: axios_trakt,
    axios_fanart: axios_fanart,
    axios_tvdb: axios_tvdb,
    trakt_access_token: trakt_access_token
}