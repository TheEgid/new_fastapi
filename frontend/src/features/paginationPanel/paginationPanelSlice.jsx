// import { createSlice } from '@reduxjs/toolkit';
//
// export const paginationPanelSlice = createSlice({
//   name: 'paginationPanelReduser',
//   initialState: {
//     CurrPage: 1,
//   },
//   reducers: {
//     increment: (state) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     },
//     setPage: (state, action) => {
//       state.CurrPage = action.payload;
//       // eslint-disable-next-line no-console
//       console.log(state.CurrPage)
//     },
//   },
// });
//
//
//
// export const { increment, decrement, setPage } = paginationPanelSlice.actions;
// export const selectPage = (state) => state.paginationPanelReduser.value;
