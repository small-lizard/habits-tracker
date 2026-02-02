import { WeekStartOptions } from "../components/enumWeekStartOpthions";

export function getStartOfWeek(date: Date, firstDayOfWeekSetting: WeekStartOptions, weekOffset: number) {
    const start = new Date(date);

    if (firstDayOfWeekSetting === WeekStartOptions.Sunday) {
        start.setDate(date.getDate() - date.getDay() + weekOffset * 7);
    } else {
        start.setDate(date.getDate() - date.getDay() + 1 + weekOffset * 7);
    }
    start.setHours(0, 0, 0, 0);

    return start;
}

export function getWeekDates(firstDay: Date) {
    const dates = []

    for (let i = 0; i < 7; i++) {
        const day = new Date(firstDay)

        day.setDate(day.getDate() + i)
        dates.push(day)
    }

    return dates;
}

export function formatDate(date: Date) {
    const day = new Date(date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
    
    return day.replace(/-/g, '');
}

export function getWeekDaysTitle(weekStart: WeekStartOptions, locale = "en-US") {
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