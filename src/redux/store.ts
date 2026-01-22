import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './slices/AdminsSlice';
import pageStateSlice from './slices/pageStateSlice';

export const store = configureStore({
  reducer: {
    usersSlice: usersSlice,
    pageState: pageStateSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
