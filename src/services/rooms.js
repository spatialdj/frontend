import axios from 'axios';

export const get = params => {
  return axios.get('/rooms', { params });
};

export const update = (roomId, request) => {
  return axios.put(`/rooms/update/${roomId}`, request);
};
