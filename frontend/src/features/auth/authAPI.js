import { createApi, fetchBaseQuery }
from "@reduxjs/toolkit/query/react";

export const authApi = createApi({

  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",

    prepareHeaders: (headers) => {

      const token =
        localStorage.getItem("token");

      if (token) {
        headers.set(
          "authorization",
          `Bearer ${token}`
        );
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({

    // REGISTER
    registerUser: builder.mutation({

      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),

    }),

    // LOGIN
    loginUser: builder.mutation({

      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

    }),

    // PROFILE
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

