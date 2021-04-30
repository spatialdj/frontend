import axios from 'axios';

export const search = (query) => {
    return axios.get('/api/song/search', { search: query })
}