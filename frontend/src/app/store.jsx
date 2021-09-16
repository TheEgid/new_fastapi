import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { onlyTableSlice } from '../features/onlyTable/onlyTableSlice';
import { stubTableApi } from '../features/stubTable/stubTableApi';
import { baseViewSlice } from '../features/baseView/baseViewSlice';
import { tumblerSlice } from '../features/tumbler/tumblerSlice';
// import { paginationPanelSlice } from '../features/paginationPanel/paginationPanelSlice';
import { fileApi } from '../features/fileInputForm/fileInputFormFileApi';

const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
    [stubTableApi.reducerPath]: stubTableApi.reducer,
    baseViewReduser: baseViewSlice.reducer,
    tumblerReduser: tumblerSlice.reducer,
    // paginationPanelReduser: paginationPanelSlice.reducer,
    onlyTableReduser: onlyTableSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stubTableApi.middleware).concat(fileApi.middleware),
});

setupListeners(store.dispatch);

export default store;
