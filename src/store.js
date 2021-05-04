import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'slices/userSlice';
import roomsReducer from 'slices/roomsSlice';
import currentRoomReducer from 'slices/currentRoomSlice';
import queueReducer from 'slices/queueSlice';
import youtubeReducer from 'slices/youtubeSlice';
import voteReducer from 'slices/voteSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    rooms: roomsReducer,
    currentRoom: currentRoomReducer,
    queue: queueReducer,
    youtube: youtubeReducer,
    vote: voteReducer,
  },
});
