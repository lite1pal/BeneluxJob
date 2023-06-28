import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setCount } = appSlice.actions;

export default appSlice.reducer;
