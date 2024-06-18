import { createSlice } from '@reduxjs/toolkit';
// import { Buffer } from 'buffer';
// import axios from 'axios';

// import { config as loginConfig } from '../helpers';

const initialState = {
  token: '',
  token1: '',
  user: null,
  webUser: null,
  user1: null,
  webUser1: null,
  toRemember: false,
  isOwner: false,
  isOwner1: false,
  partnerUser: null,
  toPartnerRemember: false,
  isPartner: false,
  isPartner1: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setToken1: (state, action) => {
      state.token1 = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.webUser = action.payload;
      state.isPartner = false;
    },
    setUser1: (state, action) => {
      state.user1 = action.payload;
      state.webUser1 = action.payload;
      state.isPartner1 = false;
    },
    setPartnerUser: (state, action) => {
      state.user = action.payload;
      state.partnerUser = action.payload;
      state.isPartner = true;
      state.isOwner = false;
    },
    setIsOwner: (state, action) => {
      state.isOwner = action.payload;
    },
    setIsOwner1: (state, action) => {
      state.isOwner1 = action.payload;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isOwner = false;
    },
    setLogin: (state, action) => {
      state.toRemember = action.payload?.toRemember;
    },
    setPartnerLogin: (state, action) => {
      state.toPartnerRemember = action.payload?.toPartnerRemember;
    },
  }
});

export const { setToken, setUser, logout, setLogin, setIsOwner, setPartnerUser, setPartnerLogin } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;