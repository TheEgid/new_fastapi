import { createSlice } from '@reduxjs/toolkit';

export const baseViewSlice = createSlice({
  name: 'baseViewReduser',
  initialState: {
    bool_value: false,
  },
  reducers: {
    switcher: (state) => {
      state.bool_value = state.bool_value !== true;
    },
  },
});

export const { switcher } = baseViewSlice.actions;
export const selectbaseViewCondition = (state) => state.baseViewReduser.bool_value;
