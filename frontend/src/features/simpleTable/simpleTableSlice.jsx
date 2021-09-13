import { createSlice } from '@reduxjs/toolkit';

export const simpleTableSlice = createSlice({
  name: 'simpleTableReduser',
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

export const selectDirection = (state) => state.simpleTableReduser.direction;
export const selectColumnName = (state) => state.simpleTableReduser.colName;

export const { setDirectionOrder, setColumnName } = simpleTableSlice.actions;
