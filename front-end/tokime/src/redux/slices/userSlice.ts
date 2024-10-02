import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    phone: '',
    quizScore: '',
    birth: '',
  },
  reducers: {
    changeUser(state, idx) {
      return idx.payload;
    },
    setBirth(state, action) {
      state.birth = action.payload;
    },
  },
});

export let { changeUser } = user.actions;

export default user;
