import { useEffect, useState } from "react";
import { ArrowCircle } from "../../components/Icons";
import "./calendar.css";
import { CalendarTile } from "./CalendarTile";
import { getStartOfWeek } from "../../utils/data-calculating";
import { CalendarDropdown } from "./DropdownMenu/CalendarDropdown";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { HabitStatusCalendar } from "../HabitTracker/types";
import { initHabits } from '../../store/habitsThunks';
import { checkAuth } from "../../api/auth";
import * as userActions from '../../store/authSlice';


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

export function Calendar() {
    const { habitId } = useParams();
    const habits = useSelector((state: RootState) => state.habits.habits)
    const habit = habits.find(habit => habit.id === habitId) || null;
    const habitWeeks = habit?.weeks ?? {};
    const today = new Date();
    const [isArrowClicked, setIsArrowClicked] = useState(false);
    const [month, setMonth] = useState(0);
    const displayDate = new Date(today.getFullYear(), today.getMonth() + month, 1);
    const calendarDays: HabitDay[] = [];
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const user = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchAuth = async () => {
            const response = await checkAuth();

            dispatch(userActions.setUser({
                id: response.userId ?? '',
                isAuth: response.isAuth,
                name: response.name ?? '',
                email: response.email ?? '',
            }));
        }

        fetchAuth()
    }, []);

    useEffect(() => {
        if (user.isAuth !== null) {
            dispatch(initHabits());
        }
    }, [user.isAuth]);

    function prevMonth() {
        setMonth(prev => prev - 1);
        setIsArrowClicked(true);
    }

    function nextMonth() {
        setMonth(prev => prev + 1);
        setIsArrowClicked(true);
    }

    function handleCurrentMonth() {
        setMonth(0);
        setIsArrowClicked(false);
    }

    for (let index = 0; index < 42; index++) {
        const firstDate = new Date(getStartOfWeek(displayDate));
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

    return <>
        <header>
            <div className="top-left-container">
                <h2>{displayDate.toLocaleString('default', { month: 'long' })}</h2>
                <CalendarDropdown></CalendarDropdown>
            </div>
            <div className='week-switcher'>
                {isArrowClicked && month !== 0
                    ? (
                        <button onClick={handleCurrentMonth} className='current-week-button'>today</button>
                    )
                    : null}
                <div className='week-switcher-arrow'>
                    <button className='arrow-left' onClick={prevMonth}><ArrowCircle></ArrowCircle></button>
                    <button className='arrow-right' onClick={nextMonth}><ArrowCircle></ArrowCircle></button>
                </div>
            </div>
        </header>
        <div className="container">
            {
                week.map((day) => <p className="week-day" key={day}>{day}</p>)
            }
            {
                calendarDays.map((data: {
                    date: number;
                    currentMonth: boolean;
                    currentDay: boolean;
                }, index: number) => (
                    <CalendarTile key={index} data={data} color={habit?.selectedColor} />
                ))
            }
        </div>
    </>
}
