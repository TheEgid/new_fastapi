import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mainApiUrl = `${process.env.REACT_APP_MAIN_API_URL}`;

export const inputApi = createApi({
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
  }),
});

export const { useAddCustomFileMutation } = inputApi;
