import { useSelector } from 'react-redux';
import './weekDays.css';
import { selectUiFirstDay } from '../../../../store/selectors';
import i18n from '../../../../i18n';

export function WeekDays() {
    const uiFirstDay = useSelector(selectUiFirstDay);
    const today = new Date();
    const days = []

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(uiFirstDay);
        dayDate.setDate(uiFirstDay.getDate() + i);
        const localeMap: Record<string, string> = {
            en: 'en-US',
            ru: 'ru-RU',
        };
        const locale = localeMap[i18n.language] || 'en-US';
        
        const nameOfDay = new Intl.DateTimeFormat(locale, { weekday: "short" }).format(dayDate);
        const numberOfDay = new Intl.DateTimeFormat(locale, { day: "numeric" }).format(dayDate);
        const numberOfMonth = new Intl.DateTimeFormat(locale, { month: "numeric" }).format(dayDate);

        days.push({ name: nameOfDay, number: numberOfDay, month: numberOfMonth })
    }

    return <>
        {days.map((day, index) => {
            const isActive = Number(day.number) == today.getDate() && Number(day.month) == today.getMonth() + 1

            return <div className='day' key={index}>
                <p className={isActive ? 'today-name' : 'day-name'}>{day.name}</p>
                <p className={isActive ? 'today-number' : 'day-number'}>{day.number}</p>
            </div>
        })
        }
    </>
}