import { getStartOfWeek } from '../components/WeekDays/WeekDays';
import { Status, HabitOptions } from '../types';

export const selectWeekStreak = (habit: HabitOptions): number => {

    const currentWeek = getStartOfWeek(new Date())
    const weeksKeys = Object.keys(habit.weeks).sort((a, b) => Number(b) - Number(a));
    const sortedWeeks = weeksKeys.filter((key) => Number(key) <= currentWeek);
    const weeks = sortedWeeks.map((key: string) => habit.weeks[Number(key)]);

    let streak = 0;

    for (const week of weeks) {
        if (!week.includes(Status.Pending)) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
};
