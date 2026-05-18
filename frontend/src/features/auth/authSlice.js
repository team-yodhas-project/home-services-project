import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {

    // LOGIN
    builder.addMatcher(
      authApi.endpoints.loginUser.matchPending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
      }
    );

    builder.addMatcher(
      authApi.endpoints.loginUser.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error;
      }
    );

     // REGISTER

     builder.addMatcher(
      authApi.endpoints.registerUser.matchPending,

      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,

      (state, action) => {
        state.loading=false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem(
          "token",
          action.payload.token
        );
      }
    );

    builder.addMatcher(
      authApi.endpoints.registerUser.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    );


    // PROFILE
    builder.addMatcher(
      authApi.endpoints.getProfile.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    );

    builder.addMatcher(
      authApi.endpoints.getProfile.matchRejected,
      (state, action) => {
        state.loading=false;
        state.user = null;
        state.isAuthenticated = false;
        }
      );
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

