import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HabitOptions, DayOptions, HabitForUpdate } from '../pages/HabitTracker/types';
import { getStartOfWeek } from '../utils/data-calculating';
import * as habitUtils from './habitUtils';

type HabitsState = {
    habits: HabitOptions[],
    currentFirstDay: number,
    week: number,
};

const currentFirstDay = getStartOfWeek(new Date());

const initialState: HabitsState = {
    habits: [],
    currentFirstDay: currentFirstDay,
    week: 0,
};

const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        setHabits: (state, action: PayloadAction<{ habits: HabitOptions[] }>) => {
            const { habits } = action.payload;

            state.habits = habitUtils.addCurrentWeek(habits, state.currentFirstDay);
        },
        addHabit: (state, action: PayloadAction<{ options: HabitOptions }>) => {
            const { options } = action.payload;

            state.habits = habitUtils.addHabit(state.habits, options, state.currentFirstDay);
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

            habitUtils.updateHabitWeeks(options.template, habit)
        },
        updateStatus: (state, action: PayloadAction<{ options: DayOptions, firstDay: number }>) => {
            const { options, firstDay } = action.payload;
            state.habits = habitUtils.updateStatus(state.habits, options, firstDay);
        },
        deleteHabit: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            state.habits = habitUtils.deleteHabit(state.habits, id);
        },
        setWeek: (state, action: PayloadAction<{ weekNumber: number }>) => {
            const { weekNumber } = action.payload;
            state.week = weekNumber;
            state.currentFirstDay = habitUtils.updateCurrentFirstDay(weekNumber);
        },
        addNewWeek: (state) => {
            state.habits = habitUtils.addCurrentWeek(state.habits, state.currentFirstDay);
        }
    },
});

export const { addHabit, updateHabit, updateStatus, deleteHabit, setWeek, setHabits, addNewWeek } = habitsSlice.actions;
export default habitsSlice.reducer;