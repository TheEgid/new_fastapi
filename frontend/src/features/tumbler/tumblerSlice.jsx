import { createSlice } from '@reduxjs/toolkit';

export const tumblerSlice = createSlice({
  name: 'tumblerReduser',
  initialState: {
    rowsQty: '30',
  },
  reducers: {
    changeRowQuantity: (state, action) => {
      state.rowsQty = action.payload;
    },
  },
});

export const { changeRowQuantity } = tumblerSlice.actions;
export const selectRowQuantity = (state) => state.tumblerReduser.rowsQty;
