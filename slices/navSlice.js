import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    time: null,
};

//push

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.origin = action.payload;
        },
        setTime: (state, action) => {
            state.origin = action.payload;
        },
    },
});

export const { setOrigin, setDestination, setTime } = navSlice.actions;

//pull: selectors
export const selectOrigin = (state) => state.nav.origin; // direct return
export const selectDestination = (state) => state.nav.origin;
export const selectTime = (state) => state.nav.origin;

export default navSlice.reducer;
