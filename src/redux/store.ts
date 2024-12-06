// src/store/index.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore file objects in the state
        ignoredPaths: ['registration.personalData.passportPhoto'],
      },
    }),
  // devTools: process.env.NODE_ENV !== 'production',
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define custom typed hooks
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;