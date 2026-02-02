import { useSelector } from 'react-redux';
import './weekDays.css';
import { selectUiFirstDay } from '../../../../store/selectors';

export function WeekDays() {
    const uiFirstDay = useSelector(selectUiFirstDay);
    const today = new Date();
    const days = []

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(uiFirstDay);
        dayDate.setDate(uiFirstDay.getDate() + i);
        const nameOfDay = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dayDate);
        const numberOfDay = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(dayDate);
        const numberOfMonth = new Intl.DateTimeFormat("en-US", { month: "numeric" }).format(dayDate);

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