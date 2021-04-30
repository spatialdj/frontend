import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as roomsAPI from 'services/rooms';

export const get = createAsyncThunk('rooms/get', async params => {
  const response = await roomsAPI.get(params);
  return response.data;
});

// infinite scroll
export const getMore = createAsyncThunk('rooms/getMore', async params => {
  const response = await roomsAPI.get(params);
  return response.data;
});

export const update = createAsyncThunk(
  'rooms/update',
  async (roomId, request) => {
    const response = await roomsAPI.update(roomId, request);
    return response.data;
  }
);

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    data: [],
    searchQuery: '*',
    limit: 10,
    skip: 0,
    filters: [],
    status: 'idle',
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [get.fulfilled]: (state, { payload, meta }) => {
      state.status = 'success';
      state.data = payload;
      state.searchQuery = meta.arg.searchQuery;
      state.limit = meta.arg.limit;
      state.skip = meta.arg.skip;
      state.filters = meta.arg.filters;
    },
    [get.pending]: state => {
      state.status = 'loading';
    },
    [get.rejected]: state => {
      state.status = 'failed';
    },
    [getMore.fulfilled]: (state, { payload, meta }) => {
      state.status = 'success';
      state.data.concat(payload);
      state.searchQuery = meta.arg.searchQuery;
      state.limit = meta.arg.limit;
      state.skip = meta.arg.skip;
      state.filters = meta.arg.filters;
    },
    [getMore.pending]: state => {
      state.status = 'loading';
    },
    [getMore.rejected]: state => {
      state.status = 'failed';
    },
    [update.fulfilled]: state => {
      state.status = 'success';
    },
    [update.pending]: state => {
      state.status = 'loading';
    },
    [update.rejected]: state => {
      state.status = 'failed';
    },
  },
});

export default roomsSlice.reducer;
