import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: '',
  isAuth: null,
  name: '',
  email: '',
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
    },
    logout(state) {
      state.userId = '';
      state.isAuth = null;
      state.name = '';
      state.email = '';
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
