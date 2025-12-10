// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import monthReducer from "./month";
export default configureStore({
  reducer: {
    theme: themeReducer,
    month: monthReducer
  },
});
