import { HabitOptions } from '../pages/types';
import { formatDate, getStartOfWeek, getWeekDates } from '../utils/dateUtils';
import { WeekStartOptions } from '../components/enumWeekStartOpthions';

export const countWeekStreak = (habit: HabitOptions, weekStartOption: WeekStartOptions): number => {
    const habitDays = habit.days;

    const firstDayInHabitDays = Object.keys(habitDays).sort()[0];
    const firstHabitWeekStart = getStartOfWeek(new Date(firstDayInHabitDays), weekStartOption, 0);
    const currentWeekStart = getStartOfWeek(new Date, weekStartOption, -1);

    let streak = 0;

    while (currentWeekStart >= firstHabitWeekStart) {
        const week = getWeekDates(new Date(currentWeekStart));

        const unfulfiledWeek = week.some(date => {
            return habitDays[formatDate(date)] === 0;
        });

        if (!unfulfiledWeek) {
            streak++;
        } else {
            break;
        }

        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
    }

    const firstDayOfCurrentWeek = getStartOfWeek(new Date(), weekStartOption, 0);
    const currentWeek = getWeekDates(new Date(firstDayOfCurrentWeek));

    const isCurrentWeekUnfulfilled = currentWeek.some(date =>
        habitDays[formatDate(date)] === 0
    );

    if (!isCurrentWeekUnfulfilled) {
        streak++;
    }

    return streak;
};
