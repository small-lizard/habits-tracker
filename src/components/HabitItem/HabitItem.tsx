import React, { useState } from 'react';
import { EditIcon, DeleteIcon } from '../../Icons';
import { CheckBox } from '../CheckBox/CheckBox';
import './habitsItem.css';
import { HabitPopUp } from '../HabitPopUp/HabitPopUp';
import { DayOptions, Status } from '../../types';
import { selectWeekStreak } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type HabitListProps = {
    name: string,
    days: Status[],
    deleteHabit: (id: number) => void,
    id: number,
    updateHabit: (id: number, options: { name: string, days: boolean[], selectedColor: string }) => void,
    updateStatus: (options: DayOptions, firstDay: number) => void,
    firstDay: number,
    color: string,
}

export function HabitsItem({ name, days, deleteHabit, id, updateHabit, updateStatus, firstDay, color }: HabitListProps) {

    const habit = useSelector((state: RootState) => state.habits.habits[id]);
    const weekStreak = selectWeekStreak(habit);

    const [isOpen, setIsOpen] = useState(false)

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <li className='habit-line'>
        <span className='habit-name'>{name}</span>
        <div className='habit-actions'>
            <button aria-label="Edit" className="icon-btn" onClick={togglePopUp}><EditIcon /></button>
            {isOpen && (
                <HabitPopUp togglePopUp={togglePopUp} habit={{ id, name, days, color, updateHabit }}></HabitPopUp>
            )}
            <button aria-label="Delete" className="icon-btn" onClick={() => deleteHabit(id)}><DeleteIcon /></button>
        </div>
        <div className='check-box-line'>
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
        <p className='progress-number'>{weekStreak}</p>
    </li>
}