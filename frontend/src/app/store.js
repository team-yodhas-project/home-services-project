import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { adminApi } from "../features/admin/adminAPI";

import { reviewApi } from "../features/reviews/reviewAPI";

import { bookingApi } from "../features/bookings/bookingAPI";

import { serviceApi } from "../features/services/serviceAPI";

export const store = configureStore({
  reducer: {

    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,

      [serviceApi.reducerPath]: serviceApi.reducer,
      [bookingApi.reducerPath]:
      bookingApi.reducer,
       [reviewApi.reducerPath]:
      reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(
      authApi.middleware,
      serviceApi.middleware,
      bookingApi.middleware,
      reviewApi.middleware,
      adminApi.middleware
    ),

});