import { createSlice } from '@reduxjs/toolkit';

// There is no async here, the socket.io stuff is handled
// on a per-component basis. Whatever response from socket.io
// is sent as payload to this reducer and stored in Redux state.
// Picture:
// COMPONENT -> socket.emit/.on  -> dispatch(action here) -> queueSlice
export const queueSlice = createSlice({
  name: 'queue',
  initialState: {
    queue: [],
    currentSong: 'null',
    inQueue: false,
    status: 'idle',
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    populate: (state, { payload }) => {
      if (payload.success) {
        const { queue, currentSong, inQueue } = payload;
        state.queue = queue;
        state.currentSong = currentSong;
        state.inQueue = inQueue;
        state.status = 'success';
      } else {
        state.status = 'failed';
      }
    },
    enqueue: (state, { payload }) => {
      state.queue = payload;
    },
    dequeue: (state, { payload }) => {
      state.queue = payload;
    },
    joinQueue: state => {
      state.inQueue = true;
    },
    leaveQueue: state => {
      state.inQueue = false;
    },
    changeCurrentSong: (state, { payload }) => {
      state.currentSong = payload;
    },
  },
});

export const {
  populate,
  enqueue,
  dequeue,
  joinQueue,
  leaveQueue,
  changeCurrentSong,
} = queueSlice.actions;

export default queueSlice.reducer;
