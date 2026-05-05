import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: '',
  isAuth: null,
  name: '',
  email: '',
  hasPassword: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.id;
      state.isAuth = action.payload.isAuth;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.hasPassword = action.payload.hasPassword;
    },
    logout(state) {
      state.userId = '';
      state.isAuth = null;
      state.name = '';
      state.email = '';
      state.hasPassword = null
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
