import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HabitOptions, HabitForUpdate } from '../pages/types';
import * as habitUtils from './habitUtils';
import { WeekStartOptions } from '../components/enumWeekStartOpthions';

type HabitsState = {
    habits: HabitOptions[],
    weekOffset: number,
};

const initialState: HabitsState = {
    habits: [],
    weekOffset: 0,
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
        updateHabit: (state, action: PayloadAction<{ options: HabitForUpdate, weekStart: WeekStartOptions }>) => {
            const { options, weekStart } = action.payload;
            const habit = state.habits.find(habit => habit.id === options.id);
            if (!habit) {
                return;
            }

            habit.name = options.name;
            habit.template = options.template;
            habit.selectedColor = options.selectedColor;
            habit.days = habitUtils.updateHabitDays(options.template, habit, weekStart)
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
            state.weekOffset = weekNumber;
        }
    },
});

export const { addHabit, updateHabit, updateStatus, deleteHabit, setWeek, setHabits } = habitsSlice.actions;
export default habitsSlice.reducer;