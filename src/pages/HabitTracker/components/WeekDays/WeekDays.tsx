import { useSelector } from 'react-redux';
import './weekDays.css';
import { RootState } from '../../../../store/store';

export function WeekDays() {
    const today = new Date();
    const currentFirstDay = useSelector((state: RootState) => state.habits.currentFirstDay)
    const startOfWeek = new Date(currentFirstDay);

    const days = []

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + i);
        const nameOfDay = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dayDate);
        const numberOfDay = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(dayDate);
        const numberOfMonth = new Intl.DateTimeFormat("en-US", { month: "numeric" }).format(dayDate);

        days.push({ name: nameOfDay, number: numberOfDay, month: numberOfMonth })
    }


    return <>
        {days.map((day, index) => {
            const isActive = Number(day.number) == today.getDate() && Number(day.month) == today.getMonth() + 1

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