import { useSelector } from 'react-redux';
import { EditIcon, DeleteIcon } from '../../../../components/Icons';
import { RootState } from '../../../../store/store';
import { countWeekStreak } from '../../../../utils/countStreak';
import { formatDate } from '../../../../utils/dateUtils';
import { HabitForUpdate, HabitOptions, HabitStatus, uiHabitStatus } from '../../../types';
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
    const firstDayOfWeekSetting = useSelector((state: RootState) => state.settings.uiWeekStart)
    function handleEditClick() {
        if (!habit) {
            return null;
        }
        togglePopUp({
            id: habit.id,
            name: habit.name,
            template: habit.template,
            selectedColor: habit.selectedColor
        });
    }

    const weekStatus = weekDates.map((date: any) => {
        const dateKey = formatDate(date);
        
        if (habit.days[dateKey] === undefined) {
            return uiHabitStatus.Disabled;
        }

        return habit.days[dateKey] === HabitStatus.Done ? uiHabitStatus.Done : uiHabitStatus.Pending;
    });

    const weekStreak = countWeekStreak(habit, firstDayOfWeekSetting);

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
                            weekStatus.map((status: any, index: any) => {
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
                    <div className='progress-number'>{weekStreak}</div>
                </div>
            ) : (
                <>
                    {
                        weekStatus.map((status: any, index: any) => {
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
                    <div className='progress-number'>{weekStreak}</div>
                </>
            )
        }
    </div>
}