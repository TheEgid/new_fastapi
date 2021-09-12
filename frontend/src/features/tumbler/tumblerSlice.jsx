import { createSlice } from '@reduxjs/toolkit';

export const tumblerSlice = createSlice({
  name: 'tumblerReduser',
  initialState: {
    rowsQty: '30',
  },
  reducers: {
    rowQuantity: (state, action) => {
      state.rowsQty = action.payload;
    },
  },
});

export const { rowQuantity } = tumblerSlice.actions;
export const selectRowQuantity = (state) => state.tumblerReduser.rowsQty;
