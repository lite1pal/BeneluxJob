import { createSlice } from "@reduxjs/toolkit";

let status = "prod";

const initialState = {
  isAuth: true,
  count: 0,
  jobs: [],
  apiUrl:
    status === "dev"
      ? "http://localhost:4001"
      : "https://benelux-job-server.onrender.com",
  currentJob: {},
  screenWidth: window.innerWidth,
  scrollY: window.scrollY,
  AfterCreatedJobVision: false,
  isLoading: false,
  isSearchingJobs: false,
  foundJobs: [],
  pageNumber: 0,
  mainPageScrollVision: true,
  FormApplyVision: false,
  scrollYbefore: 0,
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
    setScrollY: (state, action) => {
      state.scrollY = action.payload;
    },
    setAfterCreatedJobVision: (state, action) => {
      state.AfterCreatedJobVision = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsSearchingJobs: (state, action) => {
      state.isSearchingJobs = action.payload;
    },
    setFoundJobs: (state, action) => {
      state.foundJobs = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setMainPageScrollVision: (state, action) => {
      state.mainPageScrollVision = action.payload;
    },
    setFormApplyVision: (state, action) => {
      state.FormApplyVision = action.payload;
    },
    setScrollYbefore: (state, action) => {
      state.scrollYbefore = action.payload;
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
  setIsLoading,
  setIsSearchingJobs,
  setFoundJobs,
  setScrollY,
  setPageNumber,
  setMainPageScrollVision,
  setFormApplyVision,
  setScrollYbefore,
} = appSlice.actions;

export default appSlice.reducer;
