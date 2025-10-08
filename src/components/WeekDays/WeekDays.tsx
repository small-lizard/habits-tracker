import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './weekDays.css';

export function WeekDays() {
    const currentFirstDay = useSelector((state: RootState) => state.habits.currentFirstDay)
    const startOfWeek = new Date(currentFirstDay);

    const days = []

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + i);
        const nameOfDay = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dayDate);
        const numberOfDay = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(dayDate);

        days.push({ name: nameOfDay, number: numberOfDay })
    }

    return <>
        {days.map((day, index) => {
            const isActive = Number(day.number) == new Date().getDate()

            return <th key={index}>
                <div className='day'>
                    <p className={isActive ? 'today-name' : 'day-name'}>{day.name}</p>
                    <p className={isActive ? 'today-number' : 'day-number'}>{day.number}</p>
                </div>
            </th>
        })
        }
    </>
}

export function getStartOfWeek(date: Date) {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    start.setHours(0, 0, 0, 0);
    return start.getTime();
}