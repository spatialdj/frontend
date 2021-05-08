import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queue: [],
  currentSong: 'null',
  inQueue: false, // Client in queue
  status: 'idle',
};

// There is no async here, the socket.io stuff is handled
// on a per-component basis. Whatever response from socket.io
// is sent as payload to this reducer and stored in Redux state.
// Picture:
// COMPONENT -> socket.emit/.on  -> dispatch(action here) -> queueSlice
export const queueSlice = createSlice({
  name: 'queue',
  initialState: initialState,
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
    // Handles client join/leave queue
    joinQueue: (state, { payload }) => {
      state.inQueue = true;
      state.queue.push(payload);
    },
    leaveQueue: (state, { payload }) => {
      state.inQueue = false;
      state.queue = state.queue.filter(username => username !== payload);
    },
    // Handles other users join/leave queue
    enqueue: (state, { payload }) => {
      state.queue.push(payload);
    },
    dequeue: (state, { payload }) => {
      state.queue = state.queue.filter(username => username !== payload);
    },
    changeCurrentSong: (state, { payload }) => {
      state.currentSong = payload;
    },
    reset: state => {
      state = Object.assign(state, initialState);
    },
  },
});

export const {
  populate,
  joinQueue,
  leaveQueue,
  enqueue,
  dequeue,
  changeCurrentSong,
  reset,
} = queueSlice.actions;

export default queueSlice.reducer;
