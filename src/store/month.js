import { createSlice } from "@reduxjs/toolkit";

const monthSlice = createSlice({
  name: "month",
  initialState: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
  reducers: {
    increment: (state) => {
      if (state.month === 11) {
        state.month = 0;
        state.year += 1;
      } else {
        state.month += 1;
      }
    },
    decrement: (state) => {
      if (state.month === 0) {
        state.month = 11;
        state.year -= 1;
      } else {
        state.month -= 1;
      }
    },
  },
});

export const { increment, decrement } = monthSlice.actions;
export default monthSlice.reducer;
