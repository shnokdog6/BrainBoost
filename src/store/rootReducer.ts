import {combineReducers} from "@reduxjs/toolkit";
import { userSlice } from "../models/userSlice";

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer
});