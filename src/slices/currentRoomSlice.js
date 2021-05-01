import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    id: null,
    name: null,
    description: null,
    privateRoom: null,
    genres: [],
    host: {
      username: null,
      profilePicture: null,
    },
    numMembers: 0,
    members: [],
  },
  status: 'idle',
  isGuest: null,
};

// There is no async here, the socket.io stuff is handled
// on a per-component basis. Whatever response from socket.io
// is sent as payload to this reducer and stored in Redux state.
// Picture:
// COMPONENT -> socket.emit/.on  -> dispatch(action here) -> currentRoomSlice
export const currentRoomSlice = createSlice({
  name: 'currentRoom',
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    createRoom: (state, { payload }) => {
      const {
        id,
        name,
        description,
        privateRoom,
        genres,
        host,
        numMembers,
        members,
      } = payload.room;
      state.data.id = id;
      state.data.name = name;
      state.data.description = description;
      state.data.privateRoom = privateRoom;
      state.data.genres = genres;
      state.data.host = host;
      state.data.numMembers = numMembers;
      // Convert members from object to array
      state.data.members = Object.keys(members).map(key => members[key]);
      state.status = 'success';
      state.isGuest = false;
    },
    joinRoom: (state, { payload }) => {
      if (payload.success) {
        // Same thing as create room, we are just storing socket.io response
        // into the Redux store
        const {
          id,
          name,
          description,
          privateRoom,
          genres,
          host,
          numMembers,
          members,
        } = payload.room;
        state.data.id = id;
        state.data.name = name;
        state.data.description = description;
        state.data.privateRoom = privateRoom;
        state.data.genres = genres;
        state.data.host = host;
        state.data.numMembers = numMembers;
        // Convert members from object to array
        state.data.members = Object.keys(members).map(key => members[key]);
        state.status = 'success';
        state.isGuest = payload.guest;
      } else {
        state.status = 'failed';
      }
    },
    leaveRoom: state => {
      state = Object.assign(state, initialState);
    },
  },
});

export const { createRoom, joinRoom, leaveRoom } = currentRoomSlice.actions;

export default currentRoomSlice.reducer;
