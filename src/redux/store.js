import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auths/slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;