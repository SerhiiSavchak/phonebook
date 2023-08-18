import { createSlice } from '@reduxjs/toolkit';
import { login, register, logOut, refreshUser } from './authOperations';

const authInitialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  // Имя слайса
  name: 'auth',
  // Начальное состояние редюсера слайса
  initialState: authInitialState,
  // Объект редюсеров
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = { ...action.payload.user };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      });
  },
});

// Редюсер слайса
export const authReducer = authSlice.reducer;
