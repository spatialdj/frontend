import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userAPI from 'services/user';
import { populate } from 'slices/playlistsSlice';

export const authenticate = createAsyncThunk(
  'user/auth',
  async (_, thunkAPI) => {
    const response = await userAPI.auth();
    thunkAPI.dispatch(
      populate({
        playlists: response.data.playlist,
        selectedPlaylist: response.data.selectedPlaylist,
      })
    );
    return response.data;
  }
);

export const login = createAsyncThunk('user/login', async request => {
  const response = await userAPI.login(request);
  return response.data;
});

export const register = createAsyncThunk('user/register', async request => {
  const response = await userAPI.register(request);
  return response.data;
});

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await userAPI.logout();
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    profilePicture: '',
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
      state.profilePicture = payload.profilePicture;
    },
    [authenticate.pending]: state => {
      state.status = 'loading';
    },
    [authenticate.rejected]: state => {
      state.status = 'failed';
    },
    [logout.fulfilled]: state => {
      // Reset state to blank
      state.authenticated = false;
      state.status = 'failed';
      state.username = '';
      state.profilePicture = '';
    },
  },
});

export default userSlice.reducer;
