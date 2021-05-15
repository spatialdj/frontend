import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as songAPI from 'services/song';

export const search = createAsyncThunk('songSearch/search', async request => {
  const response = await songAPI.search(request);
  return { query: request, videos: response?.data?.videos ?? [] };
});

export const songSearchSlice = createSlice({
  name: 'songSearch',
  initialState: {
    results: [],
    query: '',
    status: 'idle',
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    clearSearch: state => {
      state.results = [];
      state.query = '';
      state.status = 'idle';
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [search.fulfilled]: (state, { payload }) => {
      // Update state with song results
      state.query = payload.query;
      state.results = payload.videos;
      state.status = 'success';
    },
    [search.pending]: state => {
      state.status = 'loading';
    },
    [search.rejected]: state => {
      state.status = 'failed';
    },
  },
});

export const { clearSearch } = songSearchSlice.actions;

export default songSearchSlice.reducer;
