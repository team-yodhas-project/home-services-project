import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("x-auth-token", token);
    }
    return headers;
  },
});

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery,
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => "/admin/stats",
    }),
    getAdminUsers: builder.query({
      query: () => "/admin/users",
    }),
    getAdminProviders: builder.query({
      query: () => "/admin/providers",
    }),
    getAdminServices: builder.query({
      query: () => "/admin/services",
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAdminUsersQuery,
  useGetAdminProvidersQuery,
  useGetAdminServicesQuery,
} = adminApi;
