import { createSelector } from '@reduxjs/toolkit';
import { getStartOfWeek } from '../utils/dateUtils';
import { RootState } from './store';

export const selectUiFirstDay = createSelector(
    [
        (state: RootState) => state.settings.uiWeekStart,
        (state: RootState) => state.habits.weekOffset
    ],
    (uiWeekStart, weekOffset) =>
        getStartOfWeek(new Date(), uiWeekStart, weekOffset)
);