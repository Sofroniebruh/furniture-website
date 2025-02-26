import { configureStore } from "@reduxjs/toolkit";
import itemUpdatedReducer from "./slices/itemSlice";
import userIdReducer from "./slices/userIdSlice"

export const storage = configureStore({
    reducer: {
        updatedItem: itemUpdatedReducer,
        userId: userIdReducer,
    },
    devTools: process.env.NODE_ENV !== "production"
})

export type RootState = ReturnType<typeof storage.getState>;
export type AppDispatch = typeof storage.dispatch;