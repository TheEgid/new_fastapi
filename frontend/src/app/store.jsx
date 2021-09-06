import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from '../features/pokemon/pokemonSlice';
import { simpleTableApi } from '../features/simpleTable/simpleTableSlice';
import { baseViewSlice } from '../features/baseView/baseViewSlice';
import { tumblerSlice } from '../features/tumbler/tumblerSlice';
import { fileApi } from '../features/fileInputForm/fileInputFormFileSlice';

const store = configureStore({
  reducer: {
    baseViewReduser: baseViewSlice.reducer,
    tumblerReduser: tumblerSlice.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [simpleTableApi.reducerPath]: simpleTableApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(pokemonApi.middleware)
      .concat(simpleTableApi.middleware)
      .concat(fileApi.middleware),
});

setupListeners(store.dispatch);

export default store;
