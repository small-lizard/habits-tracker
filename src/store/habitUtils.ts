import { DayOptions, HabitOptions, HabitStatus } from "../pages/HabitTracker/types";
import { getStartOfWeek } from "../utils/data-calculating";

export function addCurrentWeek(habits: HabitOptions[], currentFirstDay: number): HabitOptions[] {
    return habits.map(habit => generateWeek(habit, currentFirstDay));
}

export function addHabit(habits: HabitOptions[], habit: HabitOptions, currentFirstDay: number): HabitOptions[] {
    const mappedWeek = habit.template.map(day => day ? HabitStatus.Pending : HabitStatus.Disabled);
    return [...habits, { ...habit, weeks: { [currentFirstDay]: mappedWeek } }];
}

export function updateHabitWeeks(newTemplate: boolean[], habit: HabitOptions): void {
    Object.entries(habit.weeks).forEach(([key, days]) => {
        const weekNumber = Number(key);

        const updatedDays = newTemplate.map((day, index) => {
            if (day === false) return HabitStatus.Disabled;
            return days[index] || HabitStatus.Pending;
        });

        habit.weeks[weekNumber] = updatedDays;
    });
}

export function updateStatus(habits: HabitOptions[], options: DayOptions, firstDay: number): HabitOptions[] {
    return habits.map(habit => {
        if (habit.id !== options.id) return habit;

        const currentWeek = habit.weeks[firstDay] || [];
        const updatedWeek = [...currentWeek];
        updatedWeek[options.index] = options.status;

        return { ...habit, weeks: { ...habit.weeks, [firstDay]: updatedWeek } };
    });
}

export function deleteHabit(habits: HabitOptions[], id: string): HabitOptions[] {
    return habits.filter(habit => habit.id !== id);
}

export function updateCurrentFirstDay(weekNumber: number): number {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + weekNumber * 7);
    return getStartOfWeek(date);
}



function generateWeek(habit: HabitOptions, currentFirstDay: number): HabitOptions {
    if (!habit.weeks[currentFirstDay]) {
        const sampleWeek = habit.template.map(day => day ? HabitStatus.Pending : HabitStatus.Disabled);
        return { ...habit, weeks: { ...habit.weeks, [currentFirstDay]: sampleWeek } };
    }
    return habit;
}
