import React, { useState } from 'react';
import './HabitPopUp.css';
import { HabitOptions } from '../../App';
import { getStartOfWeek } from '../WeekDays/WeekDays';

type HabitPopUpProps = {
    togglePopUp: () => void;
    addHabit?: (habit: HabitOptions, firstDay: number) => void;
    habit?: { id: number; name: string; days: any[] | undefined, updateHabit: (id: number, options: {name: string, days: any[]}) => void };
}

export function HabitPopUp({ togglePopUp, addHabit, habit }: HabitPopUpProps) {

    const [name, setName] = React.useState(habit?.name ?? '');
    const [days, setDays] = useState(habit?.days ? habit.days.map((day) => !!day) : Array(7).fill(false));
    const firstDay = getStartOfWeek(new Date());

    function handleCheckBox(index: number, checked: boolean) {
        const newDays = [...days];
        newDays[index] = checked;
        setDays(newDays);
    }

    const weeks = new Map()

    weeks.set(firstDay, days)

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        if (addHabit) {
            addHabit({ name, weeks }, firstDay)
        }
        else if (habit) {
            habit.updateHabit(habit.id, { name, days })
        }
        togglePopUp()
    }

    const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    return <div className='popup-overlay'>
        <form action="" className='popup-form' onSubmit={handleSubmit}>
            <h3>New habit</h3>
            <label className='inp'>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name habit"
                    aria-label="Name"
                />
            </label>

            <div className="frequency-wrapper">
                <h4 className="frequency-title">Frequency</h4>
                <div className='weekdays-checkbox'>
                    {
                        week.map((day, index) => (
                            <label key={index} className="circle">
                                <input
                                    type="checkbox"
                                    name="day"
                                    value={day}
                                    checked={days[index]}
                                    onChange={(e) => handleCheckBox(index, e.target.checked)}
                                />
                                <span>{day}</span>
                            </label>
                        ))
                    }
                </div>

            </div>
            {addHabit ? (
                <button type="submit" className="submit">Create</button>
            ) : habit ? (
                <button type="submit" className="edit">Edit</button>
            ) : null}
            <button type="button" className="cancel" onClick={togglePopUp}>Cancel</button>
        </form>
    </div>
}