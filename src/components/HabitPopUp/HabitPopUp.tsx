import React, { useState } from 'react';
import './HabitPopUp.css';
import { HabitOptions, Status } from '../../types';
import { CheckIcon } from '../../Icons';

type HabitPopUpProps = {
    togglePopUp: () => void;
    addHabit?: (habit: HabitOptions) => void;
    habit?: {
        id: number;
        name: string;
        days: Status[],
        color: string,
        updateHabit: (id: number, options: { name: string, days: boolean[], selectedColor: string }) => void
    };
}

export function HabitPopUp({ togglePopUp, addHabit, habit }: HabitPopUpProps) {

    const [name, setName] = React.useState(habit?.name ?? '');
    const [days, setDays] = useState(habit?.days ? habit.days.map((day) => !!day) : Array(7).fill(false));
    const [selectedColor, setColor] = useState(habit?.color ?? "#4A64FD");

    function handleCheckBox(index: number, checked: boolean) {
        const newDays = [...days];
        newDays[index] = checked;
        setDays(newDays);
    }

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        if (addHabit) {
            addHabit({ name, template: days, weeks: {}, selectedColor });
        }
        else if (habit) {
            habit.updateHabit(habit.id, { name, days, selectedColor})
        }
        togglePopUp()
    }

    const colors = ['#4A64FD', '#8A78FF', '#FF8464', '#65C763', '#F4C358', '#F55B7A'];
    const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    return <div className='popup-overlay'>
        <form action="" className='popup-form' onSubmit={handleSubmit}>
            {
                habit ? <h3>Edit habit</h3> : <h3>New habit</h3>
            }
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

            <div className="color-wrapper">
                <h4 className="color-title">Choose color</h4>
                <div className='color-radio-btn'>
                    {colors.map((color) => (
                        <label key={color} className="color-label" >
                            <input
                                type="radio"
                                name="habitColor"
                                value={color}
                                checked={selectedColor === color}
                                onChange={() => setColor(color)}
                            />
                            <span style={{ backgroundColor: color }}></span>
                            {selectedColor === color && <span className='tick'><CheckIcon /></span>}
                        </label>
                    ))}
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