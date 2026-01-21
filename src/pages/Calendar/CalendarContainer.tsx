import { useEffect, useState } from "react";
import "./calendar.css";
import { getStartOfWeek } from "../../utils/data-calculating";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { HabitStatusCalendar } from "../HabitTracker/types";
import { initHabits } from '../../store/habitsThunks';
import * as accountService from "../../services/accountService";
import * as userActions from '../../store/authSlice';
import { CalendarDesktop } from "./CalendarDesktop";
import { CalendarMobile } from "./CalendarMobile";
import { getWeekDays } from "../../utils/getWeekDays";

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
    const habits = useSelector((state: RootState) => state.habits.habits)
    const firstDayOfWeekSetting = useSelector((state: RootState) => state.settings.weekStart)
    const habit = habits.find(habit => habit.id === habitId) || null;
    const habitWeeks = habit?.weeks ?? {};
    const today = new Date();
    const [month, setMonth] = useState(0);
    const displayDate = new Date(today.getFullYear(), today.getMonth() + month, 1);
    const calendarDays: HabitDay[] = [];
    const dispatch = useDispatch<AppDispatch>();
    const week = getWeekDays(firstDayOfWeekSetting)

    useEffect(() => {
        const fetchAuth = async () => {
            const response = await accountService.checkAuth();

            dispatch(userActions.setUser({
                id: response.userId ?? '',
                isAuth: response.isAuth,
                name: response.name ?? '',
                email: response.email ?? '',
            }));

            await dispatch(initHabits(response.isAuth));
        }

        fetchAuth()
    }, []);

    function prevMonth() {
        setMonth(prev => prev - 1);
    }

    function nextMonth() {
        setMonth(prev => prev + 1);
    }

    function handleCurrentMonth() {
        setMonth(0);
    }

    for (let index = 0; index < 42; index++) {
        const firstDate = new Date(getStartOfWeek(displayDate, firstDayOfWeekSetting));
        const date = new Date(firstDate.setDate(firstDate.getDate() + index));
        const weekStart = getStartOfWeek(date);
        const indexOfDay = date.getDay();

        let status: HabitStatusCalendar | undefined;

        if (!habitId) {
            status = undefined;
        }
        else if (habitId && !habitWeeks[weekStart] || date.getMonth() !== displayDate.getMonth()) {
            status = undefined;
        }
        else {
            const week = habitWeeks[weekStart];
            const value = week[indexOfDay];

            if (week.includes(2) && !week.includes(1)) {
                status = value === 2
                    ? HabitStatusCalendar.Done
                    : HabitStatusCalendar.DisabledInStreak;
            }
            else {
                status = value === 2
                    ? HabitStatusCalendar.Done
                    : undefined;
            }
        }

        calendarDays.push(new HabitDay({
            date: date.getDate(),
            currentMonth: date.getMonth() === displayDate.getMonth(),
            currentDay: date.getMonth() === today.getMonth() && date.getDate() === today.getDate(),
            status,
        }));
    }

    const layoutProps = {
        displayDate,
        month,
        handleCurrentMonth,
        prevMonth,
        nextMonth,
        week,
        calendarDays,
        habit
    }

    return isMobile
        ? <CalendarMobile {...layoutProps} />
        : <CalendarDesktop {...layoutProps} />;
}
