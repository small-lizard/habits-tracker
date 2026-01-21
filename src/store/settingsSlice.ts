import { createSlice } from "@reduxjs/toolkit";
import { WeekStartOptions } from "../enumWeekStartOptions";

const savedSettings = localStorage.getItem('settings');
const parsedSettings = savedSettings ? JSON.parse(savedSettings) : {};

interface settingState {
    weekStart: WeekStartOptions;
}

const initialState: settingState = {
    weekStart: (parsedSettings.weekStart as WeekStartOptions) ?? WeekStartOptions.Sunday,
};


const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setWeekStart(state, action) {
            state.weekStart = action.payload;
            const currentSettings = JSON.parse(localStorage.getItem('settings') || '{}');
            localStorage.setItem(
                'settings',
                JSON.stringify({ ...currentSettings, weekStart: action.payload })
            );
        },
    }
})

export const { setWeekStart } = settingSlice.actions;
export default settingSlice.reducer;