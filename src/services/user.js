import axios from 'axios';

export const auth = () => {
  return axios.get('/auth');
};

export const login = request => {
  return axios.post('/auth/login', request);
};

export const register = request => {
  return axios.post('/auth/register', request);
};
