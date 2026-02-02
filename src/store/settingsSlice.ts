import { createSlice } from "@reduxjs/toolkit";
import { WeekStartOptions } from "../components/enumWeekStartOpthions";

type settingsState = {
    uiWeekStart: WeekStartOptions,
};

const initialState: settingsState = {
    uiWeekStart: WeekStartOptions.Sunday,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setWeekStart(state, actions) {
            state.uiWeekStart = actions.payload;
        }
    }
})

export const { setWeekStart } = settingsSlice.actions;
export default settingsSlice.reducer;
