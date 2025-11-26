import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    sidebarOpen: boolean;
}

const initialState: UIState = {
    sidebarOpen: true,
};

const sidebarUISlice = createSlice({
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
    }
});

export const { toggleSidebar, openSidebar, closeSidebar } = sidebarUISlice.actions;
export default sidebarUISlice.reducer;