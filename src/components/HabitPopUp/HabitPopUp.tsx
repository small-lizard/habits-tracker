import React, { useState } from 'react';
import { Button } from '../Button';
import './HabitPopUp.css';
import { HabitOptions } from '../../App';

type HabitPopUpProps = {
    togglePopUp: () => void;
    addHabit?: (habit: HabitOptions) => void;
    habit?: { id: number; name: string; days: boolean[], updateHabit: (id: number, options: HabitOptions) => void };
}

export function HabitPopUp({ togglePopUp, addHabit, habit }: HabitPopUpProps) {

    const [name, setName] = React.useState(habit?.name ?? '');
    const [days, setDays] = useState(habit?.days ? habit.days.map((day) => !!day) : Array(7).fill(false));

    function handleCheckBox(index: number, checked: boolean) {
        const newDays = [...days];
        newDays[index] = checked ;
        setDays(newDays);
    }

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        if (addHabit) {
            addHabit({ name, days })
        }
        else if (habit) {
            habit.updateHabit(habit.id, { name, days })
        }
        togglePopUp()
    }

    const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    return <div className='popup-overlay'>
        <form action="" className='popup-form' onSubmit={handleSubmit}>
            <h3>New habits</h3>
            <label>
                Name habit
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <div>
                <p>Frequency</p>
                {
                    week.map((day, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="day"
                                value={day}
                                checked={days[index]}
                                onChange={(e) => handleCheckBox(index, e.target.checked)}
                            />
                            {day}
                        </label>
                    ))
                }
            </div>
            {addHabit ? (
                <Button type="submit" className="submit">Create</Button>
            ) : habit ? (
                <Button type="submit" className="edit">Edit</Button>
            ) : null}
            <Button type="button" className="cancel" onClick={togglePopUp}>Cancel</Button>
        </form>
    </div>
}