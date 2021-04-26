import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userAPI from 'services/user';

export const authenticate = createAsyncThunk('user/auth', async () => {
  const response = await userAPI.auth();
  return response.data;
});

export const login = createAsyncThunk('user/login', async request => {
  const response = await userAPI.login(request);
  return response.data;
});

export const register = createAsyncThunk('user/register', async request => {
  const response = await userAPI.register(request);
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    profile_pic: '',
    userid: '',
    authenticated: false,
    status: 'idle',
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [authenticate.fulfilled]: (state, { payload }) => {
      // Update state with user info
      state.authenticated = true;
      state.status = 'success';
      state.username = payload.username;
      state.profile_pic = payload.profile_pic;
      state.userid = payload.userid;
    },
    [authenticate.pending]: state => {
      state.status = 'loading';
    },
    [authenticate.rejected]: state => {
      state.status = 'failed';
    },
  },
});

export default userSlice.reducer;
