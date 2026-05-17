import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({

  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",

    prepareHeaders: (headers) => {

      const token = localStorage.getItem("token");

      if (token) {
        headers.set(
          "x-auth-token",token
        );
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({

    
    registerUser: builder.mutation({

      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),

    }),

    

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response,
    }),

    
    getProfile: builder.query({

      query: () => "/auth/profile",

    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
} = authApi;

