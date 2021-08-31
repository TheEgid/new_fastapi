import { createSlice } from '@reduxjs/toolkit';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const FileInputFormSlice = createSlice({
  name: 'fileInputFormReduser',
  initialState: {
    fileName: '',
  },
  reducers: {
    ofileName: (state, action) => {
      state.fileName = `Файл: ${action.payload}`;
    },
  },
});

export const { ofileName } = FileInputFormSlice.actions;
export const selectFileName = (state) => state.fileInputFormReduser.fileName;
