import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import user from './slices/userSlice';

const rootReducer = combineReducers({
  user: user.reducer,
});

// RootState 타입을 rootReducer에서 추론
export type RootState = ReturnType<typeof rootReducer>;

// 전체 상태를 초기화하는 액션
const appReducer = (
  state: RootState | undefined,
  action: PayloadAction<any>,
): RootState => {
  if (action.type === 'RESET_ALL') {
    return rootReducer(undefined, action); // 상태를 초기화하면서 새로운 상태 반환
  }
  return rootReducer(state, action);
};

export default appReducer;
