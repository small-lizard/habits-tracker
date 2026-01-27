import { EditIcon, DeleteIcon } from '../../../../components/Icons';
import { selectWeekStreak } from '../../../../store/selectors';
import { RootState } from '../../../../store/store';
import { HabitStatus, DayOptions } from '../../types';
import { CheckBox } from '../CheckBox/CheckBox';
import './habitsItem.css';
import { useSelector } from 'react-redux';

type HabitListProps = {
    name: string,
    days: HabitStatus[],
    deleteHabit: (id: string) => void,
    id: string,
    updateStatus: (options: DayOptions, firstDay: number) => void,
    firstDay: number,
    color: string,
    togglePopUp: any,
    isMobile: boolean
}

export function HabitsItem({ name, days, deleteHabit, id, updateStatus, firstDay, color, togglePopUp, isMobile }: HabitListProps) {
    const habit = useSelector((state: RootState) => state.habits.habits.find(habit => habit.id === id));
    if (!habit) {
        return null;
    }

    const weekStreak = selectWeekStreak(habit);

    function handleEditClick() {
        if (!habit) {
            return null;
        }
        togglePopUp({
            id: habit.id,
            name: habit.name,
            template: habit.template,
            selectedColor: habit.selectedColor,
        });
    }

    return <div className='habit-line'>
        <div className='habit-details'>
            <span className='habit-name'>{name}</span>
            <div className='habit-details-buttons'>
                <button aria-label='Edit' className='icon-btn edit-btn' onClick={handleEditClick}><EditIcon /></button>
                <button aria-label='Delete' className='icon-btn' onClick={() => deleteHabit(id)}><DeleteIcon /></button>
            </div>
        </div>
        {
            isMobile ? (
                <div className='second-habit-line'>
                    <div className='checkbox-line'>
                        {
                            days!.map((status, index) => {
                                return <CheckBox
                                    status={status}
                                    key={index}
                                    index={index}
                                    updateStatus={updateStatus}
                                    id={id}
                                    firstDay={firstDay}
                                    color={color}
                                ></CheckBox>
                            })
                        }
                    </div>
                    <div className='progress-number'>{weekStreak}</div>
                </div>
            ) : (
                <>
                    {
                        days!.map((status, index) => {
                            return <CheckBox
                                status={status}
                                key={index}
                                index={index}
                                updateStatus={updateStatus}
                                id={id}
                                firstDay={firstDay}
                                color={color}
                            ></CheckBox>

                        })
                    }
                    <div className='progress-number'>{weekStreak}</div>
                </>
            )
        }
    </div>
}