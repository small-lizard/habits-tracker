import { createAsyncThunk } from '@reduxjs/toolkit';
import * as habitsActions from './habitsSlice';
import { HabitForUpdate, HabitOptions } from '../pages/HabitTracker/types';
import { RootState } from './store';
import { habitsServicesAdapter } from '../services/habitsServices/habitsServicesAdapter';
import { addCurrentWeek, addNewDates } from './habitUtils';
import { getWeekDates } from '../utils/dateUtils';
import { selectUiFirstDay } from './selectors';

type UpdateStatus = {
    id: any,
    dateKey: string
}

export const initHabits = createAsyncThunk<void, boolean, { state: RootState }>(
    "habitsSlice/setHabits",
    async (isAuth: boolean, { dispatch, getState }) => {
        const state = getState();
        const uiFirstDay = selectUiFirstDay(state);
        const weekDates = getWeekDates(uiFirstDay);
        const service = habitsServicesAdapter(isAuth);
        const habits = await service.getAll();


        const updatedHabits = habits.map((habit: any) => ({
            ...habit,
            days: {
                ...habit.days,
                ...addCurrentWeek(habit.template, weekDates)
            }
        }));

        dispatch(habitsActions.setHabits({ habits: updatedHabits }));
    }
)

export const addHabitThunk = createAsyncThunk<void, HabitOptions, { state: RootState }>(
    "habitsSlice/addHabit",
    async (options: HabitOptions, { dispatch, getState }) => {
        dispatch(habitsActions.addHabit({ options }));
        const state = getState();
        const service = habitsServicesAdapter(state.auth.isAuth);
        service.sync(state.habits.habits)

        await service.add()
    }
)

export const updateHabitThunk = createAsyncThunk<void, HabitForUpdate, { state: RootState }>(
    "habitsSlice/updateHabit",
    async (options: HabitForUpdate, { dispatch, getState }) => {
        const state = getState();
        const weekStart = state.settings.uiWeekStart;
        dispatch(habitsActions.updateHabit({ options, weekStart }));
        const service = habitsServicesAdapter(state.auth.isAuth)
        service.sync(state.habits.habits)

        await service.update(options.id)
    }
)

export const updateStatusHabitThunk = createAsyncThunk<void, UpdateStatus, { state: RootState }>(
    "habitsSlice/updateStatus",
    async (options: UpdateStatus, { dispatch, getState }) => {
        dispatch(habitsActions.updateStatus(options));
        const state = getState();
        const service = habitsServicesAdapter(state.auth.isAuth)
        service.sync(state.habits.habits)

        await service.update(options.id)
    }
);

export const addNewDaysToHabitsThunk = createAsyncThunk<void, void, { state: RootState }>(
    "habitsSlice/addNewDaysToHabits",
    async (_, { dispatch, getState }) => {
        const state = getState();
        const habits = state.habits.habits;
        const weekOffset = state.habits.weekOffset;
        const service = habitsServicesAdapter(state.auth.isAuth);
        const uiFirstDay = selectUiFirstDay(state);
        const weekDates = getWeekDates(uiFirstDay);

        const updatedHabits = habits.map((habit: any) => ({
            ...habit,
            days: {
                ...habit.days,
                ...addNewDates(habit, weekDates, weekOffset)
            }
        }));

        dispatch(habitsActions.setHabits({ habits: updatedHabits }));
        service.sync(updatedHabits)

        for (const habit of updatedHabits) {
            await service.update(habit.id);
        }
    }
);

export const deleteHabitThunk = createAsyncThunk<void, string, { state: RootState }>(
    "habitsSlice/deleteHabit",
    async (id: string, { dispatch, getState }) => {
        dispatch(habitsActions.deleteHabit({ id }))
        const state = getState();
        const service = habitsServicesAdapter(state.auth.isAuth)
        service.sync(state.habits.habits)

        await service.delete(id)
    }
);
