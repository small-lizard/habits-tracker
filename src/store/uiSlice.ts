import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    sidebarOpen: boolean;
    currentHabitId: string | null;
}

const initialState: UIState = {
    sidebarOpen: true,
    currentHabitId: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebarOpen = !state.sidebarOpen;
        },
        openSidebar(state) {
            state.sidebarOpen = true;
        },
        closeSidebar(state) {
            state.sidebarOpen = false;
        },
        setCurrentHabitId(state, action: PayloadAction<string | null>) {
            state.currentHabitId = action.payload;
        },
    }
});

export const { toggleSidebar, openSidebar, closeSidebar, setCurrentHabitId } = uiSlice.actions;
export default uiSlice.reducer;