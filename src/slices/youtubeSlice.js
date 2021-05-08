import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  volume: 0,
  videoId: null,
  status: 'unstarted',
  errorCode: null,
};

// This is for storing youtube player data
export const youtubeSlice = createSlice({
  name: 'youtube',
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    changeVolume: (state, { payload }) => {
      state.volume = payload;
    },
    muteVideo: state => {
      state.volume = 0;
    },
    changeVideoId: (state, { payload }) => {
      state.videoId = payload;
    },
    playSong: state => {
      state.status = 'playing';
      state.errorCode = null;
    },
    // Handles socket.io stop_song event
    stopSong: state => {
      state.status = 'stopped';
    },
    // Handles client youtube player ended current song
    endSong: state => {
      state.status = 'ended';
    },
    reportError: (state, { payload }) => {
      state.errorCode = payload;
    },
    clearError: state => {
      state.errorCode = null;
    },
    reset: state => {
      state = Object.assign(state, initialState);
    },
  },
});

export const {
  changeVolume,
  changeVideoId,
  muteVideo,
  playSong,
  stopSong,
  endSong,
  reportError,
  clearError,
  reset,
} = youtubeSlice.actions;

export default youtubeSlice.reducer;
