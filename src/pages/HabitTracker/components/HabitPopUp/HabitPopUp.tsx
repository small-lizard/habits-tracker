import React, { useEffect, useState } from 'react';
import './HabitPopUp.css';
import { nanoid } from 'nanoid';
import { CheckIcon } from '../../../../components/Icons';
import { HabitOptions, HabitForUpdate } from '../../types';

type HabitPopUpProps = {
    togglePopUp: () => void;
    addHabit?: (habit: HabitOptions) => void;
    habit?: HabitForUpdate,
    updateHabit: (options: HabitForUpdate) => void
}

export function HabitPopUp({ togglePopUp, addHabit, habit, updateHabit }: HabitPopUpProps) {

    const [name, setName] = React.useState(habit?.name ?? '');
    const [days, setDays] = useState(habit?.template ? habit.template.map((day) => !!day) : Array(7).fill(false));
    const [selectedColor, setColor] = useState(habit?.selectedColor ?? '#4A64FD');
    const colors = ['#4A64FD', '#8A78FF', '#FF8464', '#66d365ff', '#ffce66ff', '#f16884ff'];
    const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    const [errors, setErrors] = useState({ name: '', days: '' });

    function handleCheckBox(index: number, checked: boolean) {
        const newDays = [...days];
        newDays[index] = checked;
        setDays(newDays);
        
        if (newDays.some(day => day)) {
            setErrors(prev => ({ ...prev, days: '' }));
        } else {
            setErrors(prev => ({ ...prev, days: 'Please select at least one day' }));
        }
    }

    function handleNameChange(value: string) {
        setName(value);

        if (value.trim()) {
            setErrors(prev => ({ ...prev, name: '' }));
        } else {
            setErrors(prev => ({ ...prev, name: 'Enter the name of the habit' }));
        }
    };

    function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();

        let newErrors = { name: '', days: '' };

        if (!name.trim()) {
            newErrors.name = 'Enter the name of the habit';
        }
        if (days.every(day => !day)) {
            newErrors.days = 'Please select at least one day';
        }
        if (newErrors.name || newErrors.days) {
            setErrors(newErrors);
            return;
        }

        if (habit && updateHabit) {
            const updatedHabit: HabitForUpdate = {
                id: habit.id,
                name,
                template: days,
                selectedColor,
            };
            updateHabit(updatedHabit);
        } else if (addHabit) {
            const newHabit: HabitOptions = {
                id: nanoid(),
                name,
                template: days,
                weeks: {},
                selectedColor,
            };
            addHabit(newHabit);
        }

        togglePopUp();
    }

    return <div className='popup-overlay'>
        <form action='' className='popup-form' onSubmit={handleSubmit}>
            {
                habit ? <h3>Edit habit</h3> : <h3>New habit</h3>
            }
            <div className='name-wrapper'>
                <label className='inp'>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder='Name habit'
                        aria-label='Name'
                    />
                </label>
                {errors.name && (
                    <div className='name-error'>{errors.name}</div>
                )}
            </div>

            <div className='frequency-wrapper'>
                <h4 className='frequency-title'>Frequency</h4>
                <div className='weekdays-checkbox'>
                    {
                        week.map((day, index) => (
                            <label key={index} className='circle'>
                                <input
                                    type='checkbox'
                                    name='day'
                                    value={day}
                                    checked={days[index]}
                                    onChange={(e) => handleCheckBox(index, e.target.checked)}
                                />
                                <span>{day}</span>
                            </label>
                        ))
                    }
                    {errors.days && <div className='checkbox-error'>{errors.days}</div>}
                </div>

            </div>

            <div className='color-wrapper'>
                <h4 className='color-title'>Choose color</h4>
                <div className='color-radio-btn'>
                    {colors.map((color) => (
                        <label key={color} className='color-label' >
                            <input
                                type='radio'
                                name='habitColor'
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
                <button type='submit' className='submit'>Create</button>
            ) : habit ? (
                <button type='submit' className='edit'>Edit</button>
            ) : null}
            <button type='button' className='cancel' onClick={togglePopUp}>Cancel</button>
        </form>
    </div>
}