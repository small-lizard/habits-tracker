import React, { useEffect, useState } from 'react';
import './HabitPopUp.css';
import { HabitOptions, Status, HabitForUpdate } from '../../types';
import { CheckIcon } from '../../Icons';
import { nanoid } from 'nanoid';

type HabitPopUpProps = {
    togglePopUp: () => void;
    addHabit?: (habit: HabitOptions) => void;
    habit?: HabitForUpdate,
    updateHabit: (options: HabitForUpdate) => void
}

export function HabitPopUp({ togglePopUp, addHabit, habit, updateHabit }: HabitPopUpProps) {

    const [name, setName] = React.useState(habit?.name ?? '');
    const [days, setDays] = useState(habit?.template ? habit.template.map((day) => !!day) : Array(7).fill(false));
    const [selectedColor, setColor] = useState(habit?.selectedColor ?? "#4A64FD");
    const colors = ['#4A64FD', '#8A78FF', '#FF8464', '#65C763', '#F4C358', '#F55B7A'];
    const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    function handleCheckBox(index: number, checked: boolean) {
        const newDays = [...days];
        newDays[index] = checked;
        setDays(newDays);
    }

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        if (habit && updateHabit) {
            debugger
            const updatedHabit: HabitForUpdate = {
                id: habit.id,
                name,
                template: days,
                selectedColor,
            };
            updateHabit(updatedHabit);
        }
        else if (addHabit) {
            const newHabit: HabitOptions = {
                id: nanoid(),
                name,
                template: days,
                weeks: {},
                selectedColor,
            };
            addHabit(newHabit);
        }
        // else if (habit && updateHabit) {
        //     debugger
        //     const updatedHabit: HabitForUpdate = {
        //         id: habit.id,
        //         name,
        //         template: days,
        //         selectedColor,
        //     };
        //     updateHabit(updatedHabit);
        // }
        togglePopUp()
    }

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