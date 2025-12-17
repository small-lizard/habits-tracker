import axios from "axios";
import { HabitOptions } from "../pages/HabitTracker/types";

const API_URL = "https://habits-tracker-server-r9wc.onrender.com";

export const getAllHabits = async () => {
    try {
        const response = await axios.get(`${API_URL}/habits`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addHabit = async (habit: HabitOptions) => {
    try {
        const response = await axios.post(`${API_URL}/habits/add`, habit, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateHabit = async (habit: HabitOptions) => {
    try {
        const response = await axios.post(`${API_URL}/habits/update`, habit, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteHabitApi = async (id: string) => {
    try {
        await axios.delete(`${API_URL}/habits/delete/${id}`, { withCredentials: true });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

