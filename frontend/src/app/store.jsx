import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { simpleTableSlice } from '../features/simpleTable/simpleTableSlice';
import { simpleTableApi } from '../features/simpleTable/simpleTableApi';
import { baseViewSlice } from '../features/baseView/baseViewSlice';
import { tumblerSlice } from '../features/tumbler/tumblerSlice';
import { fileApi } from '../features/fileInputForm/fileInputFormFileApi';

const store = configureStore({
  reducer: {
    baseViewReduser: baseViewSlice.reducer,
    tumblerReduser: tumblerSlice.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [simpleTableApi.reducerPath]: simpleTableApi.reducer,
    simpleTableReduser: simpleTableSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(simpleTableApi.middleware).concat(fileApi.middleware),
});

setupListeners(store.dispatch);

export default store;
