import { combineReducers, PayloadAction } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import landAddress from './slices/landAddressSlice';
import landInfo from './slices/landInfoSlice';
import lawInfo from './slices/lawInfoSlice';
import landpurchaseProcedure from './slices/landpurchaseProcedureSlice';
import landEssentialKnowledge from './slices/landEssentialKnowledgeSlice';

const rootReducer = combineReducers({
  user: user.reducer,
  landaddress: landAddress.reducer,
  landinfo: landInfo.reducer,
  lawInfo: lawInfo.reducer,
  landpurchaseProcedure: landpurchaseProcedure.reducer,
  landEssentialKnowledge: landEssentialKnowledge.reducer,
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
