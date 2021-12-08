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
            state.destination = action.payload;
        },
        setTime: (state, action) => {
            state.time = action.payload;
        },
    },
});

export const { setOrigin, setDestination, setTime } = navSlice.actions;

//pull: selectors
export const selectOrigin = (state) => state.nav.origin; // direct return
export const selectDestination = (state) => state.nav.destination;
export const selectTime = (state) => state.nav.time;

export default navSlice.reducer;
