import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as roomsAPI from 'services/rooms';

export const get = createAsyncThunk('/api/rooms/get', async (params, thunkAPI) => {
  // If params didn't include a searchQuery, add current searchQuery to it
  if (params.searchQuery === undefined) {
    const searchQuery = thunkAPI.getState().rooms.searchQuery;
    params.searchQuery = searchQuery;
  }
  const response = await roomsAPI.get(params);
  return response.data;
});

// infinite scroll
export const getMore = createAsyncThunk('/api/rooms/getMore', async params => {
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

const initialState = {
  data: [],
  searchQuery: '*',
  limit: 10,
  skip: 0,
  filters: [],
  status: 'idle',
  getMoreStatus: 'idle',
  hasMore: true
}

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    reset: () => initialState
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
      state.getMoreStatus = 'success';
      state.data.push(...payload);
      state.searchQuery = meta.arg.searchQuery;
      state.limit = meta.arg.limit;
      state.skip = meta.arg.skip;
      state.filters = meta.arg.filters;
      // if results returned is < limit, there are no more rooms
      state.hasMore = payload.length !== 0 && payload.length === state.limit;
      console.log(state.hasMore)
    },
    [getMore.pending]: state => {
      state.getMoreStatus = 'loading';
    },
    [getMore.rejected]: state => {
      state.getMoreStatus = 'failed';
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

export const { reset } = roomsSlice.actions;

export default roomsSlice.reducer;
