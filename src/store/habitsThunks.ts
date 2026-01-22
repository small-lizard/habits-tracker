import { createAsyncThunk } from '@reduxjs/toolkit';
import * as habitsActions from '../store/habitsSlice';
import { DayOptions, HabitForUpdate, HabitOptions } from '../pages/HabitTracker/types';
import { RootState } from './store';
import { habitsServicesAdapter } from './habitsServices/habitsServicesAdapter';

export const initHabits = createAsyncThunk<void, boolean, { state: RootState }>(
    "habitsSlice/setHabits",
    async (isAuth: boolean, { dispatch }) => {
        const service = habitsServicesAdapter(isAuth);
        const habits = await service.getAll();

        dispatch(habitsActions.setHabits({ habits }));
    }
)

export const addHabitThunk = createAsyncThunk<void, HabitOptions, { state: RootState }>(
    "habitsSlice/addHabit",
    async (options: HabitOptions, { dispatch, getState }) => {
        dispatch(habitsActions.addHabit({ options }));
        const state = getState();
        const service = habitsServicesAdapter(state.auth.isAuth);

        await service.add(state.habits.habits)
    }
)

export const updateHabitThunk = createAsyncThunk<void, HabitForUpdate, { state: RootState }>(
    "habitsSlice/updateHabit",
    async (options: HabitForUpdate, { dispatch, getState }) => {
        dispatch(habitsActions.updateHabit({ options }));
        const state = getState();
        const service = habitsServicesAdapter(state.auth.isAuth)

        await service.update(state.habits.habits, options.id)
    }
)

export const updateStatusHabitThunk = createAsyncThunk<void, { options: DayOptions; firstDay: number }, { state: RootState }>(
    "habitsSlice/updateStatus",
    async (options, { dispatch, getState }) => {
        dispatch(habitsActions.updateStatus(options));
        const state = getState();
        const service = habitsServicesAdapter(state.auth.isAuth)

        await service.update(state.habits.habits, options.options.id)
    }
);

export const deleteHabitThunk = createAsyncThunk<void, string, { state: RootState }>(
    "habitsSlice/deleteHabit",
    async (id: string, { dispatch, getState }) => {
        dispatch(habitsActions.deleteHabit({ id }))
        const state = getState();
        const service = habitsServicesAdapter(state.auth.isAuth)

        await service.delete(state.habits.habits, id)
    }
)
