import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likes: 0,
  dislikes: 0,
  saves: 0,
  clientVote: null, // 'LIKE' or 'DISLIKE'
  clientSaved: false,
};

// This is for storing voting data for the current song
export const voteSlice = createSlice({
  name: 'vote',
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    like: state => {
      switch (state.clientVote) {
        case null:
          // didn't vote yet
          state.likes++;
          state.clientVote = 'LIKE';
          break;
        case 'LIKE':
          // already voted LIKE
          state.likes--;
          state.clientVote = null;
          break;
        case 'DISLIKE':
          // already voted DISLIKE
          state.dislikes--;
          state.likes++;
          state.clientVote = 'LIKE';
          break;
        default:
          break;
      }
    },
    dislike: state => {
      switch (state.clientVote) {
        case null:
          // didn't vote yet
          state.dislikes++;
          state.clientVote = 'DISLIKE';
          break;
        case 'LIKE':
          // already voted LIKE
          state.likes--;
          state.dislikes++;
          state.clientVote = 'DISLIKE';
          break;
        case 'DISLIKE':
          // already voted DISLIKE
          state.dislikes--;
          state.clientVote = null;
          break;
        default:
          break;
      }
    },
    save: state => {
      // Toggle save
      if (state.clientSaved) {
        state.saves--;
        state.clientSaved = false;
      } else {
        state.saves++;
        state.clientSaved = true;
      }
    },
    clearVote: state => {
      state = Object.assign(state, initialState);
    },
  },
});

export const { like, dislike, save, clearVote } = voteSlice.actions;

export default voteSlice.reducer;
