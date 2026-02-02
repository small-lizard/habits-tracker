import { EditIcon, DeleteIcon } from '../../../../components/Icons';
// import { countWeekStreak } from '../../../../store/selectors';
import { formatDate } from '../../../../utils/dateUtils';
import { HabitForUpdate, HabitOptions, HabitStatus } from '../../types';
import { CheckBox } from '../CheckBox/CheckBox';
import './habitsItem.css';

type HabitListProps = {
    habit: HabitOptions,
    deleteHabit: (id: string) => void,
    updateStatus: (id: any, dateKey: string) => void,
    togglePopUp: (habit?: HabitForUpdate | undefined) => void,
    isMobile: boolean,
    weekDates: any
}

export function HabitsItem({ habit, deleteHabit, updateStatus, togglePopUp, isMobile, weekDates }: HabitListProps) {
    function handleEditClick() {
        if (!habit) {
            return null;
        }
        togglePopUp({
            id: habit.id,
            name: habit.name,
            template: habit.template,
            selectedColor: habit.selectedColor,
            weekDays: weekDates,
        });
    }

    const weekStatus = weekDates.map((date: any) => {
        const dateKey = formatDate(date);
        const dayOfWeek = date.getDay();
        const isActive = habit.template[dayOfWeek];

        if (habit.days[dateKey] === undefined) {
            return isActive ? HabitStatus.Pending : HabitStatus.Disabled;
        }

        return habit.days[dateKey] === 1 ? HabitStatus.Done : HabitStatus.Pending;
    });

    // const weekStreak = countWeekStreak(habit);

    return <div className='habit-line'>
        <div className='habit-details'>
            <span className='habit-name'>{habit.name}</span>
            <div className='habit-details-buttons'>
                <button aria-label='Edit' className='icon-btn edit-btn' onClick={handleEditClick}><EditIcon /></button>
                <button aria-label='Delete' className='icon-btn' onClick={() => deleteHabit(habit.id)}><DeleteIcon /></button>
            </div>
        </div>
        {
            isMobile ? (
                <div className='second-habit-line'>
                    <div className='checkbox-line'>
                        {
                            weekStatus.map((status:any, index:any) => {
                                return <CheckBox
                                    status={status}
                                    key={index}
                                    index={index}
                                    updateStatus={updateStatus}
                                    id={habit.id}
                                    dateKey={formatDate(weekDates[index])}
                                    color={habit.selectedColor}
                                ></CheckBox>
                            })
                        }
                    </div>
                    {/* <div className='progress-number'>{weekStreak}</div> */}
                </div>
            ) : (
                <>
                    {
                        weekStatus.map((status:any, index:any) => {
                            return <CheckBox
                                status={status}
                                key={index}
                                index={index}
                                updateStatus={updateStatus}
                                id={habit.id}
                                dateKey={formatDate(weekDates[index])}
                                color={habit.selectedColor}
                            ></CheckBox>
                        })
                    }
                    {/* <div className='progress-number'>{weekStreak}</div> */}
                </>
            )
        }
    </div>
}