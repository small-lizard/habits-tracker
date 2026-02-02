import { createSelector } from '@reduxjs/toolkit';
import { HabitOptions } from '../pages/HabitTracker/types';
import { getStartOfWeek } from '../utils/dateUtils';
import { RootState } from './store';

// export const countWeekStreak = (habit: HabitOptions): number => {

//     const currentWeek = getStartOfWeek(new Date())
//     const weeksKeys = Object.keys(habit.weeks).sort((a, b) => Number(b) - Number(a));
//     const sortedWeeks = weeksKeys.filter((key) => Number(key) < currentWeek);
//     const weeks = sortedWeeks.map((key: string) => habit.weeks[Number(key)]);

//     let streak = 0;

//     for (const week of weeks) {
//         if (!week.includes(HabitStatus.Pending)) {
//             streak++;
//         }
//         else {
//             break;
//         }
//     }

//     if (!habit.weeks[currentWeek].includes(HabitStatus.Pending)) {
//         streak++;
//     }

//     return streak;
// };

export const selectUiFirstDay = createSelector(
    [
        (state: RootState) => state.settings.uiWeekStart,
        (state: RootState) => state.habits.week
    ],
    (uiWeekStart, week) =>
        getStartOfWeek(new Date(), uiWeekStart, week)
);