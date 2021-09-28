import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['User'],
  endpoints: (builder) => ({
    fetchCurrentUser: builder.query({
      query: () => `/users/me`,
      invalidatesTags: ['User'],
    }),

    createUser: builder.mutation({
      query: ({ user }) => ({
        url: '/sign-up',
        method: 'POST',
        headers: { 'Content-Type': `application/json` },
        body: {
          name: user.email,
          email: user.email,
          password: user.password,
        },
      }),
      invalidatesTags: ['User'],
    }),

    loginUser: builder.mutation({
      query: ({ user }) => ({
        url: '/auth',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${user.email}&password=${user.password}`,
      }),
      invalidatesTags: ['User'],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useFetchCurrentUserQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userApi;
