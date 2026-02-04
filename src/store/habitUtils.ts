import { HabitOptions } from "../pages/HabitTracker/types";
import { formatDate } from "../utils/dateUtils";

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

export function addNewDates(habit: HabitOptions, weekDates: Date[]) {
    const newDays = { ...habit.days };

    weekDates.forEach(date => {
        const dateKey = formatDate(date);
        const dayOfWeek = date.getDay();

        if (habit.template[dayOfWeek] && newDays[dateKey] === undefined) {
            newDays[dateKey] = 0;
        }
    });

    return newDays;
}

export function updateHabitDays(newTemplate: boolean[], habit: HabitOptions, weekDates: Date[]) {
    const newDays = { ...habit.days };

    weekDates.forEach(date => {
        const dateKey = formatDate(date);
        const dayOfWeek = date.getDay();

        if (!newTemplate[dayOfWeek]) {
            delete newDays[dateKey];
        } else if (newTemplate[dayOfWeek] && newDays[dateKey] === undefined) {
            newDays[dateKey] = 0;
        }

    })

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
