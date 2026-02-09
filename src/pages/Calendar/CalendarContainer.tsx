import { useState } from "react";
import "./calendar.css";
import { formatDate, getStartOfWeek, getWeekDates, getWeekDaysTitle } from "../../utils/dateUtils";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { HabitStatusCalendar, HabitStatus, CalendarLayoutProps } from "../types";
import { CalendarDesktop } from "./CalendarDesktop";
import { CalendarMobile } from "./CalendarMobile";

class Day {
    public date: number;
    public currentMonth: boolean;
    public currentDay: boolean;

    constructor(options: { date: number, currentMonth?: boolean, currentDay: boolean }) {
        this.date = options.date;
        this.currentMonth = options.currentMonth ?? false;
        this.currentDay = options.currentDay;
    }
}

class HabitDay extends Day {
    public status?: HabitStatusCalendar;

    constructor(options: { date: number; currentMonth?: boolean; currentDay: boolean; status?: HabitStatusCalendar }) {
        super({
            date: options.date,
            currentMonth: options.currentMonth,
            currentDay: options.currentDay,
        });

        this.status = options.status;
    }
}

type CalendarProps = {
    isMobile: boolean;
}

export function CalendarContainer({ isMobile }: CalendarProps) {
    const { habitId } = useParams();
    const habits = useSelector((state: RootState) => state.habits.habits);
    const habit = habits.find(habit => habit.id === habitId) || null;
    const habitDays = habit?.days || {};
    const today = new Date();
    const firstDayOfWeekSetting = useSelector((state: RootState) => state.settings.uiWeekStart)

    const [monthOffset, setMonthOffset] = useState(0);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const calendarDays: HabitDay[] = [];
    const weekTitles = getWeekDaysTitle(firstDayOfWeekSetting);

    function prevMonth() {
        setMonthOffset(prev => prev - 1);
    }

    function nextMonth() {
        setMonthOffset(prev => prev + 1);
    }

    function handleCurrentMonth() {
        setMonthOffset(0);
    }

    for (let index = 0; index < 42; index++) {
        const firstCalendarDay = new Date(getStartOfWeek(firstDayOfMonth, firstDayOfWeekSetting, 0));
        const date = new Date(firstCalendarDay.setDate(firstCalendarDay.getDate() + index));

        let status: HabitStatusCalendar | undefined;

        if (habitId && date.getMonth() === firstDayOfMonth.getMonth()) {
            const dayStatus = habitDays[formatDate(date)];

            if (dayStatus === HabitStatus.Done) {
                status = HabitStatusCalendar.Done
            } else if (dayStatus === HabitStatus.Pending) {
                status = HabitStatusCalendar.Disabled
            } else {
                const weekDates = getWeekDates(getStartOfWeek(date, firstDayOfWeekSetting, 0))
                const fulfilled = weekDates.every((day: Date) => {
                    const dayStatus = habitDays[formatDate(day)];

                    return dayStatus === HabitStatus.Done || dayStatus === undefined;
                }) && weekDates.some((day: Date) => habitDays[formatDate(day)] === HabitStatus.Done);

                if (fulfilled) {
                    status = HabitStatusCalendar.DisabledInStreak
                }
            }
        }

        calendarDays.push(new HabitDay({
            date: date.getDate(),
            currentMonth: date.getMonth() === firstDayOfMonth.getMonth(),
            currentDay: date.getMonth() === today.getMonth() && date.getDate() === today.getDate(),
            status,
        }));
    }

    const layoutProps: CalendarLayoutProps = {
        firstDayOfMonth,
        monthOffset,
        handleCurrentMonth,
        prevMonth,
        nextMonth,
        weekTitles,
        calendarDays,
        habit
    }

    return isMobile
        ? <CalendarMobile {...layoutProps} />
        : <CalendarDesktop {...layoutProps} />;
}