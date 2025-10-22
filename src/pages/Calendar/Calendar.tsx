import { useState } from "react";
import { ArrowCircle } from "../../components/Icons";
import "./calendar.css";
import { CalendarTile } from "./CalendarTile";
import { getStartOfWeek } from "../../utils/data-calculating";

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

export function Calendar() {
    const today = new Date();
    const [isArrowClicked, setIsArrowClicked] = useState(false);
    const [month, setMonth] = useState(0);

    const displayDate = new Date(today.getFullYear(), today.getMonth() + month, 1);

    const calendarDays: Day[] = [];
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

        calendarDays.push(new Day({
            date: date.getDate(),
            currentMonth: date.getMonth() == displayDate.getMonth(),
            currentDay: date.getMonth() === today.getMonth() && date.getDate() === today.getDate(),
        }));
    }

    return <>
        <header>
            <h2>{displayDate.toLocaleString('default', { month: 'long' })}</h2>
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
                calendarDays.map((data: any, index: number) => (
                    <CalendarTile key={index} data={data} />
                ))
            }
        </div>
    </>
}