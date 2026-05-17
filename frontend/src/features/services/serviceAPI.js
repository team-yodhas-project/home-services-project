import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const serviceApi = createApi({
  reducerPath: "serviceApi",

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

  tagTypes: ["Services"],

  endpoints: (builder) => ({

    // GET SERVICES
    getServices: builder.query({

      query: ({
        keyword = "",
        address = "",
        category = "",
      }) => ({
        url: "/services",

        params: {
          keyword,
          address,
          category,
        },
      }),

      providesTags: ["Services"],
    }),

  }),
});

export const {
  useGetServicesQuery,
} = serviceApi;