import { configureStore } from '@reduxjs/toolkit';
import habitsReducer from './habitsSlice';
import authReducer from './authSlice';
import uiReducer from './sidebarUISlice';
import settingsReducer from './settingsSlice'

export const store = configureStore({
  reducer: {
    habits: habitsReducer,
    auth: authReducer,
    ui: uiReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
