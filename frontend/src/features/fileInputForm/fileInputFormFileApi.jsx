import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mainApiUrl = `${process.env.REACT_APP_MAIN_API_URL}`;

export const fileApi = createApi({
  reducerPath: 'inputApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${mainApiUrl}`,
  }),
  endpoints: (builder) => ({
    AddCustomFile: builder.mutation({
      query: (body) => ({
        url: `/api/upload`,
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body,
      }),
    }),
    AddFileData: builder.mutation({
      query: (body) => ({
        url: `/api/files`,
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body,
      }),
    }),
  }),
});

export const { useAddFileDataMutation, useAddCustomFileMutation } = fileApi;
