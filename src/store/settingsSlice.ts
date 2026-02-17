import { createSlice } from "@reduxjs/toolkit";
import { WeekStartOptions } from "../components/enumWeekStartOpthions";

type settingsState = {
    uiWeekStart: WeekStartOptions,
};

const savedSettings = localStorage.getItem('settings');

const initialState: settingsState = {
    uiWeekStart: savedSettings === WeekStartOptions.Monday 
    ? WeekStartOptions.Monday 
    : WeekStartOptions.Sunday,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setWeekStart(state, actions) {
            state.uiWeekStart = actions.payload;
            localStorage.setItem('settings', actions.payload)
        }
    }
})

export const { setWeekStart } = settingsSlice.actions;
export default settingsSlice.reducer;