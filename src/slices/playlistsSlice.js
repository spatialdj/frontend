import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const playlistSlice = createSlice({
  name: 'playlists',
  initialState: {
    playlists: {},
    selectedPlaylist: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    populate: (state, { payload }) => {
      const { playlists, selectedPlaylist } = payload;

      state.playlists = playlists;
      state.selectedPlaylist = selectedPlaylist ?? null;
    },
    updatePlaylist: (state, { payload }) => {
      const { playlist } = payload;

      state.playlists[playlist.id] = playlist;
    },
    createPlaylist: (state, { payload }) => {
      const { playlist } = payload;

      state.playlists[playlist.id] = playlist;
    },
    deletePlaylist: (state, { payload }) => {
      const { playlistId } = payload;

      state.selectedPlaylist = null;
      delete state.playlists[playlistId];
    },
    selectPlaylist: (state, { payload }) => {
      const { playlistId } = payload;

      state.selectedPlaylist = playlistId;
    },
    cycleSelectedPlaylist: state => {
      const playlist = state.playlists[state.selectedPlaylist].queue;

      playlist.push(playlist.shift());
    },
    addSong: (state, { payload }) => {
      const { playlistId, song } = payload;

      state.playlists[playlistId].queue.push(song);
    },
    removeSong: (state, { payload }) => {
      const { songId, playlistId } = payload;
      const playlist = state.playlists[playlistId];
      const index = playlist.queue.findIndex(song => song.id === songId);

      playlist.queue.splice(index, 1);
    },
  },
  extraReducers: {},
});

export const {
  populate,
  updatePlaylist,
  createPlaylist,
  deletePlaylist,
  selectPlaylist,
  addSong,
  removeSong,
  cycleSelectedPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;
