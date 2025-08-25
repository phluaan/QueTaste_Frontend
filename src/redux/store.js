import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auths/slices/authSlice";
import userReducer from "../features/user/slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;