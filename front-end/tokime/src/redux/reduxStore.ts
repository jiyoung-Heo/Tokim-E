import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 기본적으로 localStorage를 사용합니다.
import rootReducer from './store'; // 작성한 리듀서들을 임포트합니다.

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // 여기서는 persistedReducer를 전달합니다.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 비직렬화 데이터 허용
    }),
});

export const persistor = persistStore(store);
