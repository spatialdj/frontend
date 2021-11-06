import { createSlice } from '@reduxjs/toolkit';
import calculateVolume from 'utils/calculateVolume';

const initialState = {
  boundingBox: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  volume: 0,
  videoId: null,
  status: 'unstarted',
  errorCode: null,
  isYouTubeAPIReady: false,
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
    // calculates the client's volume based on position
    changeVolumeOnMove: (state, { payload }) => {
      // The closer clientPosition is to youtube embed,
      // the louder the volume gets.
      const volume = calculateVolume(state.boundingBox, payload);
      state.volume = volume;
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
      // reset all state except for this
      const { isYouTubeAPIReady } = state;

      state = Object.assign(state, initialState);
      state.isYouTubeAPIReady = isYouTubeAPIReady;
    },
    youtubeAPIReady: state => {
      state.isYouTubeAPIReady = true;
    },
    updateBoundingBox: (state, { payload }) => {
      state.boundingBox = payload;
    },
  },
});

export const {
  changeVolume,
  changeVolumeOnMove,
  changeVideoId,
  muteVideo,
  playSong,
  stopSong,
  endSong,
  reportError,
  clearError,
  reset,
  youtubeAPIReady,
  updateBoundingBox,
} = youtubeSlice.actions;

export default youtubeSlice.reducer;
