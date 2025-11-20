import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: '',
  isAuth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.id;
      state.isAuth = action.payload.isAuth;
    },
    logout(state) {
      state.userId = '';
      state.isAuth = null;
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
