import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { onlyTableSlice } from '../features/onlyTable/onlyTableSlice';
import { dataTableApi } from '../features/dataTable/dataTableApi';
import { baseViewSlice } from '../features/baseView/baseViewSlice';
import { tumblerSlice } from '../features/tumbler/tumblerSlice';
import { fileApi } from '../features/fileInputForm/fileInputFormFileApi';

const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
    [dataTableApi.reducerPath]: dataTableApi.reducer,
    baseViewReduser: baseViewSlice.reducer,
    tumblerReduser: tumblerSlice.reducer,
    // onlyTableReduser: onlyTableSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataTableApi.middleware).concat(fileApi.middleware),
});

setupListeners(store.dispatch);

export default store;
