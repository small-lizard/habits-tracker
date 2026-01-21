import { WeekStartOptions } from "../enumWeekStartOptions";

export function getWeekDays(weekStart: WeekStartOptions, locale = "en-US") {
    const base = new Date();
    const difference = weekStart === WeekStartOptions.Monday ? 1 : 0;
    base.setDate(base.getDate() - base.getDay() + difference);

    const week = [];

    for (let i = 0; i < 7; i++) {
        const formattedDate = new Intl.DateTimeFormat(locale, { weekday: "short" })
            .format(new Date(base.getFullYear(), base.getMonth(), base.getDate() + i));
        week.push(formattedDate)
    }

    return week;
}