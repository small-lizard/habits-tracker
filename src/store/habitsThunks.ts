import { createAsyncThunk } from '@reduxjs/toolkit';
import * as habitsActions from '../store/habitsSlice';
import * as habitsService from '../services/habitsService';
import { DayOptions, HabitForUpdate, HabitOptions } from '../pages/HabitTracker/types';
import { RootState } from './store';

export const initHabits = createAsyncThunk<void, boolean, { state: RootState }>(
    "habitsSlice/setHabits",
    async (isAuth: boolean, { dispatch }) => {

        if (!isAuth) {
            const saved = localStorage.getItem('habits');
            const habits = saved ? JSON.parse(saved) : [];

            dispatch(habitsActions.setHabits({ habits }));
        } else {
            const response = await habitsService.getAllHabits();

            dispatch(habitsActions.setHabits({ habits: response }));
        }
    }
)

export const addHabitThunk = createAsyncThunk<void, HabitOptions, { state: RootState }>(
    "habitsSlice/addHabit",
    async (options: HabitOptions, { dispatch, getState }) => {
        dispatch(habitsActions.addHabit({ options }));
        const state = getState();
        const isAuth = state.auth.isAuth;
        const newHabit = state.habits.habits.at(-1);

        if (isAuth && newHabit) {
            await habitsService.addHabit(newHabit);
        } else {
            localStorage.setItem('habits', JSON.stringify(state.habits.habits));
        }
    }
)

export const updateHabitThunk = createAsyncThunk<void, HabitForUpdate, { state: RootState }>(
    "habitsSlice/updateHabit",
    async (options: HabitForUpdate, { dispatch, getState }) => {
        dispatch(habitsActions.updateHabit({ options }));
        const state = getState();
        const isAuth = state.auth.isAuth;
        const newHabit = state.habits.habits.find(habit => habit.id === options.id)

        if (isAuth && newHabit) {
            await habitsService.updateHabit(newHabit);
        } else {
            localStorage.setItem('habits', JSON.stringify(state.habits.habits));
        }
    }
)


export const updateStatusHabitThunk = createAsyncThunk<void, { options: DayOptions; firstDay: number }, { state: RootState }>(
    "habitsSlice/updateStatus",
    async (options, { dispatch, getState }) => {
        dispatch(habitsActions.updateStatus(options));
        const state = getState();
        const isAuth = state.auth.isAuth;
        const newHabit = state.habits.habits.find(habit => habit.id === options.options.id)

        if (isAuth && newHabit) {
            await habitsService.updateHabit(newHabit);
        } else {
            localStorage.setItem('habits', JSON.stringify(state.habits.habits));
        }
    }
);


export const deleteHabitThunk = createAsyncThunk<void, string, { state: RootState }>(
    "habitsSlice/addHabit",
    async (id: string, { dispatch, getState }) => {
        dispatch(habitsActions.deleteHabit({ id }))
        const state = getState();
        const isAuth = state.auth.isAuth;

        if (isAuth) {
            await habitsService.deleteHabit(id)
        } else {
            localStorage.setItem('habits', JSON.stringify(state.habits.habits));
        }

    }
)
