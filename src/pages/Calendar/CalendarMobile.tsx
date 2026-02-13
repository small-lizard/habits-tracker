import { useTranslation } from "react-i18next";
import { ArrowCircle } from "../../components/Icons";
import { CalendarLayoutProps } from "../types";
import "./calendar.css";
import { CalendarTile } from "./CalendarTile";
import { CalendarDropdown } from "./DropdownMenu/CalendarDropdown";
import i18n from "../../i18n";

export function CalendarMobile({ firstDayOfMonth, monthOffset, handleCurrentMonth, prevMonth, nextMonth, weekTitles, calendarDays, habit }: CalendarLayoutProps) {
    const { t } = useTranslation();
    const localeMap: Record<string, string> = {
        en: 'en-US',
        ru: 'ru-RU',
    };
    const locale = localeMap[i18n.language] || 'en-US';

    return <>
        <header className="calendar-head">
            <h1>{firstDayOfMonth.toLocaleString(locale, { month: 'long' })}</h1>
            <div className='period-switcher'>
                {monthOffset !== 0
                    ? (
                        <button onClick={handleCurrentMonth} className='current-month-button'>{t('common.today')}</button>
                    )
                    : null}
                <div className='period-switcher-arrow'>
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