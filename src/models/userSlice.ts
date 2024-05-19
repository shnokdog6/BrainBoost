import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    lowPop: 0,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLowPopScore(state, action: PayloadAction<number>) {
            state.lowPop = action.payload;
        }
    }
});

export const {setLowPopScore} = userSlice.actions;