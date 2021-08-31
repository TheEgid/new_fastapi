import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const inputApi = createApi({
  reducerPath: 'inputApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.72/',
  }),
  endpoints: (builder) => ({
    AddCustomFile: builder.mutation({
      query: (body) => ({
        url: `/api/upload`,
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: ' application/json',
        },
        body,
      }),
    }),
  }),
});

export const { useAddCustomFileMutation } = inputApi;
export const {
  endpoints: { AddCustomFile },
} = inputApi;
