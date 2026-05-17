import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { adminApi } from "../features/admin/adminAPI";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, adminApi.middleware),
});