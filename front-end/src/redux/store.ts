import { configureStore } from "@reduxjs/toolkit";
import countSliceReducer from "./slices/countSlice";

export const store = configureStore({
  reducer: {
    count: countSliceReducer,
  },
});
