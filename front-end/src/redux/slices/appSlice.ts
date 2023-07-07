import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: true,
  count: 0,
  jobs: [],
  apiUrl: "http://localhost:4001",
  currentJob: {},
  screenWidth: window.innerWidth,
  AfterCreatedJobVision: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
    setScreenWidth: (state, action) => {
      state.screenWidth = action.payload;
    },
    setAfterCreatedJobVision: (state, action) => {
      state.AfterCreatedJobVision = action.payload;
    },
  },
});

export const {
  setIsAuth,
  setCount,
  setJobs,
  setCurrentJob,
  setScreenWidth,
  setAfterCreatedJobVision,
} = appSlice.actions;

export default appSlice.reducer;
