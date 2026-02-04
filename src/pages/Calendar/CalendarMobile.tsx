import { ArrowCircle } from "../../components/Icons";
import "./calendar.css";
import { CalendarTile } from "./CalendarTile";
import { CalendarDropdown } from "./DropdownMenu/CalendarDropdown";

type CalendarMobileProps = {
    firstDayOfMonth: any,
    monthOffset: any,
    handleCurrentMonth: any,
    prevMonth: any,
    nextMonth: any,
    weekTitles: any,
    calendarDays: any,
    habit: any
}

export function CalendarMobile({ firstDayOfMonth, monthOffset, handleCurrentMonth, prevMonth, nextMonth, weekTitles, calendarDays, habit }: CalendarMobileProps) {

    return <>
        <header className="calendar-head">
            <h2 className="calendar-title">{firstDayOfMonth.toLocaleString('en-US', { month: 'long' })}</h2>
            <div className='week-switcher'>
                {monthOffset !== 0
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
        <CalendarDropdown></CalendarDropdown>
        <div className="container">
            {
                weekTitles.map((day: string) => <p className="week-day" key={day}>{day}</p>)
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