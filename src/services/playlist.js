import axios from 'axios';

export const create = request => {
  return axios.post('/playlist/create', request);
};

export const addSong = (playlistId, request) => {
  return axios.put(`/playlist/add/${playlistId}`, request);
};

export const removeSong = (playlistId, request) => {
  return axios.delete(`/playlist/remove/${playlistId}`, { data: request });
};

export const deletePlaylist = (playlistId) => {
  return axios.delete(`/playlist/delete/${playlistId}`)
}

export const update = (playlistId, request) => {
  return axios.put(`/playlist/update/${playlistId}`, { playlist: request })
}

export const get = (playlistId) => {
  return axios.get(`/playlist/get/${playlistId}`)
}

export const select = (playlistId) => {
  return axios.post(`/playlist/select/${playlistId}`)
}

export const list = () => {
    return axios.get(`/playlist/list`)
}
