import { createSlice } from '@reduxjs/toolkit';

export const paginationPanelSlice = createSlice({
  name: 'paginationPanelReduser',
  initialState: {
    pageData: [null],
  },
  reducers: {
    setDataPerPage: (state, action) => {
      state.pageData = action.payload;
    },
  },
});

export const { setDataPerPage } = paginationPanelSlice.actions;
export const selectDataPerPage = (state) => state.paginationPanelReduser.pageData;
