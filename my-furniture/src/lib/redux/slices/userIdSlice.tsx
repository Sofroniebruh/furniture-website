import { createSlice } from "@reduxjs/toolkit";

const userIdSlice = createSlice({
    name: "userId",
    initialState: "",
    reducers: {
        setUserId(state, action) {
            state = action.payload
        }
    }
})

export const { setUserId } = userIdSlice.actions;
export default userIdSlice.reducer; 