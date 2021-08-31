import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from '../features/pokemon/pokemonSlice';
import { simpleTableApi } from '../features/simpleTable/simpleTableSlice';
import { baseViewSlice } from '../features/baseView/baseViewSlice';
import { tumblerSlice } from '../features/tumbler/tumblerSlice';
import { FileInputFormSlice } from '../features/fileInputForm/fileInputFormSlice';

const store = configureStore({
  reducer: {
    baseViewReduser: baseViewSlice.reducer,
    tumblerReduser: tumblerSlice.reducer,
    fileInputFormReduser: FileInputFormSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [simpleTableApi.reducerPath]: simpleTableApi.reducer,
  },

  // eslint-disable-next-line max-len
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware).concat(simpleTableApi.middleware),
});

setupListeners(store.dispatch);

export default store;
