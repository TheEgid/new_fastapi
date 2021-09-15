import { createSlice } from '@reduxjs/toolkit';

export const onlyTableSlice = createSlice({
  name: 'onlyTableReduser',
  initialState: {
    direction: 'asc',
    colName: 'id',
  },
  reducers: {
    setDirectionOrder: (state, action) => {
      state.direction = action.payload;
    },
    setColumnName: (state, action) => {
      state.colName = action.payload;
    },
  },
});

export const selectDirection = (state) => state.onlyTableReduser.direction;
export const selectColumnName = (state) => state.onlyTableReduser.colName;

export const { setDirectionOrder, setColumnName } = onlyTableSlice.actions;
