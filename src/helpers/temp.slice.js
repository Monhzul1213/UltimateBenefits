import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const initialState = {
  loggedIn: false,
  categoryColors: [],
  systemTypes: [],
  categoryClass: [],
};

export const tempSlice = createSlice({
  name: 'temp',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setCategoryColors: (state, action) => {
      state.categoryColors = action.payload?.sort((a, b) => a.valueNum - b.valueNum);
    },
    setSystemTypes: (state, action) => {
      state.systemTypes = action.payload?.sort((a, b) => a.valueNum - b.valueNum);
    },
    setCategoryClass: (state, action) => {
      state.categoryClass = action.payload?.sort((a, b) => a.valueNum - b.valueNum);
    },
  }
});



export const { setIsLoggedIn, setCategoryColors, setSystemTypes, setCategoryClass } = tempSlice.actions;

export const tempReducer = tempSlice.reducer;