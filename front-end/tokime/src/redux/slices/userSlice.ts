import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 사용자 상태 타입 정의
interface UserState {
  name: string;
  email: string;
  quizScore: number;
  birth: string;
}

// 초기 상태 정의
const initialState: UserState = {
  name: '',
  email: '',
  quizScore: 0,
  birth: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    setBirth(state, action: PayloadAction<string>) {
      return { ...state, birth: action.payload };
    },
    setQuizScore(state, action: PayloadAction<number>) {
      return { ...state, quizScore: action.payload };
    },
  },
});

export const { changeUser, setBirth, setQuizScore } = user.actions;

export default user;
