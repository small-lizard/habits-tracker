import { ArrowCircle } from "../../components/Icons";
import "./calendar.css";
import { CalendarTile } from "./CalendarTile";
import { CalendarDropdown } from "./DropdownMenu/CalendarDropdown";

type CalendarDesktopProps = {
    displayDate: any,
    month: any,
    handleCurrentMonth: any,
    prevMonth: any,
    nextMonth: any,
    week: any,
    calendarDays: any,
    habit: any
}

export function CalendarDesktop({ displayDate, month, handleCurrentMonth, prevMonth, nextMonth, week, calendarDays, habit }: CalendarDesktopProps) {

    return <>
        <header className="calendar-head">
            <div className="top-left-container">
                <h2 className="calendar-title">{displayDate.toLocaleString('en-US', { month: 'long' })}</h2>
                <CalendarDropdown></CalendarDropdown>
            </div>
            <div className='week-switcher'>
                {month !== 0
                    ? (
                        <button onClick={handleCurrentMonth} className='current-month-button'>today</button>
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
                week.map((day: any) => <p className="week-day" key={day}>{day}</p>)
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