import { createSlice } from "@reduxjs/toolkit";

const itemUpdated = createSlice({
    name: "updatedItem",
    initialState: 0,
    reducers: {
        setItemUpdated: (state) => {
            return state + 1
        }
    }
})

export const { setItemUpdated } = itemUpdated.actions
export default itemUpdated.reducer