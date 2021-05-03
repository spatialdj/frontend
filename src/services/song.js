import axios from 'axios';

export const search = async search => {
  return await axios.get('/song/search', { params: { search: search } });
};
