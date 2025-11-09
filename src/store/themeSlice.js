import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", // or 'dark'
  colors: {
    background: "#d8d9d2", // your current color
    text: "#000000",
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.mode === "light") {
        state.mode = "dark";
        state.colors = {
          background: "#62dafb", // dark background
          text: "#000000ff",
        };
      } else {
        state.mode = "light";
        state.colors = {
          background: "#d8d9d2", // your lilac-gray
          text: "#000000",
        };
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
