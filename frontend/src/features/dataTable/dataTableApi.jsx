import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const mainApiUrl = `${process.env.REACT_APP_MAIN_API_URL}`;
const mainApiUrl = `http://www.filltext.com/`;

const urlpart =
  '%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%' +
  '7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D';

export const dataTableApi = createApi({
  reducerPath: 'dataTableApi',
  baseQuery: fetchBaseQuery({
    baseUrl: mainApiUrl,
  }),
  endpoints: (builder) => ({
    getDTable: builder.query({
      query: (rowAmount) => `?rows=${rowAmount}&id=${urlpart}`,
    }),
  }),
});

export const { useGetDTableQuery } = dataTableApi;
