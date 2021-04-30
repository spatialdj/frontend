import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'slices/userSlice';
import roomsReducer from 'slices/roomsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    rooms: roomsReducer,
  },
});
