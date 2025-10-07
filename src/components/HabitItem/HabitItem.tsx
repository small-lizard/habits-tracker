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
    deleteHabit: (id: string) => void,
    id: string,
    updateStatus: (options: DayOptions, firstDay: number) => void,
    firstDay: number,
    color: string,
    togglePopUp: any,
}

export function HabitsItem({ name, days, deleteHabit, id, updateStatus, firstDay, color, togglePopUp }: HabitListProps) {
    const habit = useSelector((state: RootState) => state.habits.habits.find(habit => habit.id === id));
    if (!habit) return null;

    const weekStreak = selectWeekStreak(habit);

    function handleEditClick() {
        if (!habit) return;
        togglePopUp({
            id: habit.id,
            name: habit.name,
            template: habit.template,
            selectedColor: habit.selectedColor,
        });
    }

    return <tr className='habit-line'>
        <td className='habit-name'>{name}</td>
        <td><button aria-label="Edit" className="icon-btn" onClick={handleEditClick}><EditIcon /></button></td>
        <td><button aria-label="Delete" className="icon-btn" onClick={() => deleteHabit(id)}><DeleteIcon /></button></td>
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
        <td className='progress-number'>{weekStreak}</td>
    </tr>
}