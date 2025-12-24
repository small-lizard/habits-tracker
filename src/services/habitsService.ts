import { HabitOptions } from "../pages/HabitTracker/types";
import { http } from "./http";

export const getAllHabits = async () => {
    try {
        const { data } = await http.get('/habits');
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addHabit = async (habit: HabitOptions) => {
    try {
        const { data }  = await http.post('/habits/add', habit);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateHabit = async (habit: HabitOptions) => {
    try {
        const { data }  = await http.post('/habits/update', habit);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteHabit = async (id: string) => {
    try {
        await http.delete(`/habits/delete/${id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

