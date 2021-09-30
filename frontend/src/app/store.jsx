import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { dataTableApi } from '../features/dataTable/dataTableApi';
import { baseViewSlice } from '../features/baseView/baseViewSlice';
import { tumblerSlice } from '../features/tumbler/tumblerSlice';
import { fileApi } from '../features/fileInputForm/fileInputFormFileApi';
import { userApi } from '../features/user/userApi';
import auth from '../features/authorization/authorizationSlice';

const userPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
    [dataTableApi.reducerPath]: dataTableApi.reducer,
    baseViewReduser: baseViewSlice.reducer,
    tumblerReduser: tumblerSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: persistReducer(userPersistConfig, auth),
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    })
      .concat(dataTableApi.middleware)
      .concat(fileApi.middleware)
      .concat(userApi.middleware),
  ],
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
