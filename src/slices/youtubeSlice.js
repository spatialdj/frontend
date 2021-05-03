import { createSlice } from '@reduxjs/toolkit';

// This is for storing youtube player data
export const youtubeSlice = createSlice({
  name: 'youtube',
  initialState: {
    volume: 0,
    videoId: null,
  },
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
  },
});

export const { changeVolume, changeVideoId, muteVideo } = youtubeSlice.actions;

export default youtubeSlice.reducer;
