import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("x-auth-token", token);
      }

      return headers;
    },
  }),

  tagTypes: ["Reviews"],

  endpoints: (builder) => ({

    // GET SERVICE REVIEWS
    getServiceReviews: builder.query({

      query: (serviceId) =>
        `/reviews/service/${serviceId}`,

      providesTags: ["Reviews"],
    }),

  }),
});

export const {
  useGetServiceReviewsQuery,
} = reviewApi;