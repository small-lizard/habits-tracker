import React, { useState } from 'react';
import { EditIcon, DeleteIcon } from '../../Icons';
import { CheckBox } from '../CheckBox';
import './habitsItem.css';
import { HabitPopUp } from '../HabitPopUp/HabitPopUp';
import { HabitOptions, DayOptions, Status } from '../../App';

type HabitListProps = {
    name: string,
    days: Status[] | undefined,
    deleteHabit: (id: number) => void,
    id: number,
    updateHabit: (id: number, options: {name: string, days: any[]}) => void,
    updateStatus: (options: DayOptions, firstDay: number) => void,
    firstDay: number,
}

export function HabitsItem({ name, days, deleteHabit, id, updateHabit, updateStatus, firstDay }: HabitListProps) {

    const [isOpen, setIsOpen] = useState(false)

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <li className='habit-line'>
        <span className='habit-name'>{name}</span>
        <div className='habit-actions'>
            <button aria-label="Edit" className="icon-btn" onClick={togglePopUp}><EditIcon /></button>
            {isOpen && (
                <HabitPopUp togglePopUp={togglePopUp} habit={{ id, name, days, updateHabit }}></HabitPopUp>
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
                    ></CheckBox>
                })
            }
        </div>
        <p className='progress-number'>2/31</p>
    </li>
}