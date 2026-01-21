import { WeekStartOptions } from "../enumWeekStartOptions";

export function getStartOfWeek(date: Date, firstDayOfWeekSetting = WeekStartOptions.Sunday) {
    const start = new Date(date);

    if (firstDayOfWeekSetting === WeekStartOptions.Sunday) {
        start.setDate(date.getDate() - date.getDay());
    } else {
        start.setDate(date.getDate() - date.getDay() + 1);
    }

    start.setHours(0, 0, 0, 0);

    return start.getTime();
}