import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mainApiUrl = `${process.env.REACT_APP_MAIN_API_URL}`;

const urlpart =
  '%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%' +
  '7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D';

export const simpleTableApi = createApi({
  reducerPath: 'simpleTableApi',
  baseQuery: fetchBaseQuery({
    baseUrl: mainApiUrl,
  }),
  endpoints: (builder) => ({
    getSimpleTable: builder.query({
      query: (rowAmount) => `?rows=${rowAmount}&id=${urlpart}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the DEFINED ENDPOINTS
export const { useGetSimpleTableQuery } = simpleTableApi;