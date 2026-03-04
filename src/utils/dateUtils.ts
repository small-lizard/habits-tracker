import { WeekStartOptions } from "../components/enumWeekStartOpthions";
import i18n from "../i18n";

export function getStartOfWeek(date: Date, firstDayOfWeekSetting: WeekStartOptions, weekOffset: number) {
    const start = new Date(date);

    if (firstDayOfWeekSetting === WeekStartOptions.Sunday) {
        start.setDate(date.getDate() - start.getDay() + weekOffset * 7);
    } else {
        const mondayOffset = start.getDay() === 0 ? 7 : start.getDay();
        start.setDate(date.getDate() + 1 - mondayOffset + weekOffset * 7);
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

    return day;
}

interface GetWeekDaysOptions {
    weekStart?: WeekStartOptions;
    weekdayType?: "long" | "short" | "narrow";
}

export function getWeekDaysTitle({ weekStart = WeekStartOptions.Sunday, weekdayType = "short" }: GetWeekDaysOptions = {}) {
    const localeMap: Record<string, string> = {
        en: 'en-US',
        ru: 'ru-RU',
    };

    const locale = localeMap[i18n.language] || 'en-US';
    const base = new Date();
    const difference = weekStart === WeekStartOptions.Monday ? 1 : 0;
    base.setDate(base.getDate() - base.getDay() + difference);
    const week = [];

    for (let i = 0; i < 7; i++) {
        const formattedDate = new Intl.DateTimeFormat(locale, { weekday: weekdayType })
            .format(new Date(base.getFullYear(), base.getMonth(), base.getDate() + i));
        week.push(formattedDate)
    }

    return week;
}

export function getMinutesAndSeconds(time: number) {
    let minutes = Math.floor(time / 60000);
    let formattedSeconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");

    return `${minutes}:${formattedSeconds}`
}