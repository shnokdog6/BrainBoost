import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    lowPop: 0,
    memorySweep: 0,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLowPopScore(state, action: PayloadAction<number>) {
            state.lowPop = action.payload;
        },
        setMemorySweepScore(state, action: PayloadAction<number>) {
            state.memorySweep = action.payload;
        },
    }
});

export const {setLowPopScore, setMemorySweepScore} = userSlice.actions;