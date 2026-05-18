
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("x-auth-token", token);
      }

      return headers;
    },
  }),

  tagTypes: ["Bookings"],

  endpoints: (builder) => ({

    // CREATE BOOKING
    createBooking: builder.mutation({

      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Bookings"],
    }),

  }),
});

export const {
  useCreateBookingMutation,
} = bookingApi;

