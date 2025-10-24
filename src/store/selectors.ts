import { HabitStatus, HabitOptions } from '../pages/HabitTracker/types';
import { getStartOfWeek } from '../utils/data-calculating';

export const selectWeekStreak = (habit: HabitOptions): number => {

    const currentWeek = getStartOfWeek(new Date())
    const weeksKeys = Object.keys(habit.weeks).sort((a, b) => Number(b) - Number(a));
    const sortedWeeks = weeksKeys.filter((key) => Number(key) < currentWeek);
    const weeks = sortedWeeks.map((key: string) => habit.weeks[Number(key)]);

    let streak = 0;

    for (const week of weeks) {
        if (!week.includes(HabitStatus.Pending)) {
            streak++;
        }
        else {
            break;
        }
    }

    if (!habit.weeks[currentWeek].includes(HabitStatus.Pending)) {
        streak++;
    }

    return streak;
};
