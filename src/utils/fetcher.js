import axios from 'axios';

export const getFetcher = (url, timeout=2000) => {
    return axios.get(url, {timeout}).then(r => r.data);
}

export const postFetcher = (url, timeout=2000) => {
    return axios.post(url, {timeout}).then(r => r.data);
}
