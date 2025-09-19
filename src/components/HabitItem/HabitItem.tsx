import React, { useState } from 'react';
import { EditIcon, DeleteIcon } from '../../Icons';
import { CheckBox } from '../CheckBox';
import './habitsItem.css';
import { HabitPopUp } from '../HabitPopUp/HabitPopUp';
import { HabitOptions, DayOptions } from '../../App';

type HabitListProps = {
    name: string,
    days: [],
    deleteHabit: (id: number) => void, 
    id: number,
    updateHabit: (id: number, options: HabitOptions) => void,
    updateStatus: (options: DayOptions) => void,
}

export function HabitsItem({ name, days, deleteHabit, id, updateHabit, updateStatus}: HabitListProps) {

    const [isOpen, setIsOpen] = useState(false)

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <li className='habit-line'>
        <span>{name}</span>
        <div>
            <button aria-label="Edit" onClick={togglePopUp}><EditIcon /></button>
            {isOpen && (
                <HabitPopUp togglePopUp={togglePopUp} habit={{id, name, days, updateHabit}}></HabitPopUp>
            )}
            <button aria-label="Delete" onClick={() => deleteHabit(id)}><DeleteIcon /></button>
        </div>
        <div className='check-box-line'>
            {
                days.map((status, index) => {
                    return <CheckBox 
                    status={status} 
                    key={index} 
                    index={index}
                    updateStatus={updateStatus}
                    id={id}
                    ></CheckBox>
                })
            }
        </div>
    </li>
}