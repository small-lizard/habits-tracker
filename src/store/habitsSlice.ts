import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HabitOptions, HabitForUpdate } from '../pages/HabitTracker/types';
import * as habitUtils from './habitUtils';

type HabitsState = {
    habits: HabitOptions[],
    week: number,
};

const initialState: HabitsState = {
    habits: [],
    week: 0,
};

const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        setHabits: (state, action: PayloadAction<{ habits: HabitOptions[] }>) => {
            state.habits = action.payload.habits;
        },
        addHabit: (state, action: PayloadAction<{ options: HabitOptions }>) => {
            state.habits.push(action.payload.options)
        },
        updateHabit: (state, action: PayloadAction<{ options: HabitForUpdate }>) => {
            const { options } = action.payload;
            const habit = state.habits.find(habit => habit.id === options.id);
            if (!habit) {
                return;
            }

            habit.name = options.name;
            habit.template = options.template;
            habit.selectedColor = options.selectedColor;
            habit.days = habitUtils.updateHabitDays(options.template, habit, options.weekDays)
        },
        updateStatus: (state, action: PayloadAction<{ id: any, dateKey: string }>) => {
            const { id, dateKey } = action.payload;
            state.habits = habitUtils.updateStatus(state.habits, id, dateKey);
        },
        deleteHabit: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            state.habits = habitUtils.deleteHabit(state.habits, id);
        },
        setWeek: (state, action: PayloadAction<{ weekNumber: number }>) => {
            const { weekNumber } = action.payload;
            state.week = weekNumber;
        }
    },
});

export const { addHabit, updateHabit, updateStatus, deleteHabit, setWeek, setHabits } = habitsSlice.actions;
export default habitsSlice.reducer;