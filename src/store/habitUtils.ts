import { WeekStartOptions } from "../components/enumWeekStartOpthions";
import { HabitOptions, HabitStatus } from "../pages/HabitTracker/types";
import { formatDate, getStartOfWeek, getWeekDates } from "../utils/dateUtils";

export function addCurrentWeek(template: boolean[], weekDates: Date[]): Record<string, number> {
    const days: Record<string, number> = {};

    weekDates.forEach(date => {
        const dateKey = formatDate(date);
        const dayOfWeek = date.getDay();

        if (template[dayOfWeek]) {
            days[dateKey] = 0;
        }
    });

    return days;
};

export function addNewDates(habit: HabitOptions, weekDates: Date[], weekOffset: number) {
    const newDays = { ...habit.days };

    const weekWithOldTemplate = weekDates.some(date => {
        const status = habit.days[formatDate(date)]
        return status === HabitStatus.Pending || status === HabitStatus.Done;
    });

    weekDates.forEach(date => {
        const dateKey = formatDate(date);
        const dayOfWeek = date.getDay();

        if (weekOffset < 0) {
            if (!weekWithOldTemplate && habit.template[dayOfWeek]) {
                newDays[dateKey] = 0;
            }

            return;
        }

        if (!habit.template[dayOfWeek]) {
            delete newDays[dateKey];
        } else if (newDays[dateKey] === undefined) {
            newDays[dateKey] = 0;
        }
    })

    return newDays;
}

export function updateHabitDays(newTemplate: boolean[], habit: HabitOptions, weekStart: WeekStartOptions) {
    const newDays = { ...habit.days };
    const lastDayInHabitDays = Object.keys(habit.days).sort().slice(-1)[0];
    const lastHabitWeekStart = getStartOfWeek(new Date(lastDayInHabitDays), weekStart, 0);
    const currentWeekStart = getStartOfWeek(new Date, weekStart, 0);

    while (currentWeekStart <= lastHabitWeekStart) {
        const week = getWeekDates(new Date(currentWeekStart));

        week.forEach(date => {
            const dateKey = formatDate(date);
            const dayOfWeek = date.getDay();

            if (!newTemplate[dayOfWeek]) {
                delete newDays[dateKey];
            } else if (newTemplate[dayOfWeek] && newDays[dateKey] === undefined) {
                newDays[dateKey] = 0;
            }

        })

        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }

    return newDays;
};

export function updateStatus(habits: HabitOptions[], id: any, dateKey: string): any {
    const habit = habits.find(habit => habit.id === id);

    if (!habit) {
        return null;
    }

    const newDays = { ...habit.days };

    newDays[dateKey] = newDays[dateKey] === 1 ? 0 : 1;

    const updatedHabit = {
        ...habit,
        days: newDays
    };

    habits[habits.indexOf(habit)] = updatedHabit;

    return habits;
};

export function deleteHabit(habits: HabitOptions[], id: string): HabitOptions[] {
    return habits.filter(habit => habit.id !== id);
};
