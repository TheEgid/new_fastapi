import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: 'anonymous',
  token: null,
  isLoggedIn: false,
};

const flattenObject = (obj) => {
  const flattened = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  });
  return flattened;
};

const addAccessToken = (obj) => {
  const raw = flattenObject(obj);
  if ('access_token' in raw) {
    raw.token = raw.access_token;
  }
  return raw;
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const credentials = addAccessToken(action.payload);
      state.user = credentials.email; // user;
      state.token = credentials.access_token;
      state.isLoggedIn = true;
    },
    removeCredetials: (state) => {
      state.user = 'anonymous';
      state.token = null;
      state.isLoggedIn = false;
    },
    setCurrentUser: (state, action) => {
      const credentials = action.payload;
      if (credentials !== undefined) {
        state.user = credentials.email; // user;
        state.isLoggedIn = true;
      } else {
        state.user = 'anonymous';
        state.token = null;
        state.isLoggedIn = false;
      }
    },
  },
});

export default slice.reducer;

export const { setCredentials, removeCredetials, setCurrentUser } = slice.actions;

export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getUserName = (state) => state.auth.user;
export const getUserToken = (state) => state.auth.token;
